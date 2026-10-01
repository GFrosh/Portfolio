import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch, TriangleAlert } from "lucide-react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: `A detailed catalogue of ${site.name}'s shipped products, experiments, and open-source work.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const technologies = [...new Set(projects.flatMap((project) => project.stack))];
  const liveProjects = projects.filter((project) => project.live).length;

  return (
    <div className="overflow-hidden pb-24 pt-28 sm:pt-32">
      <div className="shell">
        <Reveal>
          <div className="max-w-4xl">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">
              Project directory
            </p>
            <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-6xl">
              Work worth looking at closely.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              A living catalogue of the products, tools, and systems I have built. Each entry
              includes the context, responsibilities, technologies, and the path to its full case
              study.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-surface px-5 py-5 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Projects</dt>
              <dd className="mt-2 font-display text-2xl text-primary">{projects.length}</dd>
            </div>
            <div className="bg-surface px-5 py-5 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Live demos</dt>
              <dd className="mt-2 font-display text-2xl text-primary">{liveProjects}</dd>
            </div>
            <div className="col-span-2 bg-surface px-5 py-5 sm:col-span-1 sm:px-6">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">Technologies</dt>
              <dd className="mt-2 font-display text-2xl text-primary">{technologies.length}</dd>
            </div>
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-10">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.16)}>
              <article id={project.slug} className="scroll-mt-24 border-t border-line pt-8 sm:pt-10">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-start lg:gap-12">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-line bg-surface"
                    aria-label={`Read the ${project.name} case study`}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {project.featured ? <span>Featured</span> : null}
                    </div>
                    <h2 className="mt-3 text-2xl text-fg sm:text-3xl">{project.name}</h2>
                    <p className="mt-3 text-base leading-7 text-fg">{project.oneLiner}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>

                    <dl className="mt-7 grid gap-5 border-y border-line py-5 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted">Role</dt>
                        <dd className="mt-1 leading-6 text-fg">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted">Stack</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.stack.map((item) => (
                            <span key={item} className="rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-primary-soft">
                              {item}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-[#04121a]"
                      >
                        Read case study
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-fg transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <GitBranch aria-hidden="true" className="h-4 w-4" />
                        GitHub
                      </a>
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline underline-offset-4"
                        >
                          Live demo
                        </a>
                      ) : null}
                    </div>
                    {project.freeTierHost ? (
                      <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
                        <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                        Free-tier host, first load may take ~30s.
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
