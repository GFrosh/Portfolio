"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch, TriangleAlert } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 4;

/**
 * Decoration-only tilt. All information is plain markup — the transform merely
 * follows the cursor. Disabled entirely under prefers-reduced-motion.
 */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const bounds = node.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;

    node.style.setProperty("--tilt-y", `${(px * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    node.style.setProperty("--tilt-x", `${(-py * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    node.style.setProperty("--glare-x", `${((px + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty("--glare-y", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const reset = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className="card-surface group relative h-full overflow-hidden p-5 transition-transform duration-200 ease-out [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] [transform-style:preserve-3d]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--glare-x,50%) var(--glare-y,50%), rgba(34,211,238,0.14), transparent 62%)",
          }}
        />

        <div className="relative overflow-hidden rounded-xl border border-line">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="relative mt-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg text-fg">{project.name}</h3>
            <span className="shrink-0 rounded-lg border border-line px-2 py-1 text-[11px] text-muted">
              {project.stack[0]}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[11px] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
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
          </div>

          {project.live ? (
            <div className="mt-4 border-t border-line pt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline underline-offset-4"
              >
                Live demo
              </a>
              {project.freeTierHost ? (
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted">
                  <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                  Free-tier host, first load may take ~30s.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
