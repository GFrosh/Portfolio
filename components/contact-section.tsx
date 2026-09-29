import { ArrowUpRight, Mail } from "lucide-react";
import { socialLinks } from "@/content/links";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Contact</p>
          <h2 className="mt-3 text-2xl text-fg sm:text-3xl">Let&apos;s talk</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Internship, junior role, freelance build, or a question about something I wrote — the
            form works, and the inbox is open.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <Reveal>
            <div className="card-surface p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">Direct</h3>
              <ul className="mt-4 grid gap-3">
                {socialLinks.map(({ label, href, handle, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                        <span className="text-fg">{label}</span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs text-muted">
                        {handle}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted">
                <Mail aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                hello@devgideon.me — [PLACEHOLDER: confirm this address exists]
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card-surface p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">
                Send a message
              </h3>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
