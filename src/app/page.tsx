import Link from "next/link";
import { LIST_PROBLEMS, type ListProblem } from "@/lib/list-problems";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { getSiteStats } from "@/lib/site-stats";
import { WeeklyFixLink } from "@/components/fixes/weekly-fix-link";

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
  if (examples.length < 6) examples = LIST_PROBLEMS.slice(0, 6);
  examples = examples.slice(0, 6);

  // The whole product, as three paths — not cards. Learn → Fix → Proof.
  const PATHS = [
    { eyebrow: "Learn", title: "The 10-step system", desc: "Idea to shipped, nothing skipped.", href: "/workflow" },
    { eyebrow: "Fix", title: `${stats.fixes} real failures`, desc: "The exact fix for when AI breaks your build.", href: "/fixes" },
    { eyebrow: "Proof", title: `${stats.apps} shipped products`, desc: "Real apps built with the process. The receipts.", href: "/built-with" },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "vibeprompt",
    description: `The AI build failure database, vibe coding cookbook, and real case studies: ${stats.fixes} field-tested fixes, a ${recipeCount}-step workflow, and ${stats.apps} shipped apps. Free, open source.`,
    url: "https://vibeprompt.tech",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    keywords:
      "AI build failures, vibe coding, AI coding fixes, Claude Code, Cursor, AI workflow, open source",
    creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-8 sm:py-24">

        {/* Hero — big, clean, no chrome */}
        <h1 className="font-bold tracking-[-0.03em] leading-[1.04] text-[color:var(--ink)] text-[clamp(2.6rem,5vw+1rem,4.25rem)]">
          Vibe code that actually ships.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-[color:var(--ink-soft)]">
          The failure database, cookbook, and real-world case studies for builders shipping with AI.
          Free, open source, no sign-up.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
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

        {/* Three paths — typographic blocks, not boxes */}
        <section className="mt-20 grid gap-x-8 sm:grid-cols-3 divide-y divide-[color:var(--ink-rule)] sm:divide-y-0">
          {PATHS.map((p) => (
            <Link key={p.href} href={p.href} className="group block pt-7 first:pt-0 sm:pt-0">
              <p className="text-label text-[color:var(--accent)]">{p.eyebrow}</p>
              <p className="mt-2 text-[22px] font-semibold tracking-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)]">
                {p.title}
                <span aria-hidden className="ml-1 inline-block opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                  →
                </span>
              </p>
              <p className="text-body mt-1.5">{p.desc}</p>
            </Link>
          ))}
        </section>

        {/* Most searched failures — a clean list, not a grid of boxes */}
        <section className="mt-20">
          <h2 className="section-title">Most searched failures</h2>
          <ul className="mt-5 divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
            {examples.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/fixes/${p.id}`}
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
                >
                  <span className="text-body font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                    {p.title}
                  </span>
                  <span aria-hidden className="shrink-0 text-meta text-[color:var(--ink-faded)] opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-meta mt-4">
            <Link href="/fixes" className="vp-link">
              Search all {stats.fixes} fixes →
            </Link>
          </p>
        </section>

        {/* A quiet save prompt — the form itself lives on /weekly */}
        <WeeklyFixLink className="text-meta mt-20" />
      </div>
    </>
  );
}

export const revalidate = 3600;
