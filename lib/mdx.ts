import { promises as fs } from "node:fs";
import path from "node:path";

const CASE_STUDY_DIR = path.join(process.cwd(), "content", "case-studies");

/** Reads one case study's MDX source. Throws a clear error if it is missing. */
export async function getCaseStudySource(slug: string): Promise<string> {
  try {
    return await fs.readFile(path.join(CASE_STUDY_DIR, `${slug}.mdx`), "utf8");
  } catch {
    throw new Error(
      `No case study found for slug "${slug}". Expected a file at content/case-studies/${slug}.mdx`,
    );
  }
}

export async function listCaseStudySlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CASE_STUDY_DIR);
    return entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map((entry) => entry.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}
