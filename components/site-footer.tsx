import Link from "next/link";
import { socialLinks, xLink, X_ENABLED } from "@/content/links";
import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = X_ENABLED
    ? [...socialLinks, { label: xLink.label, href: xLink.href }]
    : socialLinks.map(({ label, href }) => ({ label, href }));

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-base text-fg">
            {site.name}
            <span className="text-primary">.</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            {site.title} · {site.location} ({site.timezone})
          </p>
        </div>

        <nav aria-label="Elsewhere">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy note
          </Link>
        </p>
      </div>
    </footer>
  );
}
