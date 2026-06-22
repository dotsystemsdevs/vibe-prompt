// A paste-ready prompt for each fix, keyed by problem id. The fix tells you
// what to do; the prompt is the thing you actually paste into your AI (a coding
// agent for Build/Ship, a thinking-partner for Grow/Earn/Stay) to do it.
// Keep one entry per LIST_PROBLEMS id. No em dashes (house style).

export const FIX_PROMPTS: Record<string, string> = {
  // ── Build ─────────────────────────────────────────────────────────────────
  "ai-code-security-holes":
    "Do a security pass on this change before I merge. Check for hardcoded secrets or API keys, missing env-var validation, unsafe handling of user input, and dependencies with known vulnerabilities. List each issue with file and line, rate it by severity, and show the minimal fix. Change nothing else.",
  "last-20-percent":
    "We're at the last 20% of [feature]. List every remaining edge case, error state, empty state, loading state, and integration seam that production needs but a happy-path demo skips. For each, say what breaks if it's missing and give the fix. Be exhaustive and assume nothing is handled yet.",
  "code-duplication-pile":
    "Before writing any new code for [feature], search the codebase for existing helpers, utilities, or components that already do part of this and list them with file paths. Then implement [feature] by reusing them. When you're done, tell me if you duplicated any logic and show the closest existing helper.",
  "dont-know-codebase":
    "Generate an ARCHITECTURE.md for this repo. Cover what each top-level folder does, where application state lives, the server vs client boundary, the data flow for the main feature, and any non-obvious conventions. Be concrete with file paths and mark anything you're unsure about so I can verify it.",
  "ai-confidently-wrong":
    "Before I accept this code, answer two things. One: how would you verify it actually works, what specific inputs or test cases would prove it? Two: what happens if [the key input] is empty, null, very large, or malformed? Walk each case and fix any that break.",
  "tests-pass-feature-broken":
    "Write one end-to-end smoke test for [feature] that exercises it the way a real user would, from entry point to outcome, not against the implementation details. Avoid tautological tests that just assert the current code. If a real-user path can't be tested as-is, tell me what's untestable and why.",
  "type-errors-cascade":
    "I changed [type] and it cascaded into type errors across many files. Don't use any or @ts-ignore. Walk the errors from the root type outward: fix the source type first, then each dependent error in order. If the change turns out too big to do safely, stop and tell me where to split it.",
  "every-prompt-new-state":
    "Constraint for this whole session: don't add new state, new dependencies, new files, or new abstractions unless I explicitly ask. Implement exactly what I request and nothing more. If you think something extra is needed, propose it first and wait for my yes.",
  "deprecated-apis":
    "I'm using [library] version [X]. Before writing any code, tell me the current, non-deprecated API for [task] in that version. If you're not confident your training is current, say so and ask me to paste the relevant docs. Don't use any API that's deprecated or removed in [X].",
  "give-up-refactor":
    "Don't refactor. I have a specific bug: [describe it]. Help me debug it in place: suggest log points to add, a way to reproduce it in isolation, and which recent change to bisect first. Find the root cause before proposing any code change, and keep the fix as small as possible.",

  // ── Ship ──────────────────────────────────────────────────────────────────
  "play-closed-testing-12":
    "Act as my launch coordinator for Google Play closed testing. I need 12+ real testers for 14 days. Draft a short recruiting post for r/AndroidApps and IndieHackers, a DM I can send to my email list, and a simple schedule that staggers sign-ups so testers don't all churn at once. App: [describe it].",
  "app-review-rejected-vague":
    "Apple rejected my app with this vague reason: [paste rejection]. Draft a polite Resolution Center reply that asks for the specific guideline number and the exact screen they're flagging, and asks what change would resolve it. Keep it short and direct so a reviewer will actually answer.",
  "testflight-90-days":
    "Help me set up a TestFlight build-refresh schedule so I never hit the 90-day external-tester wall. My current build went live on [date]. Give me the dates to upload a fresh build, remind me internal testers don't count, and turn it into a simple recurring reminder I can follow.",
  "vercel-prod-breaks":
    "My app works locally but breaks on Vercel: [paste the error or behavior]. Walk the four usual causes in order, missing env var, Node version mismatch, Edge runtime using a Node API, and serverless filesystem writes. For each, tell me exactly what to check in my project and the Vercel logs, plus the fix.",
  "build-size-doubled":
    "My Next.js bundle size jumped with no obvious cause. Show me how to read the route-level kB breakdown from next build and run the bundle analyzer, then help me find the culprit: a heavy lib imported in a layout, a non-tree-shaken icon set, or a server-only module pulled into a client component. Point at the import to change.",
  "env-vars-broken":
    "My env vars work locally but not in production on Vercel. Check the three usual gotchas against my code: a missing NEXT_PUBLIC_ prefix for client-side vars, the var not set in both Preview and Production scopes, and stale runtime reads needing a clean redeploy. Tell me which apply and the exact fix.",
  "ci-fails-new-rule":
    "CI is failing on a lint rule that wasn't there yesterday: [paste the rule and error]. Don't disable it globally. Explain what the rule catches, then fix each violation in my code. Only if the rule is genuinely wrong for this code, disable it per-line with a comment explaining why.",
  "migration-skipped-prod":
    "My database migration ran locally but never applied in production. I'm using [Prisma/Drizzle] on [Vercel/...]. Show me how to wire migrations into the deploy step, for example prisma migrate deploy in the build command, and how to test it once against a staging database before I rely on it.",
  "ssl-custom-domain":
    "SSL is broken after I attached a custom domain on [Vercel/Netlify]: [paste the error]. Walk me through the checks in order: DNS propagation wait, verifying the CNAME or A record matches the host's exact target, removing and re-adding the domain, and ruling out a Cloudflare proxy serving its own cert.",
  "cold-start-slow":
    "My first request is slow because of a cold start. Stack: [Vercel functions / Supabase Postgres]. Help me move heavy initialization to module scope so it caches across warm invocations, add a connection pooler for the database, and trim function size. Show me the specific code to move.",

  // ── Grow ──────────────────────────────────────────────────────────────────
  "60-visitors-zero-conv":
    "I have about 60 visitors a month and 0 conversions for [product]. Don't optimize conversion yet, the sample is too small. Build me a concrete 30-day plan to reach 500+ monthly visitors through 2-3 channels that fit [my audience], with specific actions per week, not generic advice.",
  "rank-brand-only":
    "I only rank for my brand name. Act as my SEO strategist for [product] and [audience]. Find 3 long-tail keywords my audience actually searches, then outline one 1500+ word article per keyword with sections and real-example ideas. Give me titles I can publish.",
  "reddit-removed-post":
    "I want to share [product] on Reddit without getting removed as self-promotion. Suggest 2-3 subreddits that fit, the karma-building comments I should make first, and an 'I built X to solve Y' style post (not 'check out my app') tailored to each sub's culture.",
  "ph-launch-8-upvotes":
    "Help me decide and prepare a Product Hunt launch for [product]. First gut-check whether I have the 50+ pre-committed voters PH now needs; if not, recommend Show HN, r/SideProject, or build-in-public instead. If yes, give me a first-4-hours outreach plan and an asset checklist.",
  "show-hn-sunk":
    "Write a Show HN submission for [product]. Give me 3 title options that lead with what I built and what's interesting about it, not my name or the word launched, plus the best day and time to post and a plan to reply to every comment in the first 6 hours.",
  "store-impressions-no-clicks":
    "My App Store listing gets impressions but only about a 3% tap-through, below the 5-7% average, so my icon or subtitle isn't selling the click. Suggest one strong-visual icon concept, a 5-word subtitle that says what [app] does, and a hook overlay for screenshot 1. Pick one change to test for 2 weeks.",
  "keywords-full-flat":
    "My ASO keywords are set but installs are flat because the listing converts poorly. Rewrite screenshots 1 and 2 to carry the conversion: a clear value-prop overlay for [app] and a supporting benefit. Give me the overlay copy and layout so I can ship it and A/B against the current listing.",
  "five-stars-three-reviews":
    "I have great ratings but only 3 reviews, so nobody trusts it yet. Write a short, personal review-request message I can DM to my first 30 users individually, using their name and referencing their use, plus a one-line in-app prompt to ask at the right moment.",
  "twitter-12-impressions":
    "My tweets get about 12 impressions. Build me a 30-day build-in-public plan for [product]: 10 niche accounts to genuinely reply to each day, the kind of useful reply that earns reach instead of clout quote-tweets, and a simple cadence for my own posts. Goal: 10-20x my impressions through consistency.",
  "screenshot-1-unclear":
    "Rewrite my App Store screenshot 1 so a user who reads only that one screen can say what [app] does in a sentence. Make the value-prop text the hero, like a big overlay reading 'Track your training, no spreadsheet needed', with a smaller phone mockup behind it. Give me 3 overlay headline options.",
  "instagram-no-installs":
    "Instagram grows my followers but not installs for [app]. Help me decide honestly: keep it as a brand channel, or redirect that time to Reddit, Show HN, or App Store SEO for actual installs? Give me a clear call and a reallocation plan for the next month.",

  // ── Earn ──────────────────────────────────────────────────────────────────
  "priced-too-low":
    "I price [product] at $[X] and it reads as a hobby project. Act as a pricing advisor: recommend a price that signals a real product for my category ([B2B/consumer]), explain the reasoning, and give me a test plan, new signups at the higher price with existing customers grandfathered, plus the metric that tells me it worked.",
  "free-tier-converts-zero":
    "My freemium tier converts to paid at about 0.3%. Help me switch to a 7-14 day full-feature trial for [product]. Design the trial: length, what's gated, the upgrade moments, and the emails during the trial. Explain the expected conversion lift versus freemium so I can sanity-check it.",
  "iap-30-percent":
    "Apple takes 30% via IAP on [app]. Lay out my three legal options, staying in IAP, the 15% subscription rate after year one, and linking out to web signup to keep 100%, with the tradeoffs of each for a [subscription/one-time] app. Recommend one for my case and the steps to set it up.",
  "annual-price-arbitrary":
    "My monthly price for [product] is $[X] and my annual price feels arbitrary. Recommend an annual price, the common 10x-monthly (about 16% off) pattern unless you'd argue otherwise, explain why, and tell me what to watch over 90 days to know if it should change.",
  "discounts-attract-churners":
    "Discount codes bring me users who churn. Help me design a discount policy for [product] that rewards commitment instead of attracting coupon hunters: restrict it to monthly-to-annual upgrades and genuine verticals like students or nonprofits, and avoid generic percent-off. Give me the exact rules and codes.",
  "refunds-week-one":
    "I'm getting refund requests in week 1 for [product]. The cause is usually onboarding not showing value in 60 seconds, or a confusing pricing tier. Give me a plan to review the first 5 refund session recordings, the specific signals to look for, and how to fix the one screen most likely causing them.",

  // ── Stay ──────────────────────────────────────────────────────────────────
  "shipped-three-feel-behind":
    "I shipped 3 things this month but feel behind because of Twitter. Be my reality-check coach: remind me of the real base rates, most indies ship nothing in 6 months, help me list which accounts to unfollow because they make me feel worse, and reframe my comparison to my past self. Keep it honest, not hollow.",
  "twitter-makes-anxious":
    "Twitter makes every other founder look like a winner and it's stressing me out. Explain the selection and engagement bias driving that feed, what the median indie outcome actually is, and help me set a concrete daily limit plus what to do with the reclaimed time. Talk me down with facts.",
  "started-next-before-finishing":
    "I want to start a new project before finishing [current project]. Interrogate me: is the new one actually different, or am I escaping a hard moment? Will I be embarrassed in 6 months if neither ships? Then help me force-finish a small version of the current project before I'm allowed to start the next.",
  "side-project-100-per-month":
    "My side project makes $100/mo but eats every evening, about $1.25 an hour. Help me make the call: is there a clear path to $1k/mo within 90 days, or real skill-learning, that justifies the hours? If not, plan a clean sunset. Walk the math with me and recommend commit or sunset.",
  "rebuilt-same-saas":
    "I've rebuilt the same SaaS in 3 stacks instead of launching. Call out the real problem, fear of launching, not tech. Then give me a no-migration plan: ship the current build to production as-is, get 10 paying users, and only revisit the stack after that. Give me the smallest concrete next step.",
  "dopamine-build-not-sell":
    "Building feels good, selling doesn't, and it's stalling me before product-market fit. Help me schedule the unloved work: a daily 1-hour selling block before I'm allowed to open the editor. Define what selling concretely means for [product] each day, outreach, posts, calls, so I can't dodge it. Build me the routine.",
  "metrics-anxious":
    "Checking metrics gives me anxiety. Help me set a metrics routine: one weekly 30-minute review, say Friday, and rules for staying out of the dashboard otherwise. Tell me which 3-5 metrics actually matter before product-market fit for [product] so the weekly check is signal, not stress.",
  "havent-talked-to-user":
    "I haven't talked to a user in 6 weeks. Push me to do one user conversation this week. Help me pick the friendliest user, draft a 10-minute Discord or DM script built around one question, 'what were you doing right before you opened [app] today?', and tell me what to listen for that I didn't anticipate.",
  "mvp-not-mvp":
    "What I'm calling an MVP for [product] might actually be a v1. Apply Eric Ries's definition, the smallest thing that lets me learn whether my hypothesis is true. Ask me what hypothesis I'm testing, then tell me honestly whether I'm validating or just polishing, and what the real MVP to ship this week is.",
};
