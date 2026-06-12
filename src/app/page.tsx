import Link from "next/link";
import type { CSSProperties } from "react";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { BUILT_WITH_PROJECTS } from "@/lib/built-with-data";
import { getSiteStats } from "@/lib/site-stats";

export default async function HomePage() {
  const stats = await getSiteStats();
  const recipeCount = WORKFLOW_STEPS.length;
  const appNames = BUILT_WITH_PROJECTS.map((p) => p.name).filter((n) => n !== "vibeprompt itself");

  // Three real artifacts, not three categories: a failure, a project, the method.
  const DOORS = [
    {
      eyebrow: "A failure",
      accent: "var(--page-red)",
      title: "Tests pass, but the feature is broken.",
      desc: `And ${stats.fixes - 1} more, each with the fix.`,
      href: "/fixes/tests-pass-feature-broken",
    },
    {
      eyebrow: "A project",
      accent: "var(--page-blue)",
      title: "Commitment Issues launched.",
      desc: "Then the Stripe webhook went silent after a deploy.",
      href: "/built-with/commitment-issues",
    },
    {
      eyebrow: "The method",
      accent: "var(--page-amber)",
      title: `The ${recipeCount} steps behind every app.`,
      desc: "Idea to shipped, nothing skipped.",
      href: "/workflow",
    },
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

        {/* Hero — curiosity, then one concrete line of context */}
        <h1 className="font-bold tracking-[-0.03em] leading-[1.06] text-[color:var(--ink)] text-[clamp(2.2rem,4vw+0.8rem,3.6rem)]">
          AI got you 80% of the way.
          <br />
          The last 20% is why projects die.
        </h1>
        <p className="text-body-lg mt-5 max-w-xl">
          Everything that broke shipping {stats.apps} real apps, and the fix for each.
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

        {/* Three doors — each is a real artifact, not a category */}
        <nav aria-label="Where to go" className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {DOORS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group block"
              style={{ "--page-accent": d.accent } as CSSProperties}
            >
              <p className="text-label text-[color:var(--page-accent)]">{d.eyebrow}</p>
              <p className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--page-accent)]">
                {d.title}
                <span aria-hidden className="ml-1 inline-block opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                  →
                </span>
              </p>
              <p className="text-body mt-1.5">{d.desc}</p>
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
