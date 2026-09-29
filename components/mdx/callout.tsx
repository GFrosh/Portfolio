import type { ReactNode } from "react";
import { Info } from "lucide-react";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-xl border border-primary/35 bg-primary/[0.07] p-5">
      <p className="flex items-center gap-2 font-display text-sm text-primary">
        <Info aria-hidden="true" className="h-4 w-4" />
        {title ?? "Note"}
      </p>
      <div className="mt-2 text-sm text-muted [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}
