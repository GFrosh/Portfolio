import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/content/skills";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Skills",
  description: `The languages, frameworks, platforms, and tools ${site.name} uses to build products.`,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  const skills = skillGroups.flatMap((group) => group.skills);
  const uniqueSkills = [...new Set(skills.map((skill) => skill.name))];
  const highlightedSkills = skills.filter((skill) => skill.emphasis);

  return (
    <div className="overflow-hidden pb-24 pt-28 sm:pt-32">
      <div className="shell">
        <Reveal>
          <div className="max-w-4xl">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">
              Skills & toolkit
            </p>
            <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-6xl">
              The tools behind the things I ship.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              A practical map of the languages, frameworks, platforms, and tools I use across
              interfaces, APIs, mobile apps, desktop software, and integrations.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-surface px-5 py-5 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Skill groups</dt>
              <dd className="mt-2 font-display text-2xl text-primary">{skillGroups.length}</dd>
            </div>
            <div className="bg-surface px-5 py-5 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Tools listed</dt>
              <dd className="mt-2 font-display text-2xl text-primary">{uniqueSkills.length}</dd>
            </div>
            <div className="col-span-2 bg-surface px-5 py-5 sm:col-span-1 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Primary focus</dt>
              <dd className="mt-2 font-display text-2xl text-primary">
                {highlightedSkills[0]?.name ?? "TypeScript"}
              </dd>
            </div>
          </dl>
        </Reveal>

        <section aria-labelledby="skill-groups" className="mt-16">
          <Reveal>
            <h2 id="skill-groups" className="text-2xl text-fg sm:text-3xl">
              Grouped by what the tools are used for
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              The grouping reflects how I think about building and shipping software, rather than
              a list of disconnected keywords.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.id} delay={Math.min(index * 0.04, 0.16)}>
                <article id={group.id} className="card-surface h-full scroll-mt-24 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-base uppercase tracking-[0.18em] text-fg">
                      {group.title}
                    </h3>
                    <span className="font-display text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{group.caption}</p>
                  <ul className="mt-6 grid gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={
                          skill.emphasis
                            ? "flex items-center justify-between rounded-lg border border-primary/60 bg-primary/10 px-3 py-2.5 text-sm text-primary"
                            : "flex items-center justify-between rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm text-fg"
                        }
                      >
                        <span>{skill.name}</span>
                        {skill.emphasis ? (
                          <span className="text-[10px] uppercase tracking-[0.16em]">Focus</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal delay={0.08}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Skills are most useful in context. See how these tools come together in shipped work
              and the decisions behind it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-[#04121a]"
              >
                View projects
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-lg border border-line px-3.5 py-2 text-sm text-fg transition-colors hover:border-primary/50 hover:text-primary"
              >
                About me
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
