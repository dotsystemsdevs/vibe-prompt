import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FixesClient } from "@/components/fixes/fixes-client";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "AI Build Failure Database | VibePrompt",
  description:
    "Search fixes for the most common AI coding failures: broken builds, context loss, deployment issues, and vibe coding problems.",
  alternates: { canonical: "/fixes" },
  openGraph: {
    title: "The AI Build Failure Database | vibeprompt",
    description:
      "Fixes for the problems vibe coders hit when shipping with Claude Code, Cursor, Windsurf, Supabase, Vercel, Expo, and Stripe.",
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
      "Fixes for the most common AI coding failures: broken builds, context loss, tech debt, deployment and shipping problems.",
    url: "https://vibeprompt.tech/fixes",
    isPartOf: { "@type": "WebSite", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="page-shell-wide">
        <PageHeader
          emoji="🚑"
          accent="red"
          kicker="The AI build failure database"
          title="AI broke your build? Search the fix."
          lede={`${fixCount} failures and the fix for each. Search before you ask Claude.`}
        />

        {/* The page's one job: search, filter, solve. */}
        <div className="mt-8">
          <FixesClient problems={LIST_PROBLEMS} />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
