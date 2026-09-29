import { NextResponse } from "next/server";
import { Resend } from "resend";
import { clientKeyFromRequest, createSlidingWindowLimiter } from "@/lib/rate-limit";
import { contactSchema, flattenIssues } from "@/lib/validation";

/** Resend's SDK and the in-memory limiter both need Node APIs. */
export const runtime = "nodejs";
/** Never cache a POST handler. */
export const dynamic = "force-dynamic";

const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000);
const MAX_REQUESTS = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);

/**
 * Module-level singleton: the Map survives between requests for as long as the
 * serverless instance stays warm, which is exactly the lifetime a sliding
 * window needs. See lib/rate-limit.ts for why this is inline rather than the
 * Express middleware package.
 */
const limiter = createSlidingWindowLimiter({ windowMs: WINDOW_MS, maxRequests: MAX_REQUESTS });

function rateLimitHeaders(remaining: number, limit: number, resetSeconds: number) {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
  };
  if (resetSeconds > 0) headers["Retry-After"] = String(resetSeconds);
  return headers;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const clientKey = clientKeyFromRequest(request);
  const verdict = limiter.consume(clientKey);

  if (!verdict.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many messages from this connection. Try again in ${verdict.retryAfterSeconds}s.`,
      },
      {
        status: 429,
        headers: rateLimitHeaders(verdict.remaining, verdict.limit, verdict.retryAfterSeconds),
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: flattenIssues(parsed.error) },
      { status: 400, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped: answer 200 so the bot believes it succeeded, send nothing.
  if (company && company.length > 0) {
    return NextResponse.json(
      { ok: true, message: "Thanks — your message has been sent." },
      { status: 200, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[contact] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "The mail service is not configured yet. Please reach me directly at hello@devgideon.me.",
      },
      { status: 503, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border:none;border-top:1px solid #ddd" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please email me directly." },
        { status: 502, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
      );
    }
  } catch (cause) {
    console.error("[contact] Unexpected failure:", cause);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending that. Please email me directly." },
      { status: 500, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
    );
  }

  return NextResponse.json(
    { ok: true, message: "Thanks — your message is on its way. I usually reply within a day." },
    { status: 200, headers: rateLimitHeaders(verdict.remaining, verdict.limit, 0) },
  );
}
