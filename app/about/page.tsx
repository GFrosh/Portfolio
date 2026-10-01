import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, Download, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/content/skills";
import { resume, socialLinks } from "@/content/links";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a ${site.title.toLowerCase()} based in ${site.location}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden pb-24 pt-28 sm:pt-32">
      <div className="shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">
                About me
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl leading-tight text-fg sm:text-6xl">
                Building useful things with care and curiosity.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{site.description}</p>
            </div>

            <div className="border-l border-primary/50 pl-5 text-sm text-muted">
              <p className="font-display text-base text-fg">{site.name}</p>
              <p className="mt-1">{site.title}</p>
              <div className="mt-5 grid gap-2">
                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
                  {site.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="h-4 w-4 text-primary" />
                  {site.timezone}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16">
          <Reveal className="min-w-0">
            <div className="space-y-5 text-base leading-8 text-muted sm:text-lg">
              {site.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-surface p-6">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
                Right now
              </p>
              <dl className="mt-5 grid gap-5 text-sm">
                <div className="border-l border-line pl-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Building</dt>
                  <dd className="mt-1 leading-6 text-fg">{site.about.currently.building}</dd>
                </div>
                <div className="border-l border-line pl-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Learning</dt>
                  <dd className="mt-1 leading-6 text-fg">{site.about.currently.learning}</dd>
                </div>
                <div className="border-l border-line pl-4">
                  <dt className="text-xs uppercase tracking-wider text-muted">Open to</dt>
                  <dd className="mt-1 leading-6 text-fg">{site.about.currently.openTo}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mt-16 flex flex-wrap items-center gap-3 border-y border-line py-5">
            <span className="mr-2 text-sm text-muted">{site.hero.availability}</span>
            <a
              href="mailto:hello@devgideon.me"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-[#04121a]"
            >
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={resume.href}
              download={resume.fileName}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-fg transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Résumé
            </a>
          </div>
        </Reveal>

        <section aria-labelledby="capabilities" className="mt-16">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Toolkit</p>
            <h2 id="capabilities" className="mt-3 text-2xl text-fg sm:text-3xl">
              The tools behind the work
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.id} delay={Math.min(index * 0.04, 0.16)}>
                <article className="card-surface h-full p-5">
                  <h3 className="font-display text-base text-fg">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{group.caption}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className={
                          skill.emphasis
                            ? "rounded-md border border-primary/60 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                            : "rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-muted"
                        }
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="connect" className="mt-16 border-t border-line pt-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Connect</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 id="connect" className="text-2xl text-fg sm:text-3xl">
                  Find me around the web
                </h2>
                <p className="mt-2 text-muted">The quickest way to reach me is email.</p>
              </div>
              <Link href="/#contact" className="text-sm text-primary underline underline-offset-4">
                Contact form
              </Link>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Reveal key={link.label} delay={Math.min(index * 0.04, 0.16)}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex h-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-4 transition-colors hover:border-primary/50"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-sm text-fg">{link.label}</span>
                      <span className="mt-1 block truncate text-xs text-muted">{link.handle}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
