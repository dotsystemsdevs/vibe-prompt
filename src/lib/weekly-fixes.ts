/**
 * The Weekly Fix archive.
 *
 * Each issue of the newsletter is also a public, indexable page. This is the
 * content layer only, sending is not wired up here. Issues are authored by
 * hand (no CMS) and reference a real failure in LIST_PROBLEMS via relatedFixId.
 */
export type WeeklyFix = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  problem: string;
  symptom: string;
  whyItHappens: string;
  fix: string;
  prompt: string;
  relatedFixId: string;
  tools: string[];
  readingTime: string;
};

export const WEEKLY_FIXES: WeeklyFix[] = [
  {
    slug: "why-the-last-20-percent-takes-5x-longer",
    title: "Why the last 20% takes 5x longer",
    date: "2026-06-11",
    summary:
      "AI sprints through the first 80% of a feature, then crawls. Here is why the polish phase ambushes you, and how to plan for it instead.",
    problem: "AI nails 80% of a feature fast, then the last 20% takes five times as long.",
    symptom:
      "The demo works in minutes. Then edge cases, error states, browser quirks, and integration glue eat your whole week. You keep telling yourself it is just one more hour.",
    whyItHappens:
      "The first 80% is patterns the model has seen ten thousand times. The last 20% is your specific edge cases and glue code that no model has seen exactly. It is not a skill issue, it is the shape of the work.",
    fix:
      "Plan for it. Block out 3x your gut estimate for the polish phase before you start. Treat 'make the happy path work' and 'handle everything that can go wrong' as two separate tasks with separate estimates. If you keep promising one more hour, you are estimating against the 80% phase.",
    prompt:
      "I have a working happy path for [feature]. Before I call it done, list every edge case, error state, empty state, race condition, and integration failure mode this could hit in production. For each one, tell me how to reproduce it and the smallest change that handles it.",
    relatedFixId: "last-20-percent",
    tools: ["Claude Code", "Cursor"],
    readingTime: "2 min",
  },
  {
    slug: "when-ai-writes-confident-wrong-code",
    title: "When AI writes confident, wrong code",
    date: "2026-06-04",
    summary:
      "The code looks clean, reads well, and runs. It is also wrong. Two habits that catch confident-wrong code before it ships.",
    problem: "AI confidently writes code that is completely wrong.",
    symptom:
      "The code looks clean and runs fine, but it does the wrong thing or falls over on one input you did not think to test.",
    whyItHappens:
      "Confident-wrong code almost always has a single edge case the model did not model: an empty array, a null, a very large input, a timezone. The model optimizes for plausible, not correct.",
    fix:
      "Two habits. First, before accepting any code, ask how would you verify this works? It forces the model to surface its own test cases. Second, when something feels off, paste it back and ask what happens if X is empty, null, or huge? The crack is almost always one unhandled input.",
    prompt:
      "Here is the code you just wrote: [paste]. Before I trust it: how would you verify it works? List the exact inputs that would break it (empty, null, very large, malformed, concurrent) and show me the one-line guard for each.",
    relatedFixId: "ai-confidently-wrong",
    tools: ["Claude Code", "Cursor", "Windsurf"],
    readingTime: "2 min",
  },
  {
    slug: "the-duplication-tax-of-vibe-coding",
    title: "The duplication tax of vibe coding",
    date: "2026-05-28",
    summary:
      "Three date formatters, two auth helpers, the same fetch wrapper re-implemented per feature. Why AI codebases bloat, and the two habits that stop it.",
    problem: "Code duplication piles up after weeks of vibe coding.",
    symptom:
      "Three slightly different date formatters. Two auth helpers. The same fetch wrapper re-implemented per feature. GitClear measured 4x more duplication in AI-assisted codebases.",
    whyItHappens:
      "The model does not know your existing helpers exist unless you point at them. Each session starts blind, so it re-derives utilities you already have.",
    fix:
      "Two habits. First, keep a CLAUDE.md or AGENTS.md listing your utilities and where to find them, and feed it at session start. Second, after every feature ask the agent: did this duplicate logic from anywhere? Show me the closest existing helper. Even imperfect dedup beats the default.",
    prompt:
      "Here is my utils/helpers index: [paste AGENTS.md or file list]. For the feature I am about to build, [describe], tell me which existing helpers I should reuse instead of writing new ones. If something genuinely does not exist yet, say so.",
    relatedFixId: "code-duplication-pile",
    tools: ["Claude Code", "Cursor"],
    readingTime: "3 min",
  },
];

export function getWeeklyFixesSorted(): WeeklyFix[] {
  return [...WEEKLY_FIXES].sort((a, b) => b.date.localeCompare(a.date));
}

export function getWeeklyFix(slug: string): WeeklyFix | undefined {
  return WEEKLY_FIXES.find((w) => w.slug === slug);
}
