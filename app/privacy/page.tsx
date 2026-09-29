import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What data the contact form collects, why, where it is stored, and how to have it removed.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="shell py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Privacy</p>
        <h1 className="mt-3 text-3xl text-fg sm:text-4xl">Privacy note</h1>
        <div className="mdx mt-8">
          <p>
            This is a personal portfolio. It has no accounts, no analytics scripts, no advertising
            and no tracking cookies.
          </p>
          <h2>Contact form</h2>
          <p>
            If you use the contact form, the name, email address and message you submit are sent to
            my inbox so I can reply. That is the only reason they are collected, and the only place
            they are stored.
          </p>
          <ul>
            <li>Submission is handled by a Next.js Route Handler and delivered by Resend.</li>
            <li>
              To stop spam, the server keeps a short-lived counter of submissions per IP address. It
              stores the timestamp of each request for the length of the rate-limit window
              (currently 15 minutes) and nothing else. No IP address is written to a database or
              kept after that window.
            </li>
            <li>No contact-form data is sold, shared, or used for marketing of any kind.</li>
          </ul>
          <h2>Removal</h2>
          <p>
            Email <a href="mailto:hello@devgideon.me">hello@devgideon.me</a> and I will delete any
            message you have sent me.
          </p>
          <p className="text-sm">
            Last reviewed: <span>[PLACEHOLDER: date you last reviewed this privacy note]</span>
          </p>
        </div>
      </div>
    </div>
  );
}
