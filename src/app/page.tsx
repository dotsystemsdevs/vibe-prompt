import Link from "next/link";
import Image from "next/image";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { getSiteStats } from "@/lib/site-stats";
import { getRepoContributors } from "@/lib/github-repo-contributors";

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibe-prompt";

export default async function HomePage() {
  const [stats, contributors] = await Promise.all([getSiteStats(), getRepoContributors()]);
  const recipeCount = WORKFLOW_STEPS.length;
  const shown = contributors.slice(0, 8);

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

      {/* One screen, no scroll. Hero, then the people who build it in the open. */}
      <div className="flex w-full flex-col justify-center px-4 py-10 sm:px-6 lg:h-full lg:py-8">
        <div className="mx-auto w-full max-w-3xl text-center animate-in fade-in-0 slide-in-from-bottom-3 duration-700">

          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] py-1 pl-1 pr-3 shadow-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent)] text-[9px] font-bold tracking-tight text-white">vp</span>
            <span className="text-[13px] font-medium text-[color:var(--ink)]">vibeprompt</span>
            <span aria-hidden className="h-3 w-px bg-[color:var(--ink-rule)]" />
            <span className="text-[12px] text-[color:var(--ink-faded)]">free &amp; open source</span>
          </span>

          <h1 className="mx-auto mt-7 max-w-[19ch] text-balance font-bold tracking-[-0.035em] leading-[1.03] text-[clamp(2.1rem,3.8vw+0.6rem,3.5rem)]">
            <span className="text-[color:var(--ink)]">AI got you 80% of the way.</span>{" "}
            <span className="text-[color:var(--ink-faded)]">The last 20% is why projects die.</span>
          </h1>

          <p className="text-body-lg mx-auto mt-5 max-w-md text-pretty">
            Everything that broke shipping {stats.apps} real apps, and the fix for each.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/fixes"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)] hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              Search the fixes
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </Link>
            <Link
              href="/workflow"
              className="inline-flex items-center rounded-full border border-[color:var(--ink-rule)] bg-[color:var(--background)] px-6 py-3 text-[14px] font-medium text-[color:var(--ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              See the method
            </Link>
          </div>

          {/* Built in the open, the real people behind it, not just one. */}
          {shown.length > 0 && (
            <div className="mt-14 flex flex-col items-center gap-3.5 animate-in fade-in-0 duration-700 [animation-delay:200ms] [animation-fill-mode:both]">
              <span className="text-label">Built in the open</span>
              <div className="flex items-center justify-center -space-x-2">
                {shown.map((c) => (
                  <a
                    key={c.login}
                    href={c.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={c.login}
                    className="relative transition-transform duration-200 hover:z-10 hover:-translate-y-0.5"
                  >
                    <Image
                      src={c.avatarUrl}
                      alt={c.login}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border-2 border-[color:var(--background)] bg-[color:var(--paper-soft)]"
                    />
                  </a>
                ))}
              </div>
              <a
                href={`${GITHUB_URL}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-meta transition-colors hover:text-[color:var(--ink)]"
              >
                {contributors.length} {contributors.length === 1 ? "person" : "people"} building it in the open. Join them →
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;
