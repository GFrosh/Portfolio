"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { contactSchema, flattenIssues } from "@/lib/validation";

type Status = { tone: "success" | "error"; message: string } | null;

/**
 * Real labels, real <button>, an aria-live region for the result and inline
 * per-field errors. No alert() anywhere.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    // Validate locally first so the user gets instant feedback.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(flattenIssues(parsed.error));
      setStatus({ tone: "error", message: "Please check the highlighted fields." });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result: { ok?: boolean; message?: string; error?: string; fields?: Record<string, string> } =
        await response.json();

      if (!response.ok || !result.ok) {
        if (result.fields) setFieldErrors(result.fields);
        setStatus({
          tone: "error",
          message: result.error ?? "That did not send. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        tone: "success",
        message: result.message ?? "Thanks — your message is on its way.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: "Network error — please check your connection and try again.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-fg">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className="mt-2 w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-primary"
          placeholder="Your name"
        />
        {fieldErrors.name ? (
          <p id="contact-name-error" className="mt-1.5 text-xs text-red-300">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-fg">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className="mt-2 w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-primary"
          placeholder="you@example.com"
        />
        {fieldErrors.email ? (
          <p id="contact-email-error" className="mt-1.5 text-xs text-red-300">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-fg">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className="mt-2 w-full resize-y rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-primary"
          placeholder="What are you building, and what do you need help with?"
        />
        {fieldErrors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-300">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from humans and from assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#04121a] transition-opacity disabled:opacity-60"
        >
          {pending ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="h-4 w-4" />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">
          Submissions are rate limited to keep spam out.
        </p>
      </div>

      <div aria-live="polite" role="status" className="min-h-6">
        {status ? (
          <p
            className={
              status.tone === "success"
                ? "rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary-soft"
                : "rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            }
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
