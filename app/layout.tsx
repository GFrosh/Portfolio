import { Inter, Orbitron } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";

/**
 * next/font self-hosts both families at build time — no runtime request to
 * fonts.googleapis.com, no layout shift, and real fallback metrics.
 * Orbitron is used for headings only; Inter carries every paragraph.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Gideon Onyegbula",
    "Fullstack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Lagos",
    "Software Engineering",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} — ${site.title}`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.title,
      description: site.description,
      url: site.url,
      image: `${site.url}/portrait.webp`,
      email: "mailto:hello@devgideon.me",
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      knowsLanguage: ["en"],
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "Django",
        "PostgreSQL",
        "Docker",
        "REST APIs",
      ],
      sameAs: site.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — ${site.title}`,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: `${site.name} — ${site.title}`,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#person` },
      description: site.description,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // JSON-LD is generated from typed content, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
