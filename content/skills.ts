export type Skill = {
  name: string;
  /** Optional extra weight/colour for a chip. Currently unused. */
  emphasis?: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  skills: Skill[];
};

/**
 * Only skills Gideon would defend in an interview.
 * Every language and platform gets equal visual weight.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "Day-to-day typing and reasoning about code.",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Dart" },
    ],
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
    id: "mobile-desktop",
    title: "Mobile & desktop",
    caption: "Apps that live outside the browser tab.",
    skills: [{ name: "React Native" }, { name: "Flutter" }, { name: "Electron" }],
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
    skills: [
      { name: "Claude API" },
      { name: "WhatsApp Business API" },
      { name: "Google AI Studio" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    caption: "How the work gets shipped and reviewed.",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Figma" }],
  },
];
