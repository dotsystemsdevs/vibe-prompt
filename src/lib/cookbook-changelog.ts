export type ChangelogEntry = {
  /** ISO date YYYY-MM-DD when the change shipped. */
  date: string;
  /** Short tag, "Recipe 02", "Landing", "Awesome list", "Articles". */
  scope: string;
  /** One-line headline of what changed. */
  title: string;
  /** Optional sub-bullets for more detail. */
  details?: string[];
  /** Optional link the entry points at (a recipe anchor, an article, a tool). */
  href?: string;
};

/**
 * Manually curated changelog for the cookbook.
 * Newest entry first. Keep entries short, readers skim.
 */
export const COOKBOOK_CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-06-03",
    scope: "Landing",
    title: "Rebuilt the homepage around three entry paths.",
    details: [
      "New Pick your path section: first-timer, shipper, evaluator.",
      "Built-with proof moved above the table of contents.",
      "Added an Also inside section linking deep-dives, awesome list, and comparisons.",
    ],
    href: "/",
  },
  {
    date: "2026-06-01",
    scope: "Recipe 02 · PRD",
    title: "Added a Pick your idea section before the PRD checklist.",
    details: [
      "Three candidate ideas, scored on excitement / shippability / pay-for-it.",
      "Elevator pitch said out loud as the gut check.",
      "Sanity check against Deep Research notes from Recipe 01.",
    ],
    href: "/workflow#step-02",
  },
  {
    date: "2026-06-01",
    scope: "Cookbook",
    title: "Added Start here as a pre-recipe intro.",
    details: [
      "Covers how the cookbook works, what each recipe contains, and how progress is saved.",
      "Lives at /workflow#step-intro and is the default first page.",
    ],
    href: "/workflow#step-intro",
  },
];
