import type { ComponentType } from "react";
import { Callout } from "@/components/mdx/callout";
import { ArchitectureDiagram } from "@/components/mdx/architecture-diagram";

/**
 * Components available inside content/case-studies/*.mdx.
 * Kept to a small named set: MDX is content, not a second application.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const mdxComponents: Record<string, ComponentType<any>> = {
  Callout,
  ArchitectureDiagram,
};
