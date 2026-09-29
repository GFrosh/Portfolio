export type PlaygroundItem = {
  name: string;
  oneLiner: string;
  repo: string;
  live?: string;
  freeTierHost?: boolean;
};

/**
 * Small experiments. Deliberately low-key: a plain list, no cards, no
 * screenshots, no demos promoted.
 */
export const playground: PlaygroundItem[] = [
  {
    name: "Expense-Tracker",
    oneLiner:
      "A simple expense tracker for daily spending, budgets and spending habits.",
    repo: "https://github.com/GFrosh/Expense-Tracker",
    live: "https://expense-tracker-nine-roan-47.vercel.app",
  },
  {
    name: "Chess-Engine",
    oneLiner:
      "A TypeScript exercise in OOP — polymorphism, inheritance, encapsulation and abstraction.",
    repo: "https://github.com/GFrosh/Chess-Engine",
  },
  {
    name: "Mini-User-Dashboard",
    oneLiner: "A tiny dashboard built to get comfortable in TSX.",
    repo: "https://github.com/GFrosh/Mini-User-Dashboard",
    live: "https://mini-user-dashboard-tau.vercel.app",
  },
];
