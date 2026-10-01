import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Skills</p>
          <h2 className="mt-3 text-2xl text-fg sm:text-3xl">Grouped by what it is used for</h2>
          <p className="mt-3 max-w-2xl text-muted">
            TypeScript is where most of my work happens — everything else here is in service of
            shipping it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.04}>
              <div className="card-surface h-full p-6">
                <h3 className="font-display text-sm uppercase tracking-[0.18em] text-fg">
                  {group.title}
                </h3>
                <p className="mt-2 text-xs text-muted">{group.caption}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span
                        className={cn(
                          "inline-block rounded-lg border px-2.5 py-1 text-xs transition-transform duration-200 hover:-translate-y-0.5",
                          skill.emphasis
                            ? "border-primary/70 bg-primary/15 font-semibold text-primary"
                            : "border-line bg-surface-2 text-muted hover:border-primary/40 hover:text-primary",
                        )}
                      >
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08} className="mt-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-fg transition-colors hover:border-primary/50 hover:text-primary"
          >
            Explore the full skills map
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
