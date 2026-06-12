import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { StatsRow } from "@/components/site/stats-row";
import { NewsletterCta } from "@/components/fixes/newsletter-cta";
import { FixesClient } from "@/components/fixes/fixes-client";
import { LIST_PROBLEMS } from "@/lib/list-problems";
import { getSiteStats } from "@/lib/site-stats";

export const metadata: Metadata = {
  title: "AI Build Failure Database | VibePrompt",
  description:
    "Search field-tested fixes for the most common AI coding failures, broken builds, context loss, deployment issues, and vibe coding problems.",
  alternates: { canonical: "/fixes" },
  openGraph: {
    title: "The AI Build Failure Database | vibeprompt",
    description:
      "Field-tested fixes for the problems vibe coders hit when shipping with Claude Code, Cursor, Windsurf, Supabase, Vercel, Expo, and Stripe.",
    url: "https://vibeprompt.tech/fixes",
    type: "website",
  },
};

export default async function FixesPage() {
  const stats = await getSiteStats();

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The AI Build Failure Database",
    description:
      "Field-tested fixes for the most common AI coding failures: broken builds, context loss, tech debt, deployment and shipping problems.",
    url: "https://vibeprompt.tech/fixes",
    isPartOf: { "@type": "WebSite", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="page-shell-wide">
        <PageHeader
          emoji="🚑"
          kicker="The AI build failure database"
          title="AI broke your build? Search the fix."
          lede={`${stats.fixes} field-tested failures and the exact fix for each, for the problems vibe coders hit when shipping with Claude Code, Cursor, Windsurf, Supabase, Vercel, Expo, and Stripe. Search before you ask Claude.`}
        />

        {/* Authority layer */}
        <div className="mt-8">
          <StatsRow stats={stats} />
        </div>

        {/* Search + filters + results */}
        <div className="mt-10">
          <FixesClient problems={LIST_PROBLEMS} />
        </div>

        {/* Contribute + subscribe */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <section className="vp-card-bordered vp-card-lg flex flex-col">
            <p className="page-kicker">Contribute</p>
            <h2 className="section-title mt-2 flex items-center gap-2">
              <span aria-hidden className="text-[20px] leading-none">🛠️</span>
              Hit a failure that&rsquo;s not here?
            </h2>
            <p className="text-body mt-2 flex-1">
              The database grows from real builds. Submit the failure, the fix, and the prompt that solved it. You get the credit.
            </p>
            <div className="mt-5">
              <Link href="/submit-fix" className="btn-secondary">
                Submit a fix
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <NewsletterCta />
        </div>

        {/* Quiet footer link back to the workflow */}
        <p className="text-meta mt-10">
          Building something now?{" "}
          <Link href="/workflow" className="vp-link">
            Open the 10-step cookbook →
          </Link>
        </p>
      </div>
    </main>
  );
}

export const revalidate = 3600;
