import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">404</p>
      <h1 className="mt-4 text-3xl text-fg sm:text-4xl">That page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted">
        The link may be out of date, or the project may have been renamed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
