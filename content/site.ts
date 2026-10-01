export const site = {
  name: "Gideon Onyegbula",
  title: "Full-Stack Developer",
  url: "https://devgideon.me",
  locale: "en_NG",
  location: "Nigeria",
  timezone: "WAT (UTC+1)",

  description:
    "Gideon Onyegbula — Full-Stack Developer. I build fast, reliable, production-minded web, mobile and desktop apps, plus the APIs behind them.",

  hero: {
    headline: "I build fast, reliable software across web, mobile and desktop.",
    subline:
      "Software Engineering student at FUTO, building full-stack applications and learning through shipping real projects. Open to internships, software engineering roles, and remote contracts.",
    availability:
      "Open to internships | software engineering roles | remote contracts",
  },

  about: {
    paragraphs: [
      "I'm a full-stack developer who picks the right tool for the job rather than the one I'm most comfortable with. I build for the web with React and Next.js, for mobile and desktop where a project needs a native-feeling app, and I build the backends behind them: Node.js and Express services exposing REST APIs, with Django and Python when a project calls for them. I've also built chatbot integrations. I care about the unglamorous parts of engineering too: strong typing, sensible error states, clear APIs, and systems that remain maintainable as they grow.",

      "I'm currently a third-year Software Engineering student at FUTO. I learn by building: ship something, find what breaks, understand why, and improve it. My current projects include Structura, a structured UML/ER diagram tool, an open-source Express rate limiter, and a CMS for portfolio content. I'm also deepening my backend skills with Docker, PostgreSQL, and modern Next.js architecture.",
    ],

    currently: {
      building: "Structura — a structured UML/ER diagram tool",
      learning: "Backend architecture, Docker, PostgreSQL and Next.js",
      openTo: "Internships | Software Engineering Roles | Remote Contracts",
    },
  },

  /** Used by JSON-LD `sameAs`. Must stay in sync with content/links.ts. */
  sameAs: [
    "https://github.com/GFrosh",
    "https://ng.linkedin.com/in/gideon-onyegbula-38b510380",
  ],
} as const;

export type Site = typeof site;
