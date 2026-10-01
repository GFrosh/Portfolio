import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * Deliberately no `lastModified`: static content with hand-written timestamps
 * goes stale and misleads crawlers. Next will send real build-time headers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/skills`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes].map((entry) => ({ ...entry, lastModified: now }));
}
