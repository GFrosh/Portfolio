import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitBranch, TriangleAlert } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import { featuredProjects, getProject } from "@/content/projects";
import { getCaseStudySource } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Reveal } from "@/components/reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — case study`,
      description: project.oneLiner,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [{ url: project.image, width: project.imageWidth, height: project.imageHeight }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const source = await getCaseStudySource(project.slug);
  const { content } = await compileMDX({ source, components: mdxComponents });

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      <div className="shell">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All projects
          </Link>

          <p className="mt-8 font-display text-xs uppercase tracking-[0.28em] text-primary">
            Case study
          </p>
          <h1 className="mt-3 text-3xl text-fg sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{project.oneLiner}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Live site
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : null}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-primary/50 hover:text-primary"
            >
              <GitBranch aria-hidden="true" className="h-4 w-4" />
              GitHub
            </a>
          </div>

          {project.freeTierHost ? (
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted">
              <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
              Free-tier host, first load may take ~30s.
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-12">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="w-full rounded-2xl border border-line"
            />
          </figure>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <Reveal className="min-w-0">
            <div className="mdx">{content}</div>
          </Reveal>

          <Reveal delay={0.06}>
            <aside className="card-surface p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-fg">
                At a glance
              </h2>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Role</dt>
                  <dd className="mt-1 text-fg">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs text-primary-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Links</dt>
                  <dd className="mt-2 flex flex-col gap-1.5">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4"
                      >
                        Live
                      </a>
                    ) : null}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4"
                    >
                      GitHub
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
