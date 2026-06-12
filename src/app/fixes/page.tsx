import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { WeeklyFixLink } from "@/components/fixes/weekly-fix-link";
import { FixesClient } from "@/components/fixes/fixes-client";
import { LIST_PROBLEMS } from "@/lib/list-problems";

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

export default function FixesPage() {
  const fixCount = LIST_PROBLEMS.length;

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
          lede={`${fixCount} field-tested failures and the exact fix for each, for the problems vibe coders hit when shipping with Claude Code, Cursor, Windsurf, Supabase, Vercel, Expo, and Stripe. Search before you ask Claude.`}
        />

        {/* Search + filters + results */}
        <div className="mt-8">
          <FixesClient problems={LIST_PROBLEMS} />
        </div>

        {/* Contribute + subscribe — quiet one-liners, no extra boxes */}
        <div className="mt-12 space-y-2 border-t border-[color:var(--ink-rule)] pt-6">
          <p className="text-meta">
            Hit a failure that&rsquo;s not here?{" "}
            <Link href="/submit-fix" className="vp-link">
              Submit a fix →
            </Link>
          </p>
          <WeeklyFixLink />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
