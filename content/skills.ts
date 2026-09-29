export type Skill = {
  name: string;
  /** Renders the chip with extra weight/colour. Used for TypeScript. */
  emphasis?: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  skills: Skill[];
};

/**
 * Only what Gideon actually listed. TypeScript is first and emphasised.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "Day-to-day typing and reasoning about code.",
    skills: [{ name: "TypeScript", emphasis: true }, { name: "JavaScript" }, { name: "Python" }],
  },
  {
    id: "frontend",
    title: "Frontend",
    caption: "Interfaces, routing, styling and installable apps.",
    skills: [{ name: "React" }, { name: "Next.js" }, { name: "Tailwind CSS" }, { name: "PWAs" }],
  },
  {
    id: "backend",
    title: "Backend",
    caption: "Services, endpoints and request lifecycles.",
    skills: [{ name: "Node.js" }, { name: "Express" }, { name: "Django" }, { name: "REST APIs" }],
  },
  {
    id: "data-infra",
    title: "Data & infra",
    caption: "Persistence and packaging.",
    skills: [{ name: "PostgreSQL" }, { name: "Docker" }],
  },
  {
    id: "ai",
    title: "AI & integrations",
    caption: "Third-party APIs wired into real products.",
    skills: [{ name: "Claude API" }, { name: "WhatsApp Business API" }],
  },
  {
    id: "tools",
    title: "Tools",
    caption: "How the work gets shipped and reviewed.",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Figma" }],
  },
];
