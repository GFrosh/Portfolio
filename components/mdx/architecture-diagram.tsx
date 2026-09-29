import type { ReactNode } from "react";

type Node = { label: string; detail?: string; kind?: "box" | "store" };

/**
 * A dependency-free architecture diagram: labelled boxes with arrows, rendered
 * as HTML so it stays crisp, selectable, and readable by screen readers.
 * Swap for an exported SVG/PNG image if you prefer — see README.
 */
export function ArchitectureDiagram({
  title = "Architecture",
  stages,
  store,
  caption,
}: {
  title?: string;
  /** Left-to-right flow. Defaults describe the rate-limiter shape. */
  stages?: Node[];
  store?: Node;
  caption?: ReactNode;
}) {
  const flow: Node[] = stages ?? [
    { label: "Express app", detail: "incoming request" },
    { label: "rateLimiter(opts)", detail: "middleware, one line" },
    { label: "Sliding window", detail: "prune → count → decide" },
  ];

  return (
    <figure className="my-8 rounded-xl border border-line bg-bg-soft p-5">
      <figcaption className="font-display text-xs uppercase tracking-[0.24em] text-primary">
        {title}
      </figcaption>

      <div className="mt-5 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {flow.map((node, index) => (
          <div key={node.label} className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:items-center">
            <div className="flex-1 rounded-lg border border-line bg-surface-2 px-4 py-3">
              <p className="text-sm font-medium text-fg">{node.label}</p>
              {node.detail ? <p className="mt-1 text-xs text-muted">{node.detail}</p> : null}
            </div>
            {index < flow.length - 1 ? (
              <span aria-hidden="true" className="self-center font-mono text-primary/70 lg:px-1">
                →
              </span>
            ) : null}
          </div>
        ))}

        {store ? (
          <>
            <span aria-hidden="true" className="self-center font-mono text-primary/70 lg:px-1">
              ↕
            </span>
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/[0.06] px-4 py-3 lg:flex-1">
              <p className="text-sm font-medium text-primary">{store.label}</p>
              {store.detail ? <p className="mt-1 text-xs text-muted">{store.detail}</p> : null}
            </div>
          </>
        ) : null}
      </div>

      {caption ? <div className="mt-4 text-xs text-muted">{caption}</div> : null}
    </figure>
  );
}
