/**
 * Single source of truth for identity + copy.
 * Everything here is either supplied by Gideon or explicitly marked as a
 * [PLACEHOLDER: ...] that still needs a real value.
 */

export const site = {
  name: "Gideon Onyegbula",
  title: "Fullstack Developer (TypeScript)",
  url: "https://devgideon.me",
  locale: "en_NG",
  location: "Lagos, Nigeria",
  timezone: "WAT (UTC+1)",

  description:
    "Gideon Onyegbula — Fullstack Developer (TypeScript). I build fast, typed, production-minded web apps and APIs.",

  hero: {
    headline: "I build fast, typed, production-minded web apps and APIs.",
    subline:
      "3rd-year Software Engineering student at FUTO (graduating 2027/28), based in Lagos (WAT), open to [PLACEHOLDER: internships / junior roles / remote].",
    availability: "Available for [PLACEHOLDER: internships / junior roles / remote]",
  },

  about: {
    paragraphs: [
      "I'm a fullstack developer working mostly in TypeScript. On the front end that means React and Next.js with typed props end to end; on the back end it's Node.js and Express services exposing REST APIs, with Django and Python when a project calls for it. I care about the unglamorous parts — strict types, sensible error states, and builds that stay fast as they grow.",
      "Right now I'm a third-year Software Engineering student at FUTO, and I keep the learning loop short: build something small, ship it, then write down what broke. My current side projects are a diagram tool (Structura), an open-source Express rate limiter, and a CMS for portfolio content. Docker and PostgreSQL are where I'm putting deliberate practice this year.",
    ],
    currently: {
      building: "Structura — a structured UML/ER diagram tool",
      learning: "Docker, PostgreSQL and Next.js App Router patterns",
      openTo: "[PLACEHOLDER: internships / junior roles / remote]",
    },
  },

  /** Used by JSON-LD `sameAs`. Must stay in sync with content/links.ts. */
  sameAs: [
    "https://github.com/GFrosh",
    "https://ng.linkedin.com/in/gideon-onyegbula-38b510380",
  ],
} as const;

export type Site = typeof site;
