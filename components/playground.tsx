import { ArrowUpRight, GitBranch } from "lucide-react";
import { playground } from "@/content/playground";
import { Reveal } from "@/components/reveal";

/** Deliberately plain: a list, not cards. These are experiments, not case studies. */
export function Playground() {
  return (
    <section id="playground" className="scroll-mt-24 border-t border-line py-16">
      <div className="shell">
        <Reveal>
          <h2 className="font-display text-sm uppercase tracking-[0.24em] text-muted">Playground</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Smaller projects built to learn something specific. Repos are public; no write-ups.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {playground.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-fg">{item.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.oneLiner}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
                  >
                    <GitBranch aria-hidden="true" className="h-3.5 w-3.5" />
                    Repo
                  </a>
                  {item.live ? (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
                    >
                      Live
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
