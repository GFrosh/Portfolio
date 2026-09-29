export type Project = {
  slug: string;
  name: string;
  /** One line, used on the card and at the top of the case study. */
  oneLiner: string;
  /** Longer card description — sourced from the repo, emoji shortcodes removed. */
  summary: string;
  role: string;
  stack: string[];
  live?: string;
  repo: string;
  /** Local, optimised screenshot. */
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Render the "free-tier host" note next to the Live link. */
  freeTierHost?: boolean;
  featured: boolean;
};

/**
 * Featured projects, in display order.
 * [PLACEHOLDER: Naija Chronoscope — add it above Structura if it is live.]
 * TODO(naija-chronoscope): add a fourth entry here + content/case-studies/naija-chronoscope.mdx
 */
export const projects: Project[] = [
  {
    slug: "structura",
    name: "Structura",
    oneLiner:
      "A diagram tool that is neither a text editor nor a drag-and-drop mess — you build UML and ER diagrams through a structured UI.",
    summary:
      "Build UML and ER diagrams through a clean, structured UI instead of hand-writing PlantUML or wrestling with a canvas. Powered by Node.js.",
    role: "[PLACEHOLDER: your role on Structura — e.g. solo developer across design, frontend and backend]",
    stack: ["TypeScript", "Node.js", "Electron", "PlantUML"],
    live: "https://structura-mm00.onrender.com",
    repo: "https://github.com/GFrosh/Structura",
    image: "/projects/structura.webp",
    imageAlt: "Structura's structured diagram editor showing a UML workspace",
    imageWidth: 1600,
    imageHeight: 900,
    freeTierHost: true,
    featured: true,
  },
  {
    slug: "rate-limiter",
    name: "Rate-Limiter",
    oneLiner:
      "A lightweight, pluggable rate limiting middleware for Express, built on the sliding-window algorithm.",
    summary:
      "Drop-in Express middleware with a sliding-window algorithm, a Map-based in-memory store, custom key resolvers and standards-shaped rate-limit headers.",
    role: "[PLACEHOLDER: your role on Rate-Limiter — e.g. solo author and maintainer]",
    stack: ["JavaScript", "Node.js", "Express"],
    live: "https://rate-limiter-2h3f.onrender.com",
    repo: "https://github.com/GFrosh/Rate-Limiter",
    image: "/projects/rate-limiter.webp",
    imageAlt: "Rate-Limiter's demo visualiser showing request throughput against the window limit",
    imageWidth: 1600,
    imageHeight: 900,
    freeTierHost: true,
    featured: true,
  },
  {
    slug: "portfolio-projects-cms",
    name: "Portfolio-Projects-CMS",
    oneLiner:
      "A CMS for the projects on your portfolio, with any frontend you choose on top.",
    summary:
      "Manage the projects that appear on a portfolio site and expose them to whatever frontend you point at it.",
    role: "[PLACEHOLDER: your role on Portfolio-Projects-CMS — e.g. solo developer]",
    stack: ["TypeScript", "Next.js", "CMS"],
    live: "https://portfolio-projects-cms.vercel.app",
    repo: "https://github.com/GFrosh/Portfolio-Projects-CMS",
    image: "/projects/portfolio-projects-cms.webp",
    imageAlt: "Portfolio-Projects-CMS project management interface",
    imageWidth: 1600,
    imageHeight: 900,
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
