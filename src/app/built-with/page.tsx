import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";

export const metadata: Metadata = {
  title: "Built with vibeprompt — real apps shipped using the 10-step workflow",
  description:
    "Six indie apps shipped using vibeprompt's workflow + prompts. iOS, Android, and web. Live URLs, what stack, what we learned, what broke. Not aspirational — actually shipped.",
  alternates: { canonical: "/built-with" },
  keywords: "built with vibeprompt, vibe coding case study, indie app showcase, ai coded app examples, claude code shipped apps",
  openGraph: {
    title: "Built with vibeprompt — real apps, real URLs",
    description: "Six indie apps shipped end-to-end using vibeprompt's 10-step workflow.",
    url: "https://vibeprompt.tech/built-with",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

type Surface = "Web" | "iOS" | "Android";

type Project = {
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
};

const SURFACE_LABEL: Record<Surface, string> = {
  Web: "🌐 Web",
  iOS: "🍎 iOS",
  Android: "🤖 Android",
};

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

const PROJECTS: Project[] = [
  {
    name: "Excuse Caddie",
    iconDomain: "excusecaddie.xyz",
    oneLine: "Random excuse generator for golf — three platforms, one weekend's worth of prompts each.",
    url: "https://excusecaddie.xyz",
    surfaces: ["Web", "iOS", "Android"],
    stack: "Next.js + Vercel · SwiftUI · Jetpack Compose",
    status: "iOS live in App Store · Android in Play Store review · Web at excusecaddie.xyz",
    whatWorked: "PRD-first kept the three platforms in sync. Same content model, three thin clients on top.",
    whatBroke: "Closed testing on Google Play needs 12 testers for 14 consecutive days. Step 07 fix article got written *because* this broke.",
    workflowSteps: "Used every step except 00. Step 02 PRD was the biggest single time-saver — wrote it once, the three clients fell out.",
  },
  {
    name: "Commitment Issues",
    iconDomain: "commitmentissues.dev",
    oneLine: "Death certificates for abandoned GitHub repos. Open source, weirdly viral on dev Twitter.",
    url: "https://commitmentissues.dev",
    surfaces: ["Web"],
    stack: "Next.js · GitHub API · Vercel KV · Stripe",
    status: "Live · 12 awesome-list submissions, 2 merged so far",
    whatWorked: "Step 08 (Launch) playbook for indie devs. Submitted to ~10 awesome-tool lists for backlinks — slow but steady traffic.",
    whatBroke: "Stripe webhook silently stopped firing after a routing rename. Step 06 audit added 'verify webhook end-to-end after every deploy' to the personal checklist.",
    workflowSteps: "Steps 01-09. Step 09 (Iterate) caught a 60-visitor-zero-conversion week that turned out to be a broken checkout button — only found via session replay.",
  },
  {
    name: "Build2Race",
    iconDomain: "build2race.com",
    oneLine: "Free triathlon training plan generator. PRD said 'free forever' which kept the build small.",
    url: "https://build2race.com",
    surfaces: ["Web"],
    stack: "Next.js · OpenAI · Vercel",
    status: "Live · indexed for 'triathlon training plan' on Google",
    whatWorked: "Tight PRD scope. 'Free forever, no signup' meant no auth, no payment, no DB. Shipped in two evenings.",
    whatBroke: "Original prompt generated 30 weeks of generic 'easy run' workouts. Step 03 (Stack) revisit added a structured-output schema and the quality jumped.",
    workflowSteps: "Stripped-down version of 02-07. Skipped Step 04 (Context) entirely — too small to need a memory-bank.",
  },
  {
    name: "Indexia",
    iconDomain: "indexia.se",
    oneLine: "AI-SEO and GEO (generative engine optimization) for Swedish businesses. Currently in customer outreach.",
    url: "https://indexia.se",
    surfaces: ["Web"],
    stack: "Next.js · Supabase · Resend",
    status: "Live · 50+ cold-outreach emails sent, conversation in progress",
    whatWorked: "Step 04 (Context) — AGENTS.md locked the Swedish-language constraints and tone. Every prompt came out in correct Swedish first try.",
    whatBroke: "Step 08 outreach: first batch of 30 emails got 1 reply. Wrote the 'cold outreach for indie devs' fix recipe after this.",
    workflowSteps: "01-09 with heavy emphasis on Step 08 (Launch). Outreach is the entire product strategy for this one.",
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
    workflowSteps: "Step 04 (Context) was critical — two AGENTS.md files (one per platform) prevented the AI from mixing SwiftUI and Compose patterns.",
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
    whatBroke: "First version had /list, /handbook, /cookbook, /templates all as separate pages — too much surface area. Step 09 (Iterate) collapsed them into articles + ⌘K.",
    workflowSteps: "Every step, multiple times. The articles, prompts, and fixes are the artifacts of the workflow being applied to itself.",
  },
];

export default function BuiltWithPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Built with\nvibeprompt."}
          description="Six indie apps shipped end-to-end using the 10-step workflow. iOS, Android, web. Live URLs, real stacks, honest what-broke notes. Not aspirational — actually shipped."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-sm leading-relaxed text-foreground/70">
              Most &ldquo;built with X&rdquo; pages are marketing. This one is a postmortem. Every project below
              shipped to a real URL or store listing using vibeprompt&rsquo;s workflow — and every one of
              them broke in some specific way that became a fix recipe on this site.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              All six were built by the same solo dev (the maintainer of this site). The workflow
              didn&rsquo;t come from a book — it came from the patterns that survived across these
              projects.
            </p>
          </div>
        </Reveal>

        {/* Project cards */}
        <div className="space-y-6">
          {PROJECTS.map((p) => (
            <Reveal key={p.name}>
              <article className="border border-foreground/12 p-6 sm:p-7">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={faviconUrl(p.iconDomain)}
                      alt=""
                      width={40}
                      height={40}
                      className="shrink-0 mt-1 h-10 w-10 rounded-md border border-foreground/15 bg-foreground/[0.04] p-1"
                    />
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground">
                        {p.name}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-foreground/65">
                        {p.surfaces.map((s) => (
                          <span key={s} className="font-medium">{SURFACE_LABEL[s]}</span>
                        ))}
                        <span className="text-foreground/25">·</span>
                        <span className="font-mono text-foreground/55">{p.stack}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[11px] text-foreground/55 transition-colors hover:text-foreground"
                  >
                    Visit →
                  </a>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-foreground/80">{p.oneLine}</p>

                <p className="mb-5 text-[11px] text-foreground/60 italic">{p.status}</p>

                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-3 text-[12px]">
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">
                      What worked
                    </dt>
                    <dd className="text-foreground/80 leading-snug">{p.whatWorked}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">
                      What broke
                    </dt>
                    <dd className="text-foreground/80 leading-snug">{p.whatBroke}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-1">
                      Which steps
                    </dt>
                    <dd className="text-foreground/65 leading-snug italic">{p.workflowSteps}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Built it too? */}
        <Reveal>
          <section className="mt-16 border-t border-foreground/12 pt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              Shipped something with vibeprompt?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Add it to the list.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/70 max-w-2xl">
              Open a PR to{" "}
              <a
                href="https://github.com/dotsystemsdevs/vibeprompt"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                the repo
              </a>{" "}
              with your project, what worked, what broke, and which workflow steps you actually used.
              No requirement that the project be successful — failed launches are useful data too.
            </p>
            <Link
              href="/workflow"
              className="mt-8 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground"
            >
              See the workflow →
            </Link>
          </section>
        </Reveal>

        <Reveal>
          <GithubCta
            title={"This site is\nopen source."}
            description="Every word, every prompt, every fix lives on GitHub. Fork it, edit it, ship your own version. MIT license, no strings."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            primaryLabel="View source"
            secondaryHref="/workflow"
            secondaryLabel="Try the workflow"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}
