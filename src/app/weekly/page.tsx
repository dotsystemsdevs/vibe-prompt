import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { NewsletterCta } from "@/components/fixes/newsletter-cta";
import { getWeeklyFixesSorted } from "@/lib/weekly-fixes";

export const metadata: Metadata = {
  title: "The Weekly Fix — archive | vibeprompt",
  description:
    "Every issue of The Weekly Fix: one AI build failure, the fix, and the prompt that solves it. Read past issues or subscribe.",
  alternates: { canonical: "/weekly" },
  openGraph: {
    title: "The Weekly Fix — archive",
    description: "One AI build failure, the fix, and the prompt that solves it. Sent weekly.",
    url: "https://vibeprompt.tech/weekly",
    type: "website",
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function WeeklyPage() {
  const issues = getWeeklyFixesSorted();

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Weekly Fix",
    description: "One AI build failure, the fix, and the prompt that solves it. Sent weekly.",
    url: "https://vibeprompt.tech/weekly",
    isPartOf: { "@type": "WebSite", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="page-shell">
        <PageHeader
          emoji="📬"
          kicker="The Weekly Fix"
          title="The Weekly Fix"
          lede="One AI build failure, the fix, and the prompt that solves it. Read every past issue below, or get the next one in your inbox."
        />

        <div className="mt-8">
          <NewsletterCta />
        </div>

        <section className="mt-12">
          <h2 className="text-label mb-4">
            Past issues · {issues.length}
          </h2>
          <ul className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
            {issues.map((issue) => (
              <li key={issue.slug}>
                <Link href={`/weekly/${issue.slug}`} className="group block py-5">
                  <div className="flex items-center gap-2 text-meta">
                    <time dateTime={issue.date}>{formatDate(issue.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{issue.readingTime} read</span>
                  </div>
                  <h3 className="text-headline mt-1 transition-colors group-hover:text-[color:var(--accent)]">
                    {issue.title}
                  </h3>
                  <p className="text-body mt-1.5">{issue.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export const revalidate = 3600;
