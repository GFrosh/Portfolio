import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Callout } from "@/components/mdx/callout";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Projects</p>
          <h2 className="mt-3 text-2xl text-fg sm:text-3xl">Featured work</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every featured project has a full case study: the problem, the decision I made, the
            trade-off it cost, and what I would change next.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div className="max-w-3xl">
            <Callout title="Placeholder">
              <p>
                <strong>[PLACEHOLDER: Naija Chronoscope, if live, put it first]</strong> — add it as
                the first entry in <code>content/projects.ts</code> and create{" "}
                <code>content/case-studies/naija-chronoscope.mdx</code>. The case-study route
                generates automatically from the data file.
              </p>
            </Callout>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
