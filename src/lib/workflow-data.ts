import type { StepData } from "@/components/workflow/workflow-stepper";

export const WORKFLOW_PAGE_STEPS: StepData[] = [
  {
    step: "intro",
    title: "Start here",
    emoji: "🍳",
    timeEstimate: "5 min",
    whatThis: "How this cookbook works and what each recipe gives you. Skim this once and everything after slots into place.",
    why: "Recipes assume you know the format. Five minutes here saves you guessing in every later stage.",
    // Hero trailer (hand-picked intro clip). The real YouTube thumbnail is the
    // poster; clicking opens the video on YouTube. Swap `youtubeId` (and `href`)
    // to change it.
    previewVideo: {
      youtubeId: "tYhgWRJeYzs",
      href: "https://www.youtube.com/watch?v=tYhgWRJeYzs",
    },
    courseIntro: {
      lead: "The exact, ordered path indie devs use to take an app from raw idea to live, with AI doing most of the typing. You build your real app as you go, recipe by recipe.",
      outcomes: [
        "A working dev environment and an AI agent wired to your repo.",
        "A validated idea, a PRD, and a stack you can defend.",
        "An AGENTS.md and context files that keep the AI on the rails.",
        "A real build loop: one task, one diff, tested and shipped.",
        "A launch plan and an iteration loop once people show up.",
      ],
      forWho: [
        "You can describe what you want but get lost the moment you open a terminal.",
        "You have shipped with AI before but it turns to spaghetti past the first prototype.",
        "You want one ordered path instead of forty open browser tabs.",
      ],
      faqs: [
        { q: "Do I need to know how to code?", a: "No. Recipe 00 sets up everything from zero. The whole point is that you direct an AI agent in plain language and learn the moving parts as you go." },
        { q: "Is this free?", a: "Yes, completely. No account, no sign-up, no premium tier. Your checklist progress is saved in this browser only." },
        { q: "Which AI tools does it work with?", a: "Every prompt is tested against Claude Code, Cursor, and Windsurf. Recipe 00 helps you pick one." },
        { q: "Do I have to do the recipes in order?", a: "They run 00 to 09 from idea to live product, but you can jump. Already have a stack? Skip to Context (04)." },
        { q: "Will this actually ship a real app?", a: "That is the design. You build your real project alongside the recipes, the tasks are the build, not a tutorial you redo later." },
      ],
    },
    tasks: [
      {
        heading: "How to use this cookbook",
        description: "Four things to know before you cook.",
        items: [
          { text: "Recipes run in order, but you can jump.", detail: "00 to 09 is the full path from raw idea to live product. Skip to 04 if you already have a stack." },
          { text: "Check off tasks as you finish them.", detail: "Progress is saved in this browser only. No account, no sync." },
          { text: "Copy prompts straight into your AI agent.", detail: "Every prompt is tested against Claude Code, Cursor, and Windsurf." },
          { text: "Drop templates into your repo.", detail: "AGENTS.md, PRD, architecture, plan, MEMORY. Five files that anchor every AI session." },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "",
  },
  {
    step: "00",
    title: "Environment",
    emoji: "⚙️",
    timeEstimate: "45 min",
    whatThis: "Get your terminal, editor, Git, Node.js, and AI tool working before you write a single line of code.",
    why: "Most beginners fail in setup chaos, not bad ideas. Lock this in once, you'll never think about it again.",
    tldr: {
      accomplish: "You'll be able to open a terminal, version your work with Git, run a Next.js project, and direct one AI tool wired straight to your repo.",
      deliverable: "A working dev environment + one AI tool wired to your repo",
      feedsInto: "Research needs this repo to save docs/research.md into and your AI tool ready to run searches.",
      prerequisites: ["Nothing, we start from zero."],
      checklist: [
        "Open a terminal and run a command",
        "Install Git and confirm it works",
        "Create a GitHub repo and push a README",
        "Install Node.js LTS and scaffold a Next.js app",
        "Pick and wire up one AI coding tool",
      ],
    },
    stuck: {
      mistakes: [
        "Tool-shopping forever: read one comparison, pick one AI tool, and stop comparing.",
        "Installing Node Current instead of LTS: grab the LTS build, then check node -v.",
        "Skipping Git because it feels optional: it is your undo button, set it up now.",
        "Trying both Claude Code and an IDE at once: commit to one, you can switch later.",
      ],
      success: "Every tool opens, every check command answers cleanly, and you have one AI agent talking to a real repo.",
    },
    moveOnWhen: "your app opens on localhost and your repo is pushed to GitHub.",
    faqs: [
      { q: "Do I have to learn the terminal?", a: "Only enough to open it and run a command like ls. The videos in this step get you comfortable, and the AI handles the rest from there." },
      { q: "Why pick just one AI tool instead of trying both?", a: "Running Claude Code and an IDE at once is how you stall in setup chaos. Commit to one now, you can always switch later." },
      { q: "Do I really need Git if it's just me building?", a: "Yes. It's your undo button for the whole project, and it's what the AI reads to see what changed. Set it up before you write code." },
    ],
    learn: [
      { kind: "text", text: "Welcome to the very first recipe. Before we build anything, we have to set up the kitchen. The honest truth is that most beginners don't fail because their idea was bad, they fail because they got lost in setup and never recovered. So let's take this slowly and get it right once." },
      { kind: "case", label: "RunStreak", input: "Just an idea for RunStreak", process: "Install Node, Git, Claude Code; create the repo", output: "Empty Next.js repo pushed to GitHub" },
      { kind: "text", text: "Here is the whole path you're about to walk:" },
      { kind: "diagram", steps: ["Research", "PRD", "Stack", "Context", "Build", "Quality", "Ship", "Launch", "Iterate"] },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll have a working environment you're comfortable opening: a terminal you can move around in, an editor, Git for version control, Node.js to run your project, and one AI coding tool wired directly to your code. After this, you never have to think about setup again." },
      { kind: "heading", text: "What an environment actually is" },
      { kind: "text", text: "Your environment is just the small set of tools that let you talk to your computer and let your AI agent talk to your code. You can't direct an AI from a tool you can't open, so we put each piece in place deliberately. Don't worry if the command line feels foreign right now, that's exactly what we're about to fix." },
      { kind: "text", text: "Start here, because every later step assumes you can find your way around a terminal. Watch this and just get comfortable typing commands and seeing output." },
      { kind: "video", title: "Command line crash course for beginners", youtubeId: "uwAqEzhyjtw" },
      { kind: "text", text: "Take away one thing from that: the terminal is not scary, it's just a place where you type a command and the computer answers." },
      { kind: "heading", text: "How to actually set it up" },
      { kind: "text", text: "Next comes version control. Git is how you save your work, branch off to try things, and roll back when something breaks, and it's also what your AI tool reads to understand what changed. Here it is in 100 seconds, which is genuinely all you need to start." },
      { kind: "video", title: "Git explained in 100 seconds", youtubeId: "hwP7WQkmECE" },
      { kind: "text", text: "The point to hold onto: Git is your undo button for the whole project, and it never forgets." },
      { kind: "text", text: "Now wire up the AI tool itself, so it has direct access to your codebase instead of you copy-pasting back and forth. Follow along and connect it to a real folder." },
      { kind: "video", title: "Claude Code getting started tutorial", youtubeId: "gh2_PhgZGsM" },
      { kind: "subheading", text: "Keep these open while you work" },
      { kind: "text", text: "These are the install pages for the tools the checklist walks you through. Pin them in a tab and work top to bottom." },
      { kind: "read", title: "Git, official downloads and book", href: "https://git-scm.com", blurb: "Download Git and confirm it with git --version." },
      { kind: "read", title: "Node.js, LTS download", href: "https://nodejs.org", blurb: "Grab the LTS build, not Current, then check node -v." },
      { kind: "read", title: "Claude Code, install and getting started", href: "https://claude.ai/download", blurb: "The terminal agent with direct access to your whole codebase." },
      { kind: "read", title: "GitHub, create a repo", href: "https://github.com", blurb: "Make a new repo and push an empty README to start." },
      { kind: "heading", text: "Where people go wrong" },
      { kind: "text", text: "The classic trap at this stage is tool-shopping forever. If you're still torn on which AI tool to commit to, read one of these and then decide, don't keep both tabs open for a week." },
      { kind: "read", title: "Claude Code vs Codex CLI: Which Terminal Agent to Pick in 2026", slug: "claude-code-vs-codex-cli", blurb: "How the two terminal agents diverge, and which to reach for when." },
      { kind: "read", title: "Cursor vs Windsurf: Which AI IDE to Pick in 2026", slug: "cursor-vs-windsurf", blurb: "If you prefer an IDE over the terminal, this compares the two main forks." },
      { kind: "text", text: "Pick one tool and stop comparing. You can always switch later, but you can't build while you're still shopping." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Confirm each tool works before moving on.",
        items: [
          {
            text: "Open a terminal and run `ls`, confirm files appear.",
            why: "Every later step assumes you can move around a terminal.",
            links: [
              { label: "Windows Terminal", href: "https://aka.ms/terminal" },
              { label: "iTerm2", href: "https://iterm2.com" },
            ],
          },
          {
            text: "Install one AI coding tool: Claude Code (CLI) or Cursor/VS Code if you prefer an IDE.",
            why: "It needs direct access to your codebase so you stop copy-pasting.",
            links: [
              { label: "Claude Code", href: "https://claude.ai/download" },
              { label: "Cursor", href: "https://cursor.com" },
              { label: "VS Code", href: "https://code.visualstudio.com" },
            ],
          },
          {
            text: "Install Git and run `git --version` to confirm.",
            why: "Git is your undo button and what the AI reads to see what changed.",
            links: [{ label: "Git", href: "https://git-scm.com" }],
          },
          {
            text: "Create a GitHub account, make a new repo, and push an empty README.",
            why: "Gives the AI a real repo to work against from the start.",
            links: [{ label: "GitHub", href: "https://github.com" }],
          },
          {
            text: "Install Node.js LTS (not Current) and run `node -v` to confirm.",
            why: "LTS is the stable build the rest of the stack expects.",
            links: [{ label: "Node.js", href: "https://nodejs.org" }],
          },
          {
            text: "Run `npx create-next-app@latest` and confirm the project opens at localhost.",
            why: "If it opens, your terminal, Node, and npm are all wired correctly.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Create `TASK.md` in the repo root as your living task list.",
            why: "A written list keeps each session aimed at one thing instead of drifting.",
            detail: "Add tasks before starting, check them off when done, with a 'Discovered During Work' section for tasks that surface mid-session.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "",
  },
  {
    step: "01",
    title: "Deep Research",
    emoji: "🔍",
    timeEstimate: "60-90 min",
    whatThis: "Confirm the problem is real, the market exists, and the wedge is yours, before writing any code. Use a chat AI with web search, not your IDE.",
    why: "Most projects fail before the build starts. One hour of real market validation saves weeks of building the wrong thing. Skipping this is the single most expensive mistake in vibe coding.",
    tldr: {
      accomplish: "You'll be able to say, with real evidence instead of hope, whether your idea has a market and where your wedge is.",
      deliverable: "docs/research.md",
      feedsInto: "The PRD is built directly from what you validated here.",
      prerequisites: ["Recipe 00 done (a working AI tool)", "A chat AI with web search on"],
      checklist: [
        "Search for the idea and check 12 months of trends",
        "Hunt for real complaints on Reddit and X",
        "Find 3 competitors and note each gap",
        "Run an AI market research pass and save it",
        "Quantify the wedge and write kill criteria",
      ],
    },
    stuck: {
      mistakes: [
        "Asking friends if they like it: that is reassurance, go find complaints from strangers instead.",
        "Trusting an AI summary over real signal: gather manual evidence first, AI will hallucinate demand.",
        "Treating one trend spike as demand: rising or flat over 12 months is healthy, a single spike is hype.",
        "Skipping kill criteria: write them down before any code, you won't enforce them later otherwise.",
      ],
      success: "You can point to real complaints, real competitors, and a named gap that is yours to fill.",
    },
    moveOnWhen: "you can say in one sentence who has this problem and why they'd care.",
      faqs: [
        { q: "Can't I just ask the AI if my idea is good?", a: "No, it will hallucinate demand to be agreeable. Gather real complaints from strangers first, then let AI summarize what you found." },
        { q: "What if I find ten competitors already doing this?", a: "That's a good sign, not a bad one. It means people want this, and three competitors sharing one gap is your opening to fill." },
        { q: "Do I have to talk to real users?", a: "Skip it if the idea is purely for yourself, but for anything else five real conversations beat any AI summary at finding your wedge." },
      ],
    learn: [
      { kind: "text", text: "This is the step almost everyone wants to skip, and it's the most expensive one to skip. Before you write a single line of code, your job is to prove that the problem is real, the market exists, and the wedge is yours. We do all of this in a chat AI with web search, not in your IDE." },
      { kind: "case", label: "RunStreak", input: "An empty Next.js repo for RunStreak", process: "Check r/running + existing streak apps", output: "docs/research.md: real demand, wedge is 'dead simple, one tap'" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll be able to look at your own idea and say, with evidence rather than hope, whether real people have this problem and whether there's an opening for you. One hour spent here can save you weeks of building something nobody wants." },
      { kind: "heading", text: "What validation actually is" },
      { kind: "text", text: "Validation is the search for signal, not reassurance. It's easy to ask friends if they like your idea and hear a polite yes, but that tells you nothing. Real validation means finding evidence that strangers already feel this pain: complaints they post, tools they pay for, searches they run. Start with this so you collect the right kind of evidence." },
      { kind: "video", title: "How to validate a startup idea", youtubeId: "mNTsaclFl_E" },
      { kind: "text", text: "The lesson to carry from that: you're hunting for proof of existing demand, not for permission to build." },
      { kind: "heading", text: "How you find and test an idea" },
      { kind: "text", text: "Before you can validate an idea, you need one worth validating. This sharpens how good ideas actually surface, usually from problems you've noticed yourself rather than ones you invented to sound clever." },
      { kind: "video", title: "Finding startup ideas that work", youtubeId: "FlCWg-KkUN4" },
      { kind: "text", text: "When you save the output, it should read like real signal you can act on. Here is what RunStreak's came out looking like:" },
      { kind: "example", filename: "docs/research.md", content: `# Research: RunStreak

## Demand
- r/running threads ask for a "dead simple" run-streak tracker, weekly.
- Google Trends: "run streak app" flat-to-rising over 12 months.

## Competitors
- Strava: powerful, but streaks are buried under social + GPS.
- Streaks (generic habit app): not running-specific, no run context.

## Wedge
One tap to log today's run, one number on screen: your streak.
No GPS, no feed, no setup. Dead simple beats feature-rich here.

## Kill criteria
If I can't find 10 real complaints about existing apps in 1 hour, stop.` },
      { kind: "subheading", text: "Keep these open while you research" },
      { kind: "text", text: "These are the tools the checklist sends you through. Keep them open and gather your own signal as you go." },
      { kind: "read", title: "Google Trends", href: "https://trends.google.com", blurb: "Check 12 months of interest, rising or flat is healthy, one spike is hype." },
      { kind: "read", title: "Product Hunt", href: "https://producthunt.com", blurb: "Find direct competitors and note one strength and one gap for each." },
      { kind: "read", title: "Claude.ai", href: "https://claude.ai", blurb: "Run market research with web search on, then save it to docs/research.md." },
      { kind: "heading", text: "Go deeper" },
      { kind: "text", text: "When you want the deeper theory behind where good ideas come from, this essay is the canonical read. Read it to internalize the pattern of noticing real problems instead of inventing fake ones." },
      { kind: "read", title: "How to Get Startup Ideas, Paul Graham", href: "https://paulgraham.com/startupideas.html", blurb: "Paul Graham on noticing real problems instead of inventing fake ones." },
      { kind: "text", text: "If you can't find evidence the problem is real, that's not a failure, it's the cheapest lesson you'll ever get." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Manual signal first, AI will hallucinate demand if you skip this.",
        items: [
          {
            text: "Google your idea exactly as a user would search for it.",
            why: "No results is a red flag, ten existing tools is a sign people want this.",
          },
          {
            text: "Check Google Trends over 12 months: rising or flat is healthy, one spike then nothing is hype.",
            why: "A single spike is a fad, sustained interest is a market.",
            links: [{ label: "Google Trends", href: "https://trends.google.com" }],
          },
          {
            text: "Search Reddit and X for real complaints, like '[topic] annoying' or '[tool] broken'.",
            why: "No complaints in two years means the pain isn't strong enough to build on.",
            links: [
              { label: "Reddit", href: "https://reddit.com/search" },
              { label: "X", href: "https://x.com/search" },
            ],
          },
          {
            text: "Find 3 direct competitors and write one strength and one gap for each.",
            why: "Can't find three means no market, three sharing one gap is your opening.",
            strongExample: "Strava: powerful but buries streaks under GPS and social. Streaks: generic, no run context. Shared gap: nobody makes the streak the whole product.",
            weakExample: "'No real competitors' or three names with no strength or gap noted.",
            links: [
              { label: "Product Hunt", href: "https://producthunt.com" },
              { label: "SimilarWeb", href: "https://similarweb.com" },
            ],
          },
          {
            text: "Run an AI market research pass with web search on and save it to `docs/research.md`.",
            why: "A chat AI with search is the right tool for this phase, not your coding IDE.",
            detail: "Paste: 'Research this market: [your idea]. Who are the competitors? What are users complaining about? What gaps exist?'",
            links: [
              { label: "Claude.ai", href: "https://claude.ai" },
              { label: "ChatGPT", href: "https://chatgpt.com" },
            ],
          },
          {
            text: "Write kill criteria before any code, like 'if I can't find 10 real complaints in 1 hour, I stop.'",
            why: "Written down now, you'll actually enforce it, decided later you never will.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Talk to 5 potential users about the problem, not your solution.",
            why: "The same complaint three times is your wedge, and five real talks beat any AI summary.",
            strongExample: "'I lose my run streak whenever I forget to open the GPS app first' said by 4 of 5 runners, unprompted.",
            weakExample: "A friend saying 'cool idea, I'd use it' when you describe the app.",
            detail: "Skip if the idea is purely for yourself.",
          },
          {
            text: "Quantify the wedge: what do users pay now in money, time, or annoyance to solve this?",
            why: "An answer of 'nothing' means demand is weaker than it looks.",
            detail: "$0 willing-to-pay is fine for hobby projects, find the real price point for anything you want to monetize.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "research-validate",
  },
  {
    step: "02",
    title: "PRD",
    emoji: "📝",
    timeEstimate: "30-45 min",
    whatThis: "Write one file that says exactly what you're building, why, and what success looks like. This is what you hand to AI at the start of every session.",
    why: "Without a spec, AI fills every gap with assumptions, and those assumptions ship. Most agent failures are context failures, not model failures.",
    tldr: {
      accomplish: "You'll be able to write one file that states what you're building, why, and what success looks like, sharp enough that an AI makes the same calls you would.",
      deliverable: "docs/PRD.md",
      feedsInto: "This is what gets loaded into AGENTS.md next, so Stack and Build stop guessing scope.",
      prerequisites: ["Recipe 01 done (a validated idea)"],
      checklist: [
        "Name one real target user",
        "Write the goal and the why in plain sentences",
        "Cut the feature list down to 5 MVP features",
        "List what is explicitly out of scope",
        "Write success criteria as testable conditions",
      ],
    },
    stuck: {
      mistakes: [
        "Listing 12 features and calling it an MVP: cut to 5, a long list is a roadmap pretending to be a product.",
        "Leaving gaps the AI will fill: every gap you leave becomes an assumption that ships.",
        "Skipping the out-of-scope list: without it, every feature you didn't mention becomes a maybe.",
        "Writing vague success criteria like 'auth works': make it a testable condition a stranger could check.",
      ],
      success: "You can say what you're building in one sentence and point to the single line that defines 'done'.",
    },
    moveOnWhen: "a fresh AI chat can read your PRD and explain exactly what to build.",
      faqs: [
        { q: "How many features should my MVP have?", a: "Five at most. A list of twelve is a roadmap pretending to be a product, and every extra feature is a week spent building the wrong thing." },
        { q: "Do I really need an out-of-scope list?", a: "Yes. Without it, every feature you didn't mention becomes a maybe the AI builds on its own. Name at least three things you're not building." },
        { q: "What makes a success criterion good enough?", a: "It has to be testable by a stranger. 'Auth works' isn't checkable, 'signs in and sees streak = 1 in under 30 seconds' is." },
      ],
    learn: [
      { kind: "text", text: "Now that you know the problem is real, you need to write down exactly what you're going to build about it. That document is your PRD, and it's the single most leveraged file in this whole cookbook, because you'll hand it to the AI at the start of every session." },
      { kind: "case", label: "RunStreak", input: "docs/research.md proving real demand", process: "Name the user, cut features down to the MVP", output: "docs/PRD.md: user = habit-building runner; MVP = log a run, see streak" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll have one file that states what you're building, why, and what success looks like, clearly enough that an AI reading it makes the same decisions you would. When the spec is sharp, the AI stops guessing." },
      { kind: "heading", text: "What a PRD is" },
      { kind: "text", text: "A PRD, a product requirements document, is just a plain description of the product: who it's for, what it does, and how you'll know it's working. The reason it matters so much here is mechanical. An AI fills every gap you leave with its own assumptions, and those assumptions ship. A vague PRD produces a vague product. Start with how to write one." },
      { kind: "video", title: "How to write a product requirements document (PRD)", youtubeId: "jdSFQG7dyrk" },
      { kind: "heading", text: "How to actually write it" },
      { kind: "text", text: "The hardest and most important part of a good PRD is cutting your feature list down to the few that actually matter. Beginners want to list everything, but a long list isn't ambition, it's a roadmap pretending to be a product. This explains why that restraint is the entire point." },
      { kind: "video", title: "What is an MVP, and why cutting features is the point", youtubeId: "MHqz8oNSraI" },
      { kind: "text", text: "Take this from it: every feature you cut now is a week you don't spend building the wrong thing." },
      { kind: "text", text: "Notice how short RunStreak's stays once the list is cut to what actually matters:" },
      { kind: "example", filename: "docs/PRD.md", content: `# PRD: RunStreak

## User
A habit-building runner who wants to run daily and not break the chain.

## Goal
Log today's run in one tap and see the current streak, nothing else.

## Why
Existing apps bury streaks under GPS and social feeds. The streak is the habit.

## MVP features
1. Log a run for today (one tap).
2. See the current streak count.
3. Sign in so the streak persists.

## Out of scope
No GPS, no social feed, no run distance or pace, no notifications.

## Success criteria
A new user signs in, logs a run, and sees streak = 1 in under 30 seconds.` },
      { kind: "subheading", text: "Keep these open while you write" },
      { kind: "text", text: "These two help you scope the spec and understand how it feeds the AI later." },
      { kind: "read", title: "Shape Up, scoping and appetite", href: "https://basecamp.com/shapeup", blurb: "Basecamp's method for cutting a feature list down to what fits." },
      { kind: "read", title: "Context Engineering intro, how PRDs feed AI context", href: "https://github.com/coleam00/context-engineering-intro", blurb: "How a clear spec becomes the context layer your agent reasons from." },
      { kind: "heading", text: "Where people go wrong" },
      { kind: "text", text: "The common mistake is scoping a polished v1 and calling it an MVP. Read this to be sure you're building the smallest thing that proves the idea, and to recognize when yours is actually done." },
      { kind: "read", title: "What an MVP Actually Is (Most People Build the Wrong Thing)", slug: "what-an-mvp-actually-is", blurb: "What an MVP is really for, and how to know when yours is done." },
      { kind: "text", text: "If you can write what you're building in one sentence, you understand it. If you can't, the PRD isn't finished yet." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Write this yourself. A vague PRD produces a vague product.",
        items: [
          {
            text: "Name one target user: one real person in one real situation.",
            why: "A named user makes every later scope decision obvious.",
            detail: "Not 'developers'. Example: 'a freelance designer with 3 to 5 clients who loses track of feedback threads'.",
          },
          {
            text: "Write the Goal: what the product does in one sentence.",
            why: "If it doesn't fit one sentence, you don't understand it yet.",
            detail: "Example: 'A minimal client portal where freelancers collect and track feedback in one place.'",
          },
          {
            text: "List max 5 MVP features under What, and cut anything beyond that.",
            why: "A list of 12 is a roadmap pretending to be a product.",
            links: [{ label: "Shape Up", href: "https://basecamp.com/shapeup" }],
          },
          {
            text: "Write Success Criteria as testable conditions a stranger could check.",
            why: "'Auth works' isn't checkable, 'signs up and reaches the dashboard in under 60 seconds' is.",
          },
          {
            text: "Save as `docs/PRD.md` in the repo root.",
            why: "You paste this into every AI session and load it into AGENTS.md.",
            links: [{ label: "Download vibeprompt's PRD template", href: "/templates/PRD.md" }],
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Write the Why: the business value this creates and the problem it solves.",
            why: "It keeps you honest about whether the feature set actually earns its place.",
            detail: "Who benefits? What metric improves? Why does this matter to ship?",
          },
          {
            text: "Write the out-of-scope list with at least 3 explicit exclusions.",
            why: "Without it, every feature you didn't mention becomes a maybe the AI builds anyway.",
            detail: "'No user profiles', 'no notifications', 'no admin dashboard'.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "prd-spec",
  },
  {
    step: "03",
    title: "Stack",
    emoji: "🎨",
    timeEstimate: "20-30 min",
    whatThis: "Lock every technology decision in one file before writing any code. The AI picks whatever it was trained on most, not what fits your project.",
    why: "Mid-build stack changes cost ten times more than upfront decisions. No open choices past this step.",
    tldr: {
      accomplish: "You'll be able to lock every technology decision, framework, UI, database, auth, and deploy, in one file with a reason for each.",
      deliverable: "docs/TechDesign.md",
      feedsInto: "Context writes these stack decisions into AGENTS.md so the AI stops picking random tech.",
      prerequisites: ["Recipe 02 done (a sharp PRD)"],
      checklist: [
        "Pick a frontend framework",
        "Pick a UI system",
        "Pick a database and auth",
        "Connect the repo to a deploy host today",
        "Write every decision and its reason into one file",
      ],
    },
    stuck: {
      mistakes: [
        "Letting the AI pick the stack: it reaches for whatever it saw most in training, not what fits your app.",
        "Leaving a layer as 'I'll decide later': an open choice is one the AI makes for you, decide it now.",
        "Waiting until launch to connect a deploy host: wire it today so every push deploys.",
        "Changing the stack mid-build: it costs far more once half the code is written against the old choice.",
      ],
      success: "Every layer is chosen, written down with a reason, and there are no open decisions left for the AI to make.",
    },
    moveOnWhen: "every layer of your stack is written down with a one-line reason.",
      faqs: [
        { q: "Can't I just let the AI choose the stack?", a: "No. Left to itself it reaches for whatever it saw most in training, not what fits your app. Every open choice is one it makes for you." },
        { q: "Why connect a deploy host now instead of at launch?", a: "Wire it today so every push deploys and shipping never blocks you later. Waiting until launch turns deploy into its own chore." },
        { q: "What if I'm not sure a layer is the right pick?", a: "Pick one, write the one-line reason, and move on. This step is short on purpose, changing the stack mid-build costs far more than deciding now." },
      ],
    learn: [
      { kind: "text", text: "With your PRD in hand, the next job is to decide what you'll build it with, and to write those decisions down before any code exists. This step is short but it has outsized consequences, because the choices you lock in now shape every session after it." },
      { kind: "case", label: "RunStreak", input: "docs/PRD.md with the MVP scoped", process: "Pick each layer to fit the app, connect a deploy host", output: "docs/TechDesign.md: Next.js, Supabase (auth + runs table), Vercel" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll have every technology decision made and recorded in one file: framework, UI, database, auth, and deploy, each with the reason you chose it. After this, there are no open choices for the AI to make on your behalf." },
      { kind: "heading", text: "What a stack is and why you lock it" },
      { kind: "text", text: "Your stack is simply the set of technologies your app runs on. Here's why locking it matters: left to itself, an AI reaches for whatever it saw most during training, not what fits your project. And changing the stack halfway through a build costs far more than deciding up front, because half the code has already been written against the old choice. So we choose deliberately, layer by layer." },
      { kind: "text", text: "Start with the framework most indie projects default to. Watch this to get a feel for how the app is structured." },
      { kind: "video", title: "Next.js App Router crash course", youtubeId: "I1V9YWqRIeI" },
      { kind: "heading", text: "How you choose each layer" },
      { kind: "text", text: "Next comes the UI layer, the part you'll actually build screens with. Watch how components are added and customized so you know what you're committing to." },
      { kind: "video", title: "shadcn/ui, add and customize components", youtubeId: "wcTzlJi2Oz4" },
      { kind: "text", text: "Then the database and auth layer that covers most indie needs out of the box, so you're not stitching three services together on day one." },
      { kind: "video", title: "Supabase crash course for beginners", youtubeId: "dU7GwCOgvNY" },
      { kind: "text", text: "Written down, each choice carries the reason it was made. Here is RunStreak's:" },
      { kind: "example", filename: "docs/TechDesign.md", content: `# Tech Design: RunStreak

## Framework
Next.js (App Router). One-click Vercel deploy, fine for a tiny web app.

## UI
Tailwind CSS + shadcn/ui. The whole app is one screen, no need for more.

## Database + auth
Supabase. Postgres for a single \`runs\` table, plus built-in auth.

## Data model
runs: id, user_id, run_date (one row per day), created_at.
Streak is computed from consecutive run_date values, not stored.

## Deploy
Vercel, connected today so every push to main deploys.` },
      { kind: "subheading", text: "Keep these open while you decide" },
      { kind: "text", text: "Pin the official docs for each layer so the AI builds against the real, current APIs instead of its training data." },
      { kind: "read", title: "Next.js docs", href: "https://nextjs.org", blurb: "The default frontend for most indie projects, App Router and deploy." },
      { kind: "read", title: "shadcn/ui", href: "https://ui.shadcn.com", blurb: "Components you copy and own, paired with Tailwind CSS." },
      { kind: "read", title: "Supabase", href: "https://supabase.com", blurb: "Postgres, auth, and storage in one, covers most indie needs." },
      { kind: "read", title: "Vercel", href: "https://vercel.com", blurb: "Connect the repo today so every push deploys and every PR previews." },
      { kind: "text", text: "Write all of it into docs/TechDesign.md with the reason for each choice, and leave no decision open past this step." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Make every decision now. Ask AI: 'What is the simplest yet most robust stack for this PRD?'",
        items: [
          {
            text: "Pick a frontend framework: Next.js is the default, Remix if your app is form-heavy.",
            why: "Left open, the AI picks whatever it saw most in training, not what fits your app.",
            links: [
              { label: "Next.js", href: "https://nextjs.org" },
              { label: "Remix", href: "https://remix.run" },
            ],
          },
          {
            text: "Pick a UI system: Tailwind CSS + shadcn/ui is the indie standard.",
            why: "Components you copy and own mean no dependency lock-in later.",
            links: [
              { label: "Tailwind CSS", href: "https://tailwindcss.com" },
              { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            ],
          },
          {
            text: "Pick a database and auth: Supabase bundles Postgres, auth, and storage.",
            why: "One service covers most indie needs so you're not stitching three together on day one.",
            links: [
              { label: "Supabase", href: "https://supabase.com" },
            ],
          },
          {
            text: "Connect your repo to a deploy host today, not at launch.",
            why: "Every push deploys and every PR gets a preview, so shipping never blocks you later.",
            links: [
              { label: "Vercel", href: "https://vercel.com" },
              { label: "Railway", href: "https://railway.app" },
            ],
          },
          {
            text: "Write every decision and its reason into `docs/TechDesign.md`.",
            why: "It loads into every AI session alongside your PRD, leaving no open choice.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Install Context7 MCP if using Claude Code to pull current library docs into context.",
            why: "The AI sees the real API for your exact version instead of hallucinating one.",
            links: [{ label: "Context7", href: "https://context7.com" }],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "architecture-stack",
  },
  {
    step: "04",
    title: "Context",
    emoji: "🗂️",
    timeEstimate: "30-45 min",
    whatThis: "Build the memory system every AI session reads from, AGENTS.md plus a memory-bank folder. This is what separates a codebase that stays coherent from one that doesn't.",
    why: "Every new chat is a blank slate. Without a persistent context layer, every session drifts, different decisions, different conventions, broken consistency.",
    tldr: {
      accomplish: "You'll be able to build a persistent memory the AI reads before every session, so it stops re-guessing your stack and the codebase stops drifting.",
      deliverable: "AGENTS.md + memory-bank/",
      feedsInto: "Every Build task starts from this context, so the agent stays on the rails.",
      prerequisites: ["Recipe 03 done (a locked stack)"],
      checklist: [
        "Create AGENTS.md with your stack and conventions",
        "Add the 500-line, never-overwrite, and test rules",
        "Add a no-touch list of protected files",
        "Create the memory-bank folder with its files",
        "Make every session read the context first",
      ],
    },
    stuck: {
      mistakes: [
        "Writing rules as code instead of plain English: state them in sentences the AI can follow.",
        "Leaving the context layer too thin: if you can't list your files from memory, the AI can't carry the next session.",
        "Forgetting the no-touch list: name the files the AI must never modify, like .env and lockfiles.",
        "Skipping the session-start prompt: tell the AI to read the context and summarize before any code.",
      ],
      success: "A fresh chat walks in already briefed on your stack, rules, and progress, without you re-explaining a thing.",
    },
    moveOnWhen: "a new agent session reads your AGENTS.md and follows your conventions without being re-told.",
      faqs: [
        { q: "Why not just re-explain my stack each chat?", a: "Because every new chat starts blank, so you'd re-guess your conventions every session and the codebase would drift. Write it once and every session inherits it." },
        { q: "Should I write the rules as code?", a: "No, write them in plain English sentences the AI can follow, like 'no file over 500 lines, refactor into modules first'." },
        { q: "How do I know my context files are good enough?", a: "Open a fresh chat, point it at AGENTS.md and the memory-bank, and ask it to summarize. If it walks in briefed without you re-explaining, you're set." },
      ],
    learn: [
      { kind: "text", text: "This is the step that quietly decides whether your project stays coherent or slowly falls apart. Every new chat with an AI starts as a blank slate, so unless you give it a memory to read from, it re-guesses your conventions every single session. Here we build that memory." },
      { kind: "case", label: "RunStreak", input: "docs/TechDesign.md naming the stack", process: "Write the stack and rules into context files", output: "AGENTS.md naming the stack + a memory-bank with the data model" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll have a persistent context layer your AI reads before every session: an AGENTS.md file plus a memory-bank folder. The result is that you stop re-explaining your stack, and the codebase stops drifting from one session to the next." },
      { kind: "heading", text: "What context engineering is" },
      { kind: "text", text: "Context engineering is the practice of writing down, in plain files, everything the AI needs to know before it touches your code: your stack, your conventions, your rules, and what's been done so far. Without it, every new chat begins from zero, and zero means different decisions and broken consistency each time. With it, the AI walks in already briefed. See the setup first." },
      { kind: "video", title: "AGENTS.md and Claude Code memory setup", youtubeId: "TXcr0x9SIXA" },
      { kind: "text", text: "Plain English, not code. Here is RunStreak's, short enough to actually be read every session:" },
      { kind: "example", filename: "AGENTS.md", content: `# RunStreak, agent guide

## Stack
Next.js (App Router), Tailwind + shadcn/ui, Supabase (auth + Postgres), Vercel.

## Conventions
Components in src/components, kebab-case file names.
The streak is computed from the runs table, never stored as a column.

## Rules
- No file over 500 lines, refactor into modules first.
- Never overwrite existing code unless I explicitly ask.
- Every feature needs 3 tests: expected use, edge case, failure case.

## Never touch
.env, package-lock.json.

## Start of session
Read this file, docs/PRD.md, and memory-bank/@architecture.md, then summarize.` },
      { kind: "subheading", text: "Keep these open while you write your context files" },
      { kind: "text", text: "These are the reference docs and ready-made scaffolds the checklist points to. Lean on the scaffolds rather than writing everything from a blank page." },
      { kind: "read", title: "Claude Code memory docs", href: "https://docs.anthropic.com/en/docs/claude-code/memory", blurb: "How Claude Code loads AGENTS.md and memory files at session start." },
      { kind: "read", title: "Context Engineering intro, the full pattern", href: "https://github.com/coleam00/context-engineering-intro", blurb: "The complete context-engineering pattern, beyond just a single file." },
      { kind: "read", title: "KhazP vibe coding template, full project scaffold", href: "https://github.com/KhazP/vibe-coding-prompt-template", blurb: "A ready-made scaffold with AGENTS.md and supporting context files." },
      { kind: "heading", text: "Go deeper" },
      { kind: "text", text: "Two decisions trip people up here: which context-file format to use across tools, and which model to run for a given step. Read these to settle both before you go further." },
      { kind: "read", title: "AGENTS.md vs CLAUDE.md vs .cursorrules: Which One Should You Use?", slug: "agents-vs-claude-vs-cursorrules", blurb: "Three context-file formats, one job, and the safest cross-tool setup." },
      { kind: "read", title: "Which LLM for Which Step: A Model Strategy Matrix for Vibe Coders", slug: "which-llm-for-which-step", blurb: "A model-by-step matrix so you stop guessing which AI to use where." },
      { kind: "text", text: "Set this up once and every future session inherits it. It's the highest-leverage hour you'll spend in the whole build." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Set this up once. Every session reads from it, no more re-explaining your stack.",
        items: [
          {
            text: "Create `AGENTS.md` (or `CLAUDE.md`) in the repo root.",
            why: "Claude Code reads it automatically at the start of every session.",
            links: [
              { label: "Download vibeprompt's AGENTS.md template", href: "/templates/AGENTS.md" },
              { label: "Claude Code memory docs", href: "https://docs.anthropic.com/en/docs/claude-code/memory" },
              { label: "KhazP template", href: "https://github.com/KhazP/vibe-coding-prompt-template/blob/main/AGENTS.md" },
            ],
          },
          {
            text: "Write your stack, folder structure, and naming conventions in plain English, not code.",
            why: "Sentences the AI can follow stop it re-guessing your conventions each session.",
            detail: "'We use Next.js App Router. All components go in src/components. File names are kebab-case. No file exceeds 500 lines, refactor into modules instead.'",
          },
          {
            text: "Create a `memory-bank/` folder with its files.",
            why: "The AI reads these before every session so the codebase stops drifting.",
            detail: "`@architecture.md` (file map, always read), `@design-doc.md` (your PRD, always read), `progress.md` (completed steps), `implementation-plan.md` (ordered task list), `MEMORY.md` (each agent appends what it learned so the next session continues).",
            links: [
              { label: "Download @architecture.md template", href: "/templates/architecture.md" },
              { label: "Download implementation-plan.md template", href: "/templates/implementation-plan.md" },
              { label: "Download MEMORY.md template", href: "/templates/MEMORY.md" },
              { label: "EnzeD memory-bank pattern", href: "https://github.com/EnzeD/vibe-coding" },
            ],
          },
          {
            text: "Start every AI session by telling it to read AGENTS.md, docs/PRD.md, and memory-bank/@architecture.md and summarize before coding.",
            why: "A fresh chat walks in already briefed instead of guessing.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Add the 500-line rule: never create a file longer than 500 lines, refactor into modules first.",
            why: "This one rule prevents the monolith problem that makes vibe-coded codebases unmaintainable.",
          },
          {
            text: "Add the never-overwrite rule: never delete or overwrite existing code unless explicitly instructed.",
            why: "It forces an explicit ask, preventing the silent regressions the AI is primed to defend.",
          },
          {
            text: "Add the test rule: every new feature needs 3 tests, 1 expected use, 1 edge case, 1 failure case.",
            why: "Locking it in context means the AI writes the tests without being reminded.",
          },
          {
            text: "Add a no-touch list of files the AI must never modify, like `.env` and `package-lock.json`.",
            why: "It keeps the agent away from the files that break the build when touched.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "agent-setup",
  },
  {
    step: "05",
    title: "Build",
    emoji: "🔄",
    timeEstimate: "30-90 min / task",
    whatThis: "One task. Plan first. Execute. Verify. Commit. Start a new chat. Repeat. Planning is everything, do not let the AI plan autonomously.",
    why: "Big prompts produce big diffs. Big diffs don't get reviewed. Small loops mean smaller diffs, clean rollback points, and a codebase you can understand.",
    tldr: {
      accomplish: "You'll be able to run the build loop on your own project: one task, plan first, execute, verify, commit, then a fresh chat and go again.",
      deliverable: "A tested, committed feature",
      feedsInto: "Quality has real, small diffs to check before they reach users.",
      prerequisites: ["Recipe 04 done (a briefed agent)"],
      checklist: [
        "Break the PRD into atomic tasks",
        "Use Plan Mode and approve the plan before coding",
        "Build one vertical slice at a time",
        "Review every changed line, then commit",
        "Start a fresh chat for the next task",
      ],
    },
    stuck: {
      mistakes: [
        "Skipping the plan and letting the agent run: stop, make it list the steps and files first.",
        "Prompting for a huge change at once: big diffs get rubber-stamped, keep each task to under 3 files.",
        "Building the whole UI then wiring the API later: build one slice, UI plus API plus test, together.",
        "Reusing one long, noisy chat: start a fresh context per task, it produces better output.",
      ],
      success: "Each task lands as a small, reviewed, committed diff and you stay the one steering the codebase.",
    },
    moveOnWhen: "one small vertical slice works, has been reviewed, and is committed.",
      faqs: [
        { q: "Why start a fresh chat after every task?", a: "A long, noisy context degrades the output. A clean chat per task keeps each diff small and the agent focused on the one thing." },
        { q: "Do I have to use Plan Mode every single time?", a: "Yes. Approving a tight plan first is the one habit that keeps each diff small enough to actually read, never let the agent decide architecture unsupervised." },
        { q: "What if my task feels too big to fit in three files?", a: "Then it's not atomic yet, split it. 'Add /login with email sign-in' is one task, 'add auth' is several." },
      ],
    learn: [
      { kind: "text", text: "This is the heart of the cookbook, the part you'll spend the most time in. Everything before now was preparation, and everything after is about people using what you make. Here you actually build, and the whole craft comes down to one loop repeated with discipline." },
      { kind: "case", label: "RunStreak", input: "First task: log-a-run form", process: "Plan, build, verify, commit", output: "Working POST that saves a run and updates the streak" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll be able to run the build loop on your own project: take one task, plan it first, execute, verify, commit, then open a fresh chat and go again. Done right, you stay the one steering, instead of the codebase steering you." },
      { kind: "heading", text: "What the build loop is" },
      { kind: "text", text: "The build loop is a small, repeating cycle: one task at a time, planned before any code is written, then executed, checked, and committed, before you clear the slate and start the next one. It looks almost too simple on paper, but that simplicity is the point. Here is the loop in practice." },
      { kind: "diagram", steps: ["Plan", "Execute", "Verify", "Commit", "New chat"] },
      { kind: "video", title: "Claude Code build loop and Plan Mode walkthrough", youtubeId: "rvioyKxJh6I" },
      { kind: "text", text: "Notice the part that matters most: the plan comes before any code. You approve the steps and the exact files it will touch, then let it execute only that slice." },
      { kind: "heading", text: "How you run it" },
      { kind: "text", text: "Now watch the same discipline applied as a working rhythm, one task in, one diff out, so you can picture what a clean session feels like." },
      { kind: "video", title: "Agentic coding workflow, one task, one diff", youtubeId: "C2lms9nZDus" },
      { kind: "text", text: "Take this from it: approving a tight plan first is the single habit that keeps each diff small enough to actually read." },
      { kind: "subheading", text: "Keep these open while you build" },
      { kind: "text", text: "These cover the methodology and the commit format the loop relies on." },
      { kind: "read", title: "EnzeD vibe coding guide, the full build loop methodology", href: "https://github.com/EnzeD/vibe-coding", blurb: "The canonical open-source playbook for the build loop, start to finish." },
      { kind: "read", title: "Conventional Commits", href: "https://conventionalcommits.org", blurb: "The commit message format that keeps your history readable as you go." },
      { kind: "heading", text: "Where people go wrong" },
      { kind: "text", text: "Here's why we keep loops small: big prompts produce big diffs, and big diffs get rubber-stamped instead of reviewed. A small change rolls back cleanly when it breaks and still makes sense a month later. Read these to see the loop on real projects, with actual timings, and to spot the traps before you fall into them." },
      { kind: "read", title: "Real Vibe Coding Examples (With Actual Time Data)", slug: "vibecoding-real-examples-with-time-data", blurb: "Seven real prompts from three shipped apps, with the exact time each took." },
      { kind: "read", title: "The 7 Most Common Vibe Coding Mistakes", slug: "vibe-coding-mistakes", blurb: "The failure patterns that bite every vibe coder, and how to avoid them." },
      { kind: "text", text: "And when you're deciding which model to run a given step with, this matrix saves a lot of trial and error." },
      { kind: "read", title: "Which LLM for Which Step: A Model Strategy Matrix for Vibe Coders", slug: "which-llm-for-which-step", blurb: "A model-by-step matrix so you stop guessing which AI to use where." },
      { kind: "heading", text: "Good prompt vs bad prompt" },
      { kind: "text", text: "A good prompt does three things a vague one doesn't: it names the single task, it names the exact files to touch, and it asks the agent to lay out a plan before it writes any code. The difference between the two prompts below is the difference between a diff you can read and a mess you have to untangle." },
      { kind: "example", filename: "Prompt", tone: "bad", content: `add the run logging stuff and make it work` },
      { kind: "example", filename: "Prompt", tone: "good", content: `Task: add the POST handler that logs one run for today in RunStreak.
Touch only src/app/api/runs/route.ts. Do not change the UI or the schema.

Before writing any code, list:
1. the steps you'll take, in order,
2. every file you'll touch.

Then wait for my approval, and deliver it as one diff.` },
      { kind: "heading", text: "Small diff vs big diff" },
      { kind: "text", text: "Small diffs get read line by line. Big diffs get scrolled past and rubber-stamped, because nobody actually reviews 600 lines across 14 files, they just click approve and hope. The smaller the change, the more real the review, and the cleaner the rollback when it breaks." },
      { kind: "example", tone: "bad", content: `Touched 14 files: auth, the runs schema, the streak UI,
the deploy config, three components you didn't ask about,
and a "small refactor" of the date helpers.
Nobody can review this. It gets approved on faith.` },
      { kind: "example", tone: "good", content: `1 file changed, +28 lines:
src/app/api/runs/route.ts, the log-run POST handler.
You can read every line in under a minute and know exactly what shipped.` },
      { kind: "heading", text: "A real session, start to finish" },
      { kind: "text", text: "Here is one full RunStreak loop, concretely. The one task: add the POST handler that logs today's run and returns the updated streak. Nothing else, no UI, no schema changes." },
      { kind: "text", text: "You open a fresh chat, paste the precise prompt above, and the agent comes back with a plan instead of code. You read it, and only when it matches what you expected do you approve it." },
      { kind: "example", filename: "Plan from the agent", content: `Plan for: log-run POST handler
1. Read src/app/api/runs/route.ts and the runs table shape.
2. Add a POST that inserts one row for today's date, ignoring duplicates.
3. Recompute the streak from consecutive run_date values.
4. Return { streak } as JSON.

Files I'll touch:
- src/app/api/runs/route.ts (only)` },
      { kind: "text", text: "You approve, it executes only that slice, and you verify it yourself: run the dev server, log a run, confirm the response says streak = 1, then log a second day and confirm it says streak = 2. Once it's green, you commit a single focused diff, git commit -m 'feat: add log-run POST handler', and then you start a brand new chat for the next task so the context stays clean." },
      { kind: "heading", text: "Common build mistakes" },
      { kind: "text", text: "Five traps catch almost everyone at this stage, and each has a one-line fix. Letting the agent plan and run autonomously, make it list the steps and files first, then approve. Giant prompts, cut the task down until it touches at most three files. Not starting a fresh chat per task, open a new one so a noisy context doesn't degrade the output. Accepting code without reading it, review every changed line before you commit, you are the one steering. Not committing between tasks, commit each clean slice so you always have a rollback point." },    ],
    tasks: [
      {
        heading: "Core habits",
        tier: "habit",
        description: "Plan first, always. The AI builds what it understands, you define what that is.",
        items: [
          {
            text: "Go slow at the start, because the first week sets the patterns every future session inherits.",
            why: "The foundation compounds, slow at the start is fast overall.",
            detail: "Rushing naming, file structure, and component shape produces a codebase that's hard to reason about by week three.",
          },
          {
            text: "Build vertical slices, one complete feature at a time, UI plus API plus test together.",
            why: "Disconnected layers accumulate mismatched assumptions that cost more to reconcile later.",
            detail: "The classic failure is 'I built the whole UI, now I need to wire it to the API', by then the data shapes and auth don't align. One slice at a time prevents it.",
          },
          {
            text: "Break your PRD into 20 to 30 atomic tasks in `TASK.md`, splitting anything over 3 files.",
            why: "'Add /login route with email sign-in and a session callback' is atomic, 'add auth' is not.",
          },
          {
            text: "Use Plan Mode before every task and approve the plan before any code.",
            why: "Never let the AI make architectural decisions unsupervised.",
            detail: "Claude Code: press `shift+tab` before executing. Cursor: start with 'DO NOT code yet, just plan.'",
          },
          {
            text: "Give the AI one task per session, review every changed line, commit, then start a fresh chat.",
            why: "A fresh context window produces better output than a long, noisy one.",
            links: [{ label: "Conventional Commits", href: "https://conventionalcommits.org" }],
          },
        ],
      },
      {
        heading: "Advanced habits",
        tier: "habit",
        items: [
          {
            text: "Add `ultrathink` before complex tasks, `think` for simple, `think hard` for moderate.",
            why: "These escalating reasoning triggers produce significantly better plans on hard problems.",
          },
          {
            text: "Monitor your context window, keep it above 50 to 60% and use `/compact`, not `/clear`.",
            why: "Clearing loses your session state, compacting compresses the history instead.",
          },
          {
            text: "Pause before irreversible actions and ask 'what are the risks, what can't be undone?'",
            why: "A deletion, major refactor, or deploy is far cheaper to second-guess than to reverse.",
          },
          {
            text: "Add a quality suffix when it matters: 'Think as long as needed. Follow precisely what I asked and execute it perfectly. Ask me questions if I am not precise enough.'",
            why: "It tells the agent to slow down and clarify instead of guessing on important work.",
          },
        ],
      },
      {
        heading: "Troubleshooting prompts",
        tier: "troubleshoot",
        items: [
          {
            text: "AI ignoring docs: 'Read AGENTS.md, PRD, and TechDesign. Summarize key requirements before coding.'",
          },
          {
            text: "AI overcomplicating: 'Prioritize MVP scope. Give me the simplest working implementation.'",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "build-ship",
  },
  {
    step: "06",
    title: "Quality",
    emoji: "🛡️",
    timeEstimate: "45-60 min",
    whatThis: "Run a structured check before any code reaches production. You are the only gate. The AI that wrote the code is primed to defend it.",
    why: "AI code passes surface checks and misses subtle ones. Secrets leak. Spec drift accumulates quietly. Vibe-coded codebases have systematic blind spots.",
    tldr: {
      accomplish: "You'll be able to run a repeatable quality pass on your own code: catch leaked secrets, prove the main flow works, and confirm it matches your spec.",
      deliverable: "A passing quality gate",
      feedsInto: "Ship can push code that is safe to put in front of strangers.",
      prerequisites: ["Recipe 05 done (a built feature)"],
      checklist: [
        "Check every changed file against the PRD",
        "Scan for exposed secrets and confirm .env is ignored",
        "Run the type check and dependency audit",
        "Record one E2E test of the primary flow",
        "Send the diff to a second AI for fresh eyes",
      ],
    },
    stuck: {
      mistakes: [
        "Asking the AI that wrote the code to review it: it is primed to defend it, you are the gate.",
        "Assuming a deleted secret is safe: it lives on in Git history, keep keys out in the first place.",
        "Trusting surface checks only: AI code passes the obvious ones and misses the subtle, checkable ones.",
        "Letting unspecced code through: if it wasn't in the PRD, it doesn't ship until you approve it.",
      ],
      success: "No secrets in the repo, zero type errors, the primary flow passes E2E, and the diff matches your spec.",
    },
    moveOnWhen: "the secret scan is clean and one end-to-end test of your main flow passes.",
      faqs: [
        { q: "Can the AI just review its own code?", a: "No, the model that wrote it is primed to defend it. You are the gate, and a second AI with a fresh context catches what the author can't." },
        { q: "I deleted the leaked key, am I safe now?", a: "No, it still lives in your Git history even after deletion. Check with git log and treat the goal as keeping keys out in the first place." },
        { q: "Do I need full test coverage to move on?", a: "No. Perfect coverage isn't the bar, no leaked keys, zero type errors, and one passing E2E test of your main flow is." },
      ],
    learn: [
      { kind: "text", text: "You've built something that works on your machine. Before it goes anywhere near real users, it needs a structured check, and you are the one who has to run it. This isn't busywork, it's the difference between shipping confidently and shipping a leaked key." },
      { kind: "case", label: "RunStreak", input: "A working log-a-run feature", process: "Scan for secrets, run an E2E test, review the diff", output: "Secret scan clean, one Playwright test of the log-run flow green" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll be able to run a repeatable quality pass over your own code: catch leaked secrets, confirm the main flow really works, and verify the code matches your spec. You learn to be the gate, because the AI that wrote the code is primed to defend it." },
      { kind: "heading", text: "What you're checking for" },
      { kind: "text", text: "AI-written code has a particular shape of failure. It passes the obvious surface checks and quietly misses the subtle ones, so the risks are predictable, which means they're checkable. The most expensive of all is a leaked secret, an API key committed to your repo can rack up bills overnight, so we start there." },
      { kind: "video", title: "How to keep API keys and secrets out of GitHub", youtubeId: "27irj9GkRRI" },
      { kind: "text", text: "The takeaway: a secret in your Git history is still exposed even after you delete it, so the goal is to keep it out in the first place." },
      { kind: "heading", text: "How you run the checks" },
      { kind: "text", text: "Beyond secrets, you need to prove the primary flow works from end to end, the way a real user would walk through it, not just in isolated unit tests. Watch this to learn how to record that kind of test by clicking through your own app." },
      { kind: "diagram", steps: ["Scan for secrets", "Run the E2E test", "Review the diff", "Then ship"] },
      { kind: "video", title: "Playwright E2E testing crash course", youtubeId: "emUaq9FPIcc" },
      { kind: "subheading", text: "Keep these open while you check" },
      { kind: "text", text: "These are the tools and the standard the tasks point you to. Run your code against each." },
      { kind: "read", title: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten", blurb: "The standard list of web security risks to check your app against." },
      { kind: "read", title: "Playwright", href: "https://playwright.dev", blurb: "Record an E2E test of your primary flow with playwright codegen." },
      { kind: "read", title: "git-secrets", href: "https://github.com/awslabs/git-secrets", blurb: "Scan your repo and history for keys before they ever reach GitHub." },
      { kind: "heading", text: "Where people go wrong" },
      { kind: "text", text: "Read this to recognize the broader patterns that bite vibe-coded projects, so you're checking for the real failure modes and not just the ones that are easy to see." },
      { kind: "read", title: "The 7 Most Common Vibe Coding Mistakes", slug: "vibe-coding-mistakes", blurb: "The recurring failure patterns of AI-built code, and the fix for each." },
      { kind: "text", text: "When in doubt, hand the diff to a second AI with a fresh context window. Fresh eyes catch what the author can't." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Run these yourself. Don't ask the model that wrote the code to review it.",
        items: [
          {
            text: "Check every changed file against your PRD before it ships.",
            why: "If it wasn't specced, it doesn't ship until you explicitly approve it.",
          },
          {
            text: "Scan for exposed secrets like `sk-`, `API_KEY`, `Bearer`, `SUPABASE_`, and confirm `.env` is in `.gitignore`.",
            why: "One leaked key can rack up bills overnight, and Git history keeps it even after deletion.",
            detail: "Run `git log --all --grep='API_KEY'` to check history too.",
            links: [{ label: "git-secrets", href: "https://github.com/awslabs/git-secrets" }],
          },
          {
            text: "Run `npm audit` and treat critical and high severity as deploy blockers.",
            why: "Known vulnerabilities in your dependencies ship to users if you ignore them.",
          },
          {
            text: "Run `npx tsc --noEmit` and require zero TypeScript errors.",
            why: "Type errors are the cheapest bugs to catch, non-negotiable before shipping.",
          },
          {
            text: "Record one E2E test of your primary flow with `npx playwright codegen`.",
            why: "It proves the main flow works the way a real user walks through it, not just in isolation.",
            detail: "Click through landing, sign up, core action, success.",
            links: [{ label: "Playwright", href: "https://playwright.dev" }],
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Check no file exceeds 500 lines, and refactor into modules in a fresh session if one does.",
            why: "Oversized files are where vibe-coded projects become unmaintainable.",
          },
          {
            text: "Verify the test triangle per feature: 1 expected-use, 1 edge-case, 1 failure-case test.",
            why: "The three together catch the failure modes a single happy-path test misses.",
          },
          {
            text: "Send the diff to a second AI with a fresh context window for review.",
            why: "Fresh eyes catch what the author, human or AI, can't.",
            strongExample: "'What's wrong with this code? What security risks do you see?' on a clean chat with no prior context.",
            weakExample: "Asking the same chat that wrote the code 'does this look good?'",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "testing-quality",
  },
  {
    step: "07",
    title: "Ship",
    emoji: "🚀",
    timeEstimate: "60-90 min",
    whatThis: "Get a real URL in front of real people. Watch what they actually do.",
    why: "Localhost is fiction. Real users break assumptions you didn't know you had.",
    tldr: {
      accomplish: "You'll be able to put your app on a real URL with observability already running, so you can see exactly what the first users do.",
      deliverable: "A live URL with analytics wired",
      feedsInto: "Launch has a live, observable URL to point people at.",
      prerequisites: ["Recipe 06 done (a passing quality gate)"],
      checklist: [
        "Connect the repo so every push deploys",
        "Install analytics and turn on session recording",
        "Wire up error tracking before sharing",
        "Share the URL the moment it works",
        "Watch one full session recording first",
      ],
    },
    stuck: {
      mistakes: [
        "Sharing the link before wiring observability: set up watching first, or you learn nothing from a bounce.",
        "Opening dashboards before recordings: watch one full session, it teaches more than a thousand pageviews.",
        "Waiting for it to feel polished: rough is fine, people who try rough versions give the most honest feedback.",
        "Skipping error tracking: without it, the exceptions real users hit disappear silently.",
      ],
      success: "The app is live, deploys on every push, and a recording plays back the first stranger's full session.",
    },
    moveOnWhen: "a stranger can open your live URL and you can see their session and error data.",
      faqs: [
        { q: "Can I share the link first and add analytics later?", a: "No, set up watching before you share. Early sessions are the most revealing and you can't recover ones you didn't record." },
        { q: "Should I polish the app before showing anyone?", a: "No. Rough is fine, and people who try rough versions give the most honest feedback. Localhost is fiction until a stranger touches it." },
        { q: "Dashboard or recordings first?", a: "Watch one full session recording before you open any dashboard. One recording teaches more than a thousand pageviews." },
      ],
    learn: [
      { kind: "text", text: "Your code passed the quality gate, so now it's time to put a real URL in front of real people and watch what they actually do. Localhost is fiction. The moment a stranger touches your app, they break assumptions you never knew you were making." },
      { kind: "case", label: "RunStreak", input: "A quality-checked log-a-run feature", process: "Connect Vercel, wire PostHog and error tracking", output: "runstreak.vercel.app live with PostHog wired" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll have your app live on a real URL with observability already running, so that when the first person uses it, you can see exactly what they did and where it went wrong. The key idea: set up watching before you share, not after." },
      { kind: "heading", text: "What shipping really means" },
      { kind: "text", text: "Shipping isn't just deploying, it's deploying with eyes on. If you share a link and have no way to see what happens, you've learned nothing when someone bounces. So before the link goes out, you wire up three things: automatic deploys, session recordings, and error tracking. Start with the recordings and analytics, the part that shows you what people actually do." },
      { kind: "video", title: "PostHog setup, session recordings and analytics", youtubeId: "OyD7rkxpLOw" },
      { kind: "text", text: "The lesson here: one session recording teaches you more than a thousand raw pageviews." },
      { kind: "heading", text: "How you get it live and watched" },
      { kind: "text", text: "Next, learn how to get the first people through the door, because a live URL with nobody on it tells you nothing." },
      { kind: "video", title: "How to get your first users as an indie hacker", youtubeId: "6reLWfFNer0" },
      { kind: "text", text: "Then wire up error tracking, so the exceptions real users hit reach you instead of disappearing silently." },
      { kind: "video", title: "Sentry setup for Next.js", youtubeId: "VhIwMuusVjE" },
      { kind: "subheading", text: "Keep these open while you wire it up" },
      { kind: "text", text: "The setup guides for the three things to get live before you share the link." },
      { kind: "read", title: "Vercel", href: "https://vercel.com", blurb: "Connect the repo so every push to main deploys automatically." },
      { kind: "read", title: "PostHog Next.js quickstart", href: "https://posthog.com/docs/libraries/next-js", blurb: "Install analytics and turn on session recording right away." },
      { kind: "read", title: "Sentry Next.js setup", href: "https://docs.sentry.io/platforms/javascript/guides/nextjs/", blurb: "Catch unhandled exceptions with full stack traces before users do." },
      { kind: "text", text: "Get all three live, then share the URL the moment it works and watch one full session recording before you change a thing." },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Set up observability before you share the URL, not after.",
        items: [
          {
            text: "Connect your repo so every push to main deploys and every PR gets a preview URL.",
            why: "Automatic deploys mean shipping a fix never becomes its own chore.",
            links: [{ label: "Vercel", href: "https://vercel.com" }],
          },
          {
            text: "Install PostHog and turn on session recording immediately.",
            why: "Early sessions are the most revealing, and you can't recover ones you didn't record.",
            links: [{ label: "PostHog Next.js quickstart", href: "https://posthog.com/docs/libraries/next-js" }],
          },
          {
            text: "Wire up Sentry error tracking before sharing the URL.",
            why: "Without it, the exceptions real users hit disappear silently.",
            links: [{ label: "Sentry Next.js setup", href: "https://docs.sentry.io/platforms/javascript/guides/nextjs/" }],
          },
          {
            text: "Watch one full session recording before changing a thing.",
            why: "One recording teaches more than a thousand pageviews on a dashboard.",
            detail: "Watch the recording first, not the dashboard.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Share the URL the moment it works, rough and all.",
            why: "People who try rough versions give the most honest feedback.",
            detail: "Post in relevant subreddits, Discord servers, and X.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "launch-growth",
  },
  {
    step: "08",
    title: "Launch",
    emoji: "📣",
    timeEstimate: "2-4h / channel",
    whatThis: "Get the first 100 real users. Reddit, Show HN, Product Hunt, Twitter, the channels that work for indie builders.",
    why: "A live URL with zero users is the same as no URL. Distribution is the #1 reason indie products fail, more than product quality, more than capital.",
    tldr: {
      accomplish: "You'll be able to take your product to the communities your users already live in and land your first 100 real people without getting removed as spam.",
      deliverable: "Launch posts live across your channels",
      feedsInto: "Iterate has real users generating the behavior data you will act on.",
      prerequisites: ["Recipe 07 done (a live URL)"],
      checklist: [
        "Pick the channels where your users already hang out",
        "Frame each post to its community's rules",
        "DM your first users individually for feedback",
        "Track every channel separately with UTMs",
        "Kill what isn't working and double down on what is",
      ],
    },
    stuck: {
      mistakes: [
        "Spreading thin across five channels at once: most launches succeed on one, commit to it first.",
        "Posting cold with 'Check out my app': frame it as 'I built X to solve Y' and earn attention.",
        "Launching on Product Hunt without a hype list: skip it until you have 50+ committed upvoters.",
        "Sharing links with no UTMs: without them you can't tell which channel actually worked.",
      ],
      success: "Real users are arriving through a channel you chose deliberately, and you can see which one is working.",
    },
    moveOnWhen: "your post is live on one channel, tracked, and you can explain in a sentence who it is aimed at.",
      faqs: [
        { q: "Shouldn't I post everywhere at once to maximize reach?", a: "No, most launches succeed on one channel, not five. Commit to the place your users already hang out and work it hard before adding more." },
        { q: "Should I launch on Product Hunt right away?", a: "Only with 50+ people pre-committed to upvote in hour one. Without a hype list you stall at 8 upvotes, which hurts more than it helps." },
        { q: "Why add UTMs if I'm only posting to one channel?", a: "So you can measure it separately and know it actually worked. Without UTMs you can't tell which channel brought the users." },
      ],
    learn: [
      { kind: "text", text: "Your app is live and you can see what users do. Now you need users to see. This step is about the first 100 real people, and it's worth saying plainly: distribution, not product quality, is the number one reason indie products fail. A live URL with zero users is the same as no URL." },
      { kind: "case", label: "RunStreak", input: "runstreak.vercel.app live with analytics", process: "Frame the post for each community, share it", output: "Posted to r/running + Show HN; first 40 visitors" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll know how to take your product to where your users already are, across Reddit, Show HN, Product Hunt, and Twitter, and work those channels in a way that lands as welcome rather than spam." },
      { kind: "heading", text: "What launching actually is" },
      { kind: "text", text: "Launching isn't one big announcement, it's showing up in the communities your users already belong to and earning their attention. Each channel has its own culture and its own rules, and breaking them gets you removed instead of seen. Start with how experienced builders land that first batch." },
      { kind: "video", title: "How to get your first 100 users as an indie hacker", youtubeId: "Da7z-RcS6dM" },
      { kind: "text", text: "Take this from it: you go to the user, the user does not come to you." },
      { kind: "subheading", text: "Keep these open while you launch" },
      { kind: "text", text: "Keep each channel's own rules open so your posts land as allowed, not removed." },
      { kind: "read", title: "Show HN submission rules", href: "https://news.ycombinator.com/showhn.html", blurb: "How to title and time a Show HN so it stays on the front page." },
      { kind: "read", title: "Product Hunt launch checklist", href: "https://www.producthunt.com/launch", blurb: "What a Product Hunt launch needs, only worth it with a hype list." },
      { kind: "read", title: "Indie Hackers Discord", href: "https://discord.com/invite/indiehackers", blurb: "A community to lurk, contribute, and mention your product when relevant." },
      { kind: "heading", text: "Where people go wrong" },
      { kind: "text", text: "The mistake is spreading thin across five channels at once. Most launches succeed on one channel, not five. Read these to pick the right one and work it the right way." },
      { kind: "read", title: "How to launch on Reddit without getting banned", href: "https://www.indiehackers.com/post/how-to-launch-on-reddit-without-getting-banned", blurb: "How to post on Reddit so it lands as helpful, not spam." },
      { kind: "read", title: "Where to launch your indie product, full channel list", href: "https://www.indiehackers.com/post/the-best-places-to-launch-your-product-in-2024", blurb: "A full rundown of launch channels and what each is good for." },
      { kind: "text", text: "Kill the channel that isn't working after a week and double down on the one that is." },
      { kind: "heading", text: "Copy-paste launch posts" },
      { kind: "text", text: "Here are ready-to-use RunStreak posts for each channel. Adapt every one to your own product and voice, lead with the problem you solve and be honest about what's rough, and never spam, the same copy pasted everywhere reads as spam and gets removed." },
      { kind: "example", filename: "Reddit (r/running)", tone: "good", content: `I kept breaking my run streak because every app buried it under GPS and a social feed

So I built RunStreak: one tap to log today's run, one number on screen, your current streak. No GPS, no feed, no setup.

It's free and rough around the edges. If you run daily, I'd love to know whether the one-tap thing actually helps or if I'm missing something obvious.

runstreak.vercel.app` },
      { kind: "example", filename: "Show HN", tone: "good", content: `Show HN: RunStreak, a dead-simple run-streak tracker (one tap, one number)

I wanted to keep a daily run habit but every app made streaks a side effect of GPS tracking. RunStreak does one thing: log today's run, see your streak. The streak is computed from consecutive days, never stored, which kept the data model down to a single table.

It's a tiny Next.js + Supabase app. Happy to go into the streak logic or anything else in the comments.

runstreak.vercel.app` },
      { kind: "example", filename: "Product Hunt", tone: "good", content: `RunStreak, keep your run streak alive in one tap

Most running apps bury your streak under maps and feeds. RunStreak is the opposite: open it, tap once to log today's run, and see the only number that matters, your current streak.

No GPS, no social feed, no setup. Free to use. I built it to fix my own broken streak and would love your honest feedback.` },
      { kind: "example", filename: "X / Twitter", tone: "good", content: `I broke my run streak one too many times, so I built the app I wanted.

RunStreak: one tap to log a run, one number for your streak. No GPS, no feed.

Built with Next.js + Supabase. Free, and a bit rough. Would love feedback 👇
runstreak.vercel.app
#buildinpublic #indiedev` },
      { kind: "example", filename: "Indie Hackers", tone: "good", content: `Shipped RunStreak this week, a one-tap run-streak tracker

The wedge: every running app treats your streak as a side effect of GPS tracking. I made the streak the whole product. One tap logs today's run, one number shows the streak, nothing else.

Stack is Next.js + Supabase, one runs table, streak computed not stored. First users are coming from r/running. Happy to share what's working and what isn't.

runstreak.vercel.app` },
      { kind: "heading", text: "What not to post" },
      { kind: "example", filename: "Reddit (r/running)", tone: "bad", content: `Check out my new app RunStreak!! runstreak.vercel.app

Please try it and let me know what you think 🙏` },
      { kind: "example", filename: "X / Twitter", tone: "bad", content: `🚀 RunStreak is LIVE on Product Hunt!! 🚀

Please go upvote, every vote counts, we're so close to #1!! Drop a comment and I'll upvote you back 🔥🔥` },
      { kind: "example", filename: "Show HN", tone: "bad", content: `Show HN: My new app launched

runstreak.vercel.app, would appreciate any signups and upvotes!` },    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Pick one channel, prep one post, then work it hard before adding more.",
        items: [
          {
            text: "Pick one channel first, the place your users already hang out, and commit to it.",
            why: "Most launches succeed on one channel, not five, so spreading thin loses before you start.",
            strongExample: "'r/running, because the complaints I found in research came from there and it allows honest self-posts.'",
            weakExample: "'I'll post everywhere at once and see what sticks.'",
          },
          {
            text: "Prepare one post for that channel, framed as 'I built X to solve Y'.",
            why: "Earning attention with the problem beats a cold 'check out my app' that reads as spam.",
            strongExample: "'I kept breaking my run streak because every app buried it under GPS and a feed, so I built a one-tap tracker. Free and rough, would love to know if it helps.'",
            weakExample: "'Check out my new app!! Please try it 🙏'",
            detail: "Reddit r/SideProject and r/IndieDev are forgiving, r/programming is brutal, niche subs work for niche products. Build karma first with a few useful comments.",
            links: [
              { label: "r/SideProject", href: "https://www.reddit.com/r/SideProject/" },
              { label: "r/IndieDev", href: "https://www.reddit.com/r/IndieDev/" },
              { label: "r/IndieHackers", href: "https://www.reddit.com/r/indiehackers/" },
            ],
          },
          {
            text: "Reply to every comment in the first few hours, one genuine reply each.",
            why: "Early engagement keeps you visible and turns a post into a conversation.",
            strongExample: "'Good point, the streak resets at midnight your local time, I'll make that clearer in the UI, thanks.'",
            weakExample: "'Thanks!' copy-pasted under every comment, or going quiet after posting.",
            detail: "On Show HN, post Tue to Thu, 8 to 10 AM Eastern, with a title that says what you built and what's interesting.",
            links: [{ label: "Show HN submission rules", href: "https://news.ycombinator.com/showhn.html" }],
          },
          {
            text: "Add UTM tracking to every link so each channel is measured separately.",
            why: "Without UTMs you can't tell which channel actually worked.",
            detail: "?utm_source=reddit&utm_medium=post&utm_campaign=launch, keep it that simple.",
            links: [
              { label: "Google Campaign URL Builder", href: "https://ga-dev-tools.google/campaign-url-builder/" },
              { label: "UTM cheatsheet", href: "https://buffer.com/library/utm-guide/" },
            ],
          },
          {
            text: "Review results after 7 days, then kill what isn't working and double down on what is.",
            why: "You need one channel that brings real users, not five that each trickle.",
            links: [
              { label: "Show HN sank to page 4, fix", href: "/fixes/show-hn-sunk" },
              { label: "Product Hunt stalled at 8 upvotes, fix", href: "/fixes/ph-launch-8-upvotes" },
            ],
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Launch on Product Hunt only with 50+ people pre-committed to upvote in hour 1.",
            why: "Without a hype list you stall at 8 upvotes, which hurts more than it helps.",
            links: [{ label: "Product Hunt launch checklist", href: "https://www.producthunt.com/launch" }],
          },
          {
            text: "Find 3 Discord or Slack communities your users hang out in, lurk a week, contribute, then mention your product when relevant.",
            why: "Earning a place first means your mention lands as helpful, never as the first message.",
            links: [
              { label: "Indie Hackers Discord", href: "https://discord.com/invite/indiehackers" },
              { label: "r/SideProject Discord finder", href: "https://disboard.org/search?keyword=indie+dev" },
            ],
          },
          {
            text: "DM your first 30 users individually for feedback, using their name and what they did in your app.",
            why: "A personal ask converts at 30 to 40%, and the first 5 reviews unlock your install rate.",
            links: [
              { label: "Getting your first 10 app reviews", href: "/fixes/five-stars-three-reviews" },
            ],
          },
          {
            text: "Add channels once one works: a build-in-public thread on X and a store-listing recheck.",
            why: "Expanding after a channel proves out beats splitting attention before any does.",
            detail: "On X, show the screenshot, the metric, the ask, tag #buildinpublic #indiedev, and reply to 10 niche accounts daily. For app stores, make screenshot 1 say what the app does in 5 words.",
            links: [
              { label: "#buildinpublic on X", href: "https://x.com/search?q=%23buildinpublic&src=typed_query&f=live" },
              { label: "#indiedev on X", href: "https://x.com/search?q=%23indiedev&src=typed_query&f=live" },
              { label: "Store listing breakdown", href: "/fixes/store-impressions-no-clicks" },
            ],
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "launch-growth",
  },
  {
    step: "09",
    title: "Iterate",
    emoji: "🔁",
    timeEstimate: "ongoing",
    whatThis: "Use real behavior data to decide what to fix next. Not gut feelings. Not user requests. Behavior.",
    why: "What users say and what users do are different data. Iterating without session data is guessing with extra steps.",
    tldr: {
      accomplish: "You'll be able to read real usage data, pick the few friction points that matter, and feed them back into the build loop instead of guessing.",
      deliverable: "One shipped improvement driven by real data",
      feedsInto: "Each fix feeds the next build loop, now aimed by data instead of guesses.",
      prerequisites: ["Recipe 08 done (real users generating behavior data)"],
      checklist: [
        "Watch session recordings before any dashboard",
        "Build a funnel for your main flow",
        "Pick exactly 3 friction points to fix",
        "Update your PRD before re-entering the build loop",
        "Note the baseline metric and re-check it later",
      ],
    },
    stuck: {
      mistakes: [
        "Acting on what users say over what they do: behavior is the more honest dataset, let recordings decide.",
        "Opening dashboards before recordings: rage clicks and dead clicks show where the UX actually breaks.",
        "Picking ten things to fix: choose exactly three that appear across recordings, not one-off edge cases.",
        "Shipping a fix without a baseline: note the metric first, or you can't tell if the fix worked.",
      ],
      success: "You ship one improvement aimed by data, and the funnel metric you tracked actually moves.",
    },
    moveOnWhen: "you shipped one change driven by something you saw real users do.",
      faqs: [
        { q: "Should I fix what users ask for?", a: "Trust what they do over what they say, behavior is the more honest dataset. Someone may swear they love a feature they never click." },
        { q: "How many things should I fix at once?", a: "Exactly three, and ship them one at a time. Picking ten or batching fixes means you can't tell which change actually moved the metric." },
        { q: "Why note a baseline before shipping a fix?", a: "Without a before-number you can't tell if the fix worked. Note the metric first, then re-check it in a couple of days." },
      ],
    learn: [
      { kind: "text", text: "People are using your app, which means you finally have the most valuable thing in this whole process: real behavior. This last step is a loop you'll run forever, and the discipline is to let what people actually do, not what they say, decide what you fix next." },
      { kind: "case", label: "RunStreak", input: "Session recordings", process: "Users bounce on signup", output: "Shipped guest mode, signup moved later" },
      { kind: "heading", text: "The aim of this lesson" },
      { kind: "text", text: "By the end of this step you'll be able to look at real usage data, pick the few friction points that matter, and feed them back into the build loop. The goal is to stop guessing and start fixing what the data actually shows." },
      { kind: "heading", text: "What iterating on data means" },
      { kind: "text", text: "What users say and what users do are two different datasets, and the second one is far more honest. Someone might tell you they love a feature they never click. Iterating without session data is just guessing with extra steps. So we start by learning to read recordings, where the friction shows up plainly." },
      { kind: "video", title: "How to analyze session recordings", youtubeId: "gPuMwbd1k6s" },
      { kind: "text", text: "The takeaway: rage clicks and dead clicks point you straight at where the experience breaks." },
      { kind: "heading", text: "How you turn it into action" },
      { kind: "text", text: "Recordings show you the where, and funnels turn that into numbers you can act on, like the exact step where people drop off. Watch this to learn the fundamentals." },
      { kind: "video", title: "Product analytics fundamentals, funnels and retention", youtubeId: "1BECEXF57XU" },
      { kind: "diagram", steps: ["Watch", "Find friction", "Hypothesis", "Ship a fix", "Watch again"] },
      { kind: "subheading", text: "Keep these open while you analyze" },
      { kind: "text", text: "The PostHog references the checklist sends you to, one for replays and one for funnels." },
      { kind: "read", title: "PostHog session replays", href: "https://posthog.com/docs/session-replay/how-to-use-session-replays", blurb: "Reading session replays for rage clicks and dead clicks." },
      { kind: "read", title: "PostHog funnels", href: "https://posthog.com/docs/product-analytics/funnels", blurb: "Build a funnel for your main flow, drop-off per step is the metric." },
      { kind: "text", text: "Pick exactly three friction points that show up across recordings, update your PRD, then re-enter the build loop." },
      { kind: "heading", text: "Friction analysis" },
      { kind: "text", text: "Friction analysis is how you turn raw session recordings into product decisions. The trick is to watch what people do, not listen to what they say: note where they hesitate, where they rage-click, and where they quit entirely. Those moments are your roadmap, far more honest than any feature request." },
      { kind: "example", filename: "friction-log.md", content: `# Friction log: RunStreak

## Friction 1
Observation: New users hesitate on the signup screen, then close the tab.
Evidence: 7 of 10 recordings bounce at signup before logging a single run.
Hypothesis: Asking people to create an account before they've felt any value kills them.
Fix: Add a guest mode, let them log a run first, ask to sign in only to save the streak.
Expected outcome: Signup-step drop-off falls from ~70% to under 40%.` },
      { kind: "text", text: "Run this loop weekly, and ship one fix at a time. One change, one baseline metric, one week to see if it moved, then back to the recordings for the next one. Batching fixes just means you can't tell which one worked." },      { kind: "graduation", intro: "You did the whole thing. You took RunStreak from a one-line idea all the way to a live app that strangers use, and then you watched the data and shipped a fix that made it better. That is the entire craft, and most people who say they want to build never get this far.", accomplished: ["A live app on a real URL that real people have used", "A validated idea backed by research, not hope", "A PRD, a tech design, and an AGENTS.md that keep the AI on the rails", "A clean build history of small, reviewed, committed diffs", "A quality gate you can run before anything ships", "One data-driven improvement already live, with a metric to prove it"], skills: ["Validating a problem before writing any code", "Scoping an MVP and saying no to the rest", "Directing an AI agent with context instead of vibes", "Running a tight plan, build, verify, commit loop", "Catching leaked secrets and spec drift before users do", "Reading real behavior and turning it into the next fix"], next: ["Add the next feature from your backlog with the same build loop", "Set up CI so tests and type checks run on every push", "Add a paid tier once you see what people keep coming back for", "Deepen your test coverage on the flows that matter most", "Contribute a fix or prompt you discovered back to vibeprompt"] },
    ],
    tasks: [
      {
        heading: "Must do",
        tier: "must",
        description: "Turn real behavior into one or two concrete fixes.",
        items: [
          {
            text: "Watch 5 session recordings before opening any dashboard.",
            why: "Rage clicks and dead clicks show exactly where the UX breaks, faster than any chart.",
            links: [{ label: "PostHog session replays", href: "https://posthog.com/docs/session-replay/how-to-use-session-replays" }],
          },
          {
            text: "Set up a funnel for your main user flow.",
            why: "Drop-off per step is the most actionable early metric you have.",
            links: [{ label: "PostHog funnels", href: "https://posthog.com/docs/product-analytics/funnels" }],
          },
          {
            text: "Pick exactly 3 friction points to fix, not ten.",
            why: "Fixing one thing at a time is the only way to know what actually worked.",
            detail: "Choose ones that appear in 3+ recordings, not one-off edge cases.",
          },
          {
            text: "Note the baseline metric before you ship the fix.",
            why: "Without a before-number you can't tell whether the change helped.",
            detail: "Re-check in 48 to 72 hours. If it didn't move, your root-cause theory was wrong.",
          },
        ],
      },
      {
        heading: "Power up",
        tier: "power",
        items: [
          {
            text: "Update your PRD before re-entering the build loop.",
            why: "Keeps the spec honest so the AI builds the current plan, not the v0.1 you started with.",
            detail: "Refresh the done conditions and out-of-scope before any AI session.",
          },
        ],
      },
    ],
    commonMistakes: [],
    resources: [],
    output: [],
    browseSlug: "ops-maintenance",
  },
];
