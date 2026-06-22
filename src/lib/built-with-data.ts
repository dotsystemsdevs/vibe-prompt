export type Surface = "Web" | "iOS" | "Android";

export type BuiltWithProject = {
  name: string;
  iconDomain: string;
  oneLine: string;
  url: string;
  surfaces: Surface[];
  stack: string;
  status: string;
  whatWorked: string;
  whatBroke: string;
  workflowSteps: string;
  // Optional richer postmortem fields. Fill these per project to deepen the
  // case study, left undefined when not yet documented (never fabricated).
  // TODO(diana): add timeToBuild + promptsUsed per app for fuller receipts.
  timeToBuild?: string;
  promptsUsed?: string;
  result?: string;
};

/** Stable URL slug for a project's deep postmortem page. */
export function builtWithSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SURFACE_LABEL: Record<Surface, string> = {
  Web: "🌐 Web",
  iOS: "🍎 iOS",
  Android: "🤖 Android",
};

// Per-project logo URLs. Verified to return 200, most apps don't have a
// /favicon.ico (Next.js apps use /favicon.svg or /icon.png), so we point at
// the actual served path per project.
const LOGO_OVERRIDES: Record<string, string> = {
  "excusecaddie.xyz": "https://excusecaddie.xyz/logo.png",
  "commitmentissues.dev": "https://commitmentissues.dev/icon.png",
  "build2race.com": "https://build2race.com/favicon.svg",
  "indexia.se": "https://indexia.se/favicon.svg",
  // Slothy's web domain doesn't resolve, use the iOS App Store icon directly.
  "slothy.app":
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8f/ed/88/8fed8888-0160-249a-9e65-2c1f332f3c04/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg",
  "vibeprompt.tech": "https://vibeprompt.tech/favicon.svg",
};

export function faviconUrl(domain: string): string {
  if (LOGO_OVERRIDES[domain]) return LOGO_OVERRIDES[domain];
  return `https://${domain}/favicon.ico`;
}

export const BUILT_WITH_PROJECTS: BuiltWithProject[] = [
  {
    name: "Excuse Caddie",
    iconDomain: "excusecaddie.xyz",
    oneLine: "Random excuse generator for golf, three platforms, one weekend's worth of prompts each.",
    url: "https://excusecaddie.xyz",
    surfaces: ["Web", "iOS", "Android"],
    stack: "Next.js + Vercel · SwiftUI · Jetpack Compose",
    status: "iOS live in App Store · Android in Play Store review · Web at excusecaddie.xyz",
    whatWorked: "PRD-first kept the three platforms in sync. Same content model, three thin clients on top.",
    whatBroke: "Closed testing on Google Play needs 12 testers for 14 consecutive days. Step 07 fix article got written *because* this broke.",
    workflowSteps: "Used every step except 00. Step 02 PRD was the biggest single time-saver, wrote it once, the three clients fell out.",
  },
  {
    name: "Commitment Issues",
    iconDomain: "commitmentissues.dev",
    oneLine: "Death certificates for abandoned GitHub repos. Open source, weirdly viral on dev Twitter.",
    url: "https://commitmentissues.dev",
    surfaces: ["Web"],
    stack: "Next.js · GitHub API · Vercel KV · Stripe",
    status: "Live · 12 awesome-list submissions, 2 merged so far",
    whatWorked: "Step 08 (Launch) playbook for indie devs. Submitted to ~10 awesome-tool lists for backlinks, slow but steady traffic.",
    whatBroke: "Stripe webhook silently stopped firing after a routing rename. Step 06 audit added 'verify webhook end-to-end after every deploy' to the personal checklist.",
    workflowSteps: "Steps 01-09. Step 09 (Iterate) caught a 60-visitor-zero-conversion week that turned out to be a broken checkout button, only found via session replay.",
  },
  {
    name: "Build2Race",
    iconDomain: "build2race.com",
    oneLine: "Free triathlon training plan generator. PRD said 'free forever' which kept the build small.",
    url: "https://build2race.com",
    surfaces: ["Web"],
    stack: "Next.js · OpenAI · Vercel",
    status: "Live · indexed for 'triathlon training plan' on Google",
    timeToBuild: "Two evenings",
    whatWorked: "Tight PRD scope. 'Free forever, no signup' meant no auth, no payment, no DB. Shipped in two evenings.",
    whatBroke: "Original prompt generated 30 weeks of generic 'easy run' workouts. Step 03 (Stack) revisit added a structured-output schema and the quality jumped.",
    workflowSteps: "Stripped-down version of 02-07. Skipped Step 04 (Context) entirely, too small to need a memory-bank.",
  },
  {
    name: "Slothy",
    iconDomain: "slothy.app",
    oneLine: "Productivity app for people who hate productivity apps. iOS + Android.",
    url: "https://apps.apple.com/app/id6760565326",
    surfaces: ["iOS", "Android"],
    stack: "SwiftUI · Jetpack Compose · CloudKit · Firebase",
    status: "iOS live · Android live",
    whatWorked: "Cross-platform PRD with separate platform-specific AGENTS.md files for iOS and Android. Step 02 split into 02a/02b.",
    whatBroke: "First iOS submission rejected by App Review for 'minimal functionality'. Step 06 fix article 'app-review-rejected-vague' is the postmortem.",
    workflowSteps: "Step 04 (Context) was critical, two AGENTS.md files (one per platform) prevented the AI from mixing SwiftUI and Compose patterns.",
  },
  {
    name: "vibeprompt itself",
    iconDomain: "vibeprompt.tech",
    oneLine: "The site you're on right now. Yes, it was built with its own workflow.",
    url: "https://vibeprompt.tech",
    surfaces: ["Web"],
    stack: "Next.js 16 · Tailwind v4 · Vercel · @vercel/kv",
    status: "Live · MIT, free forever · 17 articles, 56 prompts, 46 fixes",
    whatWorked: "Eating our own dogfood. The /workflow page literally describes how this site was built. Step 01 (Research) defined the wedge against competitors before any code.",
    whatBroke: "First version had /list, /handbook, /cookbook, /templates all as separate pages, too much surface area. Step 09 (Iterate) collapsed them into articles + ⌘K.",
    workflowSteps: "Every step, multiple times. The articles, prompts, and fixes are the artifacts of the workflow being applied to itself.",
  },
];

export function getBuiltWithProject(slug: string): BuiltWithProject | undefined {
  return BUILT_WITH_PROJECTS.find((p) => builtWithSlug(p.name) === slug);
}
