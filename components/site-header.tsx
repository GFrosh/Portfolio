"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { resume } from "@/content/links";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Sticky on load — no scroll-triggered reveal. The header is a landmark
 * (<header>) with a real <nav>; the mobile toggle is a real <button> with
 * aria-expanded, trapping focus and closing on Escape.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0 || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-fg"
          aria-label="Gideon Onyegbula — home"
        >
          Gideon<span className="text-primary">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resume.href}
            download={resume.fileName}
            className="hidden items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 sm:inline-flex"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Résumé
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-primary/50 hover:text-primary md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className={cn("border-t border-line bg-bg md:hidden", !open && "hidden")}
      >
        <nav aria-label="Mobile" className="shell py-3">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={resume.href}
                download={resume.fileName}
                className="mt-2 flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-3 py-3 text-base font-medium text-primary"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
