// External "Techniques · read for depth" per recipe.
//
// Goal: link out to articles, docs, videos by OTHER people so vibeprompt
// doesn't have to maintain a parallel article library. Add entries as you
// find canonical resources; remove ones that go stale.
//
// Rules:
//  - Real URLs only (no guesses).
//  - Source = the publisher, not the author.
//  - Type defaults to "article". Use "docs" for official documentation,
//    "video" for YouTube/Loom, "thread" for X/Twitter threads.

export type ExternalTechnique = {
  title: string;
  url: string;
  source: string;
  description: string;
  type?: "article" | "video" | "docs" | "thread";
};

export const WORKFLOW_EXTERNAL_TECHNIQUES: Record<string, ExternalTechnique[]> = {
  "00": [
    {
      title: "Claude Code · Quickstart",
      url: "https://docs.anthropic.com/en/docs/claude-code/quickstart",
      source: "Anthropic Docs",
      description: "Official walkthrough for installing Claude Code, authenticating, and running your first terminal session.",
      type: "docs",
    },
    {
      title: "Codex CLI · README",
      url: "https://github.com/openai/codex",
      source: "OpenAI · GitHub",
      description: "The other terminal agent worth knowing. Same install pattern, different strengths, useful if you want to compare before committing.",
      type: "docs",
    },
    {
      title: "Cursor · Getting Started",
      url: "https://docs.cursor.com/welcome",
      source: "Cursor Docs",
      description: "Install, sign in, connect a model, and use Composer for multi-file edits. The IDE alternative to terminal agents.",
      type: "docs",
    },
    {
      title: "VS Code · Get Started",
      url: "https://code.visualstudio.com/docs/getstarted/getting-started",
      source: "Microsoft Docs",
      description: "If Cursor feels too heavy, install plain VS Code + an AI extension. Same editor underneath, lighter footprint.",
      type: "docs",
    },
    {
      title: "The Missing Semester of Your CS Education",
      url: "https://missing.csail.mit.edu/",
      source: "MIT",
      description: "Free 11-lecture course on the tools every dev should know: shell, scripting, git, debugging. Skim the first three if your terminal feels foreign.",
      type: "article",
    },
    {
      title: "Pro Git",
      url: "https://git-scm.com/book/en/v2",
      source: "Scott Chacon · git-scm.com",
      description: "The free canonical Git book. Read the first two chapters once; reference the rest as you hit specific situations.",
      type: "article",
    },
    {
      title: "Git Explained in 100 Seconds",
      url: "https://www.youtube.com/watch?v=hwP7WQkmECE",
      source: "Fireship",
      description: "Fast visual primer on what Git does and why every codebase needs it. Watch before the Pro Git deep-dive.",
      type: "video",
    },
    {
      title: "Node.js · Introduction",
      url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
      source: "Node.js Docs",
      description: "Two-minute overview of what Node.js actually is and why every modern web project depends on it.",
      type: "docs",
    },
  ],
  "01": [
    {
      title: "How to Get Startup Ideas",
      url: "https://paulgraham.com/startupideas.html",
      source: "Paul Graham",
      description: "The classic essay on why the best ideas come from problems you already have, not problems you imagine.",
      type: "article",
    },
    {
      title: "The Mom Test (book companion)",
      url: "https://www.momtestbook.com/",
      source: "Rob Fitzpatrick",
      description: "Three rules for customer interviews that prevent users from politely validating ideas that should die.",
      type: "article",
    },
    {
      title: "How to do customer discovery (with examples)",
      url: "https://www.indiehackers.com/post/customer-discovery-101-a-step-by-step-guide-1aa1d65e9d",
      source: "Indie Hackers",
      description: "Concrete script for talking to 5 potential users without leading them toward your solution.",
      type: "article",
    },
    {
      title: "First Rules of Finding Product-Market Fit",
      url: "https://review.firstround.com/the-first-rules-of-finding-product-market-fit/",
      source: "First Round Review",
      description: "Patterns from teams that found PMF. The signals to watch for, and the false signals that mislead solo founders.",
      type: "article",
    },
    {
      title: "Google Trends · how to read the data",
      url: "https://support.google.com/trends/answer/4365533",
      source: "Google Trends Help",
      description: "What rising, flat, and spike-then-dead curves actually mean. Read before judging your market.",
      type: "docs",
    },
  ],
  "02": [
    {
      title: "Shape Up: Stop Running in Circles",
      url: "https://basecamp.com/shapeup",
      source: "Basecamp",
      description: "Basecamp's product methodology. The chapters on scoping and appetite are the most useful for solo PRDs.",
      type: "article",
    },
    {
      title: "Working Backwards (PR/FAQ method)",
      url: "https://www.allthingsdistributed.com/2006/11/working_backwards.html",
      source: "Werner Vogels",
      description: "Amazon's internal format that starts every product as a press release plus FAQ. Forces the spec to read like the launch.",
      type: "article",
    },
    {
      title: "How to write a tight product spec",
      url: "https://www.lennysnewsletter.com/p/how-to-write-a-tight-product-spec",
      source: "Lenny's Newsletter",
      description: "Practical PRD structure from someone who reviewed thousands of specs at Airbnb.",
      type: "article",
    },
    {
      title: "Anatomy of a PRD",
      url: "https://www.aha.io/roadmapping/guide/requirements-management/what-is-a-good-product-requirements-document-template",
      source: "Aha!",
      description: "Section-by-section breakdown of what belongs in a PRD and why each part exists.",
      type: "article",
    },
  ],
  "03": [
    {
      title: "Choose Boring Technology",
      url: "https://boringtechnology.club/",
      source: "Dan McKinley",
      description: "Why you only get a few innovation tokens and should not spend them on the framework. Read before picking your stack.",
      type: "article",
    },
    {
      title: "Next.js · App Router docs",
      url: "https://nextjs.org/docs/app",
      source: "Next.js Docs",
      description: "Canonical reference for the framework most indie AI projects start with.",
      type: "docs",
    },
    {
      title: "Tailwind CSS docs",
      url: "https://tailwindcss.com/docs",
      source: "Tailwind Labs",
      description: "Utility-first styling that pairs with shadcn/ui. Search the docs, do not memorise the classes.",
      type: "docs",
    },
    {
      title: "shadcn/ui",
      url: "https://ui.shadcn.com",
      source: "shadcn",
      description: "Copy-paste component system that lives in your repo. No npm dependency to manage.",
      type: "docs",
    },
    {
      title: "Supabase · Build a SaaS in one weekend",
      url: "https://supabase.com/docs/guides/getting-started",
      source: "Supabase Docs",
      description: "Postgres + auth + storage in one platform, including the SQL patterns most indie projects need.",
      type: "docs",
    },
    {
      title: "Vercel · Deploying Next.js",
      url: "https://vercel.com/docs/frameworks/nextjs",
      source: "Vercel Docs",
      description: "How the hosting and the framework fit together. Read before you ship, not after it breaks.",
      type: "docs",
    },
  ],
  "04": [
    {
      title: "Claude Code Best Practices",
      url: "https://www.anthropic.com/engineering/claude-code-best-practices",
      source: "Anthropic Engineering",
      description: "The official guide from the team that built it. Cover-to-cover read before your first long Claude Code session.",
      type: "article",
    },
    {
      title: "Prompt engineering overview",
      url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
      source: "Anthropic Docs",
      description: "The structural patterns that make Claude follow long, specific instructions across sessions.",
      type: "docs",
    },
    {
      title: "AGENTS.md spec",
      url: "https://agents.md",
      source: "agents.md",
      description: "The community proposal that defines what an AGENTS.md should contain and why.",
      type: "docs",
    },
    {
      title: "Cursor · Rules for AI",
      url: "https://docs.cursor.com/context/rules-for-ai",
      source: "Cursor Docs",
      description: "Cursor's equivalent of AGENTS.md. Project-level + user-level rules and how they merge into context.",
      type: "docs",
    },
    {
      title: "Context engineering for AI agents",
      url: "https://www.philschmid.de/context-engineering",
      source: "Phil Schmid",
      description: "Deep-dive on how context windows decide whether an agent succeeds or hallucinates.",
      type: "article",
    },
  ],
  "05": [
    {
      title: "The 70% problem",
      url: "https://addyosmani.com/blog/human-in-the-loop/",
      source: "Addy Osmani",
      description: "Why AI gets you 70% of the way, and how to plan the loop so the last 30% does not eat your week.",
      type: "article",
    },
    {
      title: "Anthropic's engineering with Claude Code",
      url: "https://www.anthropic.com/engineering/claude-code-best-practices",
      source: "Anthropic Engineering",
      description: "Patterns the Claude Code team uses internally: small loops, planning first, AGENTS.md everywhere.",
      type: "article",
    },
    {
      title: "Using LLMs for code, my updated notes",
      url: "https://simonwillison.net/2025/Mar/11/using-llms-for-code/",
      source: "Simon Willison",
      description: "Hard-earned, current notes on what actually works when coding with LLMs day to day.",
      type: "article",
    },
    {
      title: "There's a new kind of coding I call \"vibe coding\"",
      url: "https://x.com/karpathy/status/1886192184808149383",
      source: "Andrej Karpathy on X",
      description: "The thread that named the practice. Two-minute read, useful frame for what you're doing in this step.",
      type: "thread",
    },
  ],
  "06": [
    {
      title: "Things you should never do in production AI code",
      url: "https://martinfowler.com/articles/exploring-gen-ai.html",
      source: "Martin Fowler",
      description: "Patterns and anti-patterns for shipping AI-generated code from one of the most senior voices in the field.",
      type: "article",
    },
    {
      title: "OWASP Top 10 for LLM applications",
      url: "https://genai.owasp.org/llm-top-10/",
      source: "OWASP",
      description: "The security issues AI-generated code keeps reintroducing. Skim every category before shipping anything that handles user data.",
      type: "docs",
    },
    {
      title: "OWASP Top 10 (general)",
      url: "https://owasp.org/www-project-top-ten/",
      source: "OWASP",
      description: "The web app security baseline. Half of the AI-code security holes are still the same SQL injection and XSS classics.",
      type: "docs",
    },
    {
      title: "Security considerations for AI-generated code",
      url: "https://simonwillison.net/2024/Aug/24/security-considerations/",
      source: "Simon Willison",
      description: "Specific blind spots LLMs reintroduce, with real examples of code that passed review and still shipped a vulnerability.",
      type: "article",
    },
  ],
  "07": [
    {
      title: "Vercel · Deploy a Next.js project",
      url: "https://vercel.com/docs/getting-started-with-vercel",
      source: "Vercel Docs",
      description: "Connect a GitHub repo, get a production URL plus preview URLs per pull request.",
      type: "docs",
    },
    {
      title: "PostHog · Session recordings setup",
      url: "https://posthog.com/docs/session-replay/installation",
      source: "PostHog Docs",
      description: "Install in two minutes. Free tier covers indie traffic. The first recording reveals more than a week of guessing.",
      type: "docs",
    },
    {
      title: "Sentry · Next.js setup",
      url: "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
      source: "Sentry Docs",
      description: "Catch unhandled exceptions with full stack traces from your live URL. Free tier is generous.",
      type: "docs",
    },
    {
      title: "TestFlight · App distribution for iOS",
      url: "https://developer.apple.com/testflight/",
      source: "Apple Developer",
      description: "Beta-test your iOS build with up to 10,000 users before pushing to the App Store. Apple's official path.",
      type: "docs",
    },
    {
      title: "Google Play · Internal testing",
      url: "https://support.google.com/googleplay/android-developer/answer/9845334",
      source: "Google Play Console Help",
      description: "Internal, closed, and open testing tracks before production rollout. Use them in order.",
      type: "docs",
    },
  ],
  "08": [
    {
      title: "Show HN guidelines",
      url: "https://news.ycombinator.com/showhn.html",
      source: "Hacker News",
      description: "What HN actually wants in a Show HN, and the title format that survives moderation.",
      type: "docs",
    },
    {
      title: "Product Hunt · How to launch",
      url: "https://www.producthunt.com/launch",
      source: "Product Hunt",
      description: "Official launch playbook including the timing, hunter strategy, and the day-of checklist.",
      type: "docs",
    },
    {
      title: "Reddit · Self-promotion rules",
      url: "https://www.reddit.com/wiki/selfpromotion/",
      source: "Reddit Help",
      description: "Reddit's own rules for promoting your project without getting shadowbanned. Read before posting.",
      type: "docs",
    },
    {
      title: "How I got 1,000 users for my SaaS",
      url: "https://www.indiehackers.com/post/how-i-got-the-first-1000-users-for-my-saas-d39b1ddf01",
      source: "Indie Hackers",
      description: "Channel-by-channel breakdown of what worked and what wasted weeks.",
      type: "article",
    },
    {
      title: "Pieter Levels on launches",
      url: "https://levels.io/",
      source: "Pieter Levels",
      description: "Solo founder of nomadlist, photoAI, and more. His launches are public, raw, and full of mistakes worth learning from.",
      type: "article",
    },
  ],
  "09": [
    {
      title: "PostHog · Funnels",
      url: "https://posthog.com/docs/product-analytics/funnels",
      source: "PostHog Docs",
      description: "How to build a funnel that tells you exactly which step is killing conversion.",
      type: "docs",
    },
    {
      title: "PostHog · Session replays",
      url: "https://posthog.com/docs/session-replay",
      source: "PostHog Docs",
      description: "What to look for in a replay: rage clicks, dead clicks, hesitation. Watch five before opening any dashboard.",
      type: "docs",
    },
    {
      title: "Continuous discovery habits",
      url: "https://www.producttalk.org/2021/05/continuous-discovery/",
      source: "Teresa Torres",
      description: "Weekly cadence for talking to users and turning what they say into product changes.",
      type: "article",
    },
    {
      title: "How Superhuman built an engine to find PMF",
      url: "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/",
      source: "First Round Review",
      description: "Superhuman's PMF measurement framework. A single survey question that tells you whether to iterate or pivot.",
      type: "article",
    },
  ],
};
