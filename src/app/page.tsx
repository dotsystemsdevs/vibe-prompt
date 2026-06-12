import Link from "next/link";
import { LIST_PROBLEMS, type ListProblem } from "@/lib/list-problems";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { getSiteStats } from "@/lib/site-stats";
import { StatsRow } from "@/components/site/stats-row";
import { NewsletterCta } from "@/components/fixes/newsletter-cta";

// A punchy, recognizable spread of failures for the homepage teaser.
const EXAMPLE_IDS = [
  "last-20-percent",
  "ai-confidently-wrong",
  "dont-know-codebase",
  "tests-pass-feature-broken",
  "ai-code-security-holes",
  "code-duplication-pile",
];

export default async function HomePage() {
  const stats = await getSiteStats();
  const recipeCount = WORKFLOW_STEPS.length;

  let examples: ListProblem[] = EXAMPLE_IDS.map((id) => LIST_PROBLEMS.find((p) => p.id === id)).filter(
    (p): p is ListProblem => Boolean(p)
  );
  if (examples.length < 4) examples = LIST_PROBLEMS.slice(0, 4);
  examples = examples.slice(0, 4);

  // The three pillars — the whole product, in priority order.
  const PILLARS = [
    {
      emoji: "🚑",
      title: "Fixes",
      desc: `${stats.fixes} field-tested fixes for when AI breaks your build.`,
      href: "/fixes",
    },
    {
      emoji: "🍳",
      title: "Cookbook",
      desc: `The ${recipeCount}-step method, from idea to shipped.`,
      href: "/workflow",
    },
    {
      emoji: "🚀",
      title: "Built with",
      desc: `${stats.apps} real apps shipped with the process. The receipts.`,
      href: "/built-with",
    },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "vibeprompt",
    description: `The AI build failure database and vibe coding cookbook: ${stats.fixes} field-tested fixes, a ${recipeCount}-step workflow, ${stats.prompts} prompts, and ${stats.articles} deep-dives. Free, open source, no sign-up.`,
    url: "https://vibeprompt.tech",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    keywords:
      "AI build failures, vibe coding, AI coding fixes, Claude Code, Cursor, prompt library, AI workflow, open source",
    creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-8 sm:py-16">

        {/* Hero */}
        <div aria-hidden className="page-emoji">🍳</div>
        <p className="page-kicker">vibeprompt · the vibe coding cookbook</p>
        <h1 className="text-display mt-3">Vibe code that actually ships.</h1>
        <p className="text-body-lg mt-4 max-w-xl">
          AI got you 80% of the way, then broke your build. vibeprompt is the searchable database of{" "}
          {stats.fixes} field-tested failures and their fixes, plus a {recipeCount}-step cookbook and {stats.prompts}{" "}
          prompts. Free, open source, no sign-up.
        </p>

        {/* CTAs — one primary, one secondary */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/fixes" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            Search the fixes
          </Link>
          <Link href="/workflow" className="btn-secondary">
            Open the cookbook
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* The three pillars — the whole product, calmly */}
        <section className="mt-14 grid gap-3 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className="group block vp-card-bordered vp-card-hover vp-card-md">
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-[18px] leading-none">{p.emoji}</span>
                <p className="text-body font-semibold text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)]">
                  {p.title}
                </p>
              </div>
              <p className="text-body mt-1.5">{p.desc}</p>
            </Link>
          ))}
        </section>

        {/* AI broke your build? — a concrete taste of the Fixes */}
        <section className="mt-14">
          <h2 className="section-title">AI broke your build?</h2>
          <p className="text-body mt-2 max-w-xl">A few of the failures builders search for most:</p>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {examples.map((p) => (
              <li key={p.id}>
                <Link href={`/fixes/${p.id}`} className="group block vp-card-bordered vp-card-hover vp-card-tight h-full">
                  <span className="text-body font-medium leading-snug text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-meta mt-5">
            <Link href="/fixes" className="vp-link">
              Search all {stats.fixes} fixes →
            </Link>
          </p>
        </section>

        {/* Authority layer — stated once */}
        <section className="mt-14">
          <StatsRow stats={stats} />
          <p className="text-meta mt-4">
            Free, open source, MIT licensed. Proven on{" "}
            <Link href="/built-with" className="vp-link">
              real shipped apps
            </Link>
            .
          </p>
        </section>

        {/* Newsletter — once, at the end */}
        <section className="mt-14">
          <NewsletterCta />
        </section>
      </div>
    </>
  );
}

export const revalidate = 3600;
