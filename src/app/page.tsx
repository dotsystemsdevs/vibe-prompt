import Link from "next/link";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { BUILT_WITH_PROJECTS } from "@/lib/built-with-data";
import { getSiteStats } from "@/lib/site-stats";

export default async function HomePage() {
  const stats = await getSiteStats();
  const recipeCount = WORKFLOW_STEPS.length;

  // Real shipped apps, named, as a quiet proof line (not a section).
  const appNames = BUILT_WITH_PROJECTS.map((p) => p.name).filter((n) => n !== "vibeprompt itself");

  // The whole product, three doors. Learn → Fix → Proof.
  const PATHS = [
    { eyebrow: "Learn", title: `The ${recipeCount}-step method`, desc: "Idea to shipped, nothing skipped.", href: "/workflow" },
    { eyebrow: "Fix", title: `${stats.fixes} failures`, desc: "The fix for each one.", href: "/fixes" },
    { eyebrow: "Proof", title: `${stats.apps} shipped apps`, desc: "What worked, what broke, what we'd change.", href: "/built-with" },
  ];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "vibeprompt",
    description: `The AI build failure database, vibe coding cookbook, and case studies: ${stats.fixes} fixes, a ${recipeCount}-step workflow, and ${stats.apps} shipped apps. Free, open source.`,
    url: "https://vibeprompt.tech",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    keywords: "AI build failures, vibe coding, AI coding fixes, Claude Code, Cursor, AI workflow, open source",
    creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* One screen. Vertically centered on desktop, no scroll. */}
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-6 py-16 sm:px-8 lg:h-full lg:py-0">

        {/* Hero — curiosity, then one line of context */}
        <h1 className="font-bold tracking-[-0.03em] leading-[1.06] text-[color:var(--ink)] text-[clamp(2.2rem,4vw+0.8rem,3.6rem)]">
          AI got you 80% of the way.
          <br />
          The last 20% is why projects die.
        </h1>
        <p className="text-body-lg mt-5 max-w-xl">
          The fixes, workflow, and postmortems behind {stats.apps} shipped AI-built products.
        </p>

        <div className="mt-8">
          <Link href="/fixes" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            Search the fixes
          </Link>
        </div>

        {/* Three paths — typography, no boxes */}
        <nav aria-label="Where to go" className="mt-16 grid gap-x-8 gap-y-7 sm:grid-cols-3">
          {PATHS.map((p) => (
            <Link key={p.href} href={p.href} className="group block">
              <p className="text-label text-[color:var(--accent)]">{p.eyebrow}</p>
              <p className="mt-1.5 text-[19px] font-semibold tracking-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)]">
                {p.title}
                <span aria-hidden className="ml-1 inline-block opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                  →
                </span>
              </p>
              <p className="text-body mt-1">{p.desc}</p>
            </Link>
          ))}
        </nav>

        {/* Quiet proof — real apps, named */}
        <p className="text-meta mt-14">Built while shipping {appNames.join(", ")}.</p>
      </div>
    </>
  );
}

export const revalidate = 3600;
