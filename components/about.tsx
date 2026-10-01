import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";
import Link from "next/link";

const CURRENTLY_LABELS = ["Building", "Learning", "Open to"] as const;

export function About() {
  const { building, learning, openTo } = site.about.currently;
  const values = [building, learning, openTo];

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">About</p>
          <h2 className="mt-3 text-2xl text-fg sm:text-3xl">
            What I build, and how I work
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <Reveal className="min-w-0">
            <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {site.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-surface p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">Currently</h3>
              <dl className="mt-4 grid gap-4 text-sm">
                {CURRENTLY_LABELS.map((label, index) => (
                  <div key={label} className="border-l border-line pl-4">
                    <dt className="text-xs uppercase tracking-wider text-primary">{label}</dt>
                    <dd className="mt-1 text-muted">{values[index]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg border border-line px-3.5 py-2 text-sm text-fg transition-colors hover:border-primary/50 hover:text-primary"
          >
            Read more about me
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
