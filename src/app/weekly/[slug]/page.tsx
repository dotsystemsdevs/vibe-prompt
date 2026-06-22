import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { WeeklyFixLink } from "@/components/fixes/weekly-fix-link";
import { CopyButton } from "@/components/copy-button";
import { getWeeklyFix, getWeeklyFixesSorted, WEEKLY_FIXES } from "@/lib/weekly-fixes";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const dynamicParams = false;

export function generateStaticParams() {
  return WEEKLY_FIXES.map((w) => ({ slug: w.slug }));
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = getWeeklyFix(slug);
  if (!issue) return { title: "Issue not found | vibeprompt" };
  return {
    title: `${issue.title} | The Weekly Fix`,
    description: issue.summary,
    alternates: { canonical: `/weekly/${issue.slug}` },
    openGraph: {
      title: issue.title,
      description: issue.summary,
      url: `https://vibeprompt.tech/weekly/${issue.slug}`,
      type: "article",
      publishedTime: issue.date,
    },
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-label mb-2">{label}</h2>
      <p className="text-body-lg whitespace-pre-line">{children}</p>
    </section>
  );
}

export default async function WeeklyIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getWeeklyFix(slug);
  if (!issue) notFound();

  const relatedFix = LIST_PROBLEMS.find((p) => p.id === issue.relatedFixId);
  const moreIssues = getWeeklyFixesSorted()
    .filter((w) => w.slug !== issue.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: issue.title,
    description: issue.summary,
    datePublished: issue.date,
    dateModified: issue.date,
    author: { "@type": "Organization", name: "vibeprompt" },
    publisher: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
    mainEntityOfPage: `https://vibeprompt.tech/weekly/${issue.slug}`,
    articleSection: "The Weekly Fix",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-shell">
        <Link href="/weekly" className="btn-ghost">
          ← All issues
        </Link>

        <PageHeader accent="purple" kicker="The Weekly Fix" title={issue.title}>
          <div className="text-meta mt-3 flex flex-wrap items-center gap-2">
            <time dateTime={issue.date}>{formatDate(issue.date)}</time>
            <span aria-hidden>·</span>
            <span>{issue.readingTime} read</span>
            {issue.tools.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span>{issue.tools.join(", ")}</span>
              </>
            )}
          </div>
        </PageHeader>

        <p className="text-body-lg">{issue.summary}</p>

        <Section label="The problem">{issue.problem}</Section>
        <Section label="The symptom">{issue.symptom}</Section>
        <Section label="Why it happens">{issue.whyItHappens}</Section>
        <Section label="The fix">{issue.fix}</Section>

        {/* Copy-paste prompt */}
        <section className="mt-8">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-label">The prompt</h2>
            <CopyButton text={issue.prompt} label="Copy prompt" className="btn-ghost" />
          </div>
          <div className="vp-card vp-fill vp-card-md">
            <p className="whitespace-pre-line font-mono text-[13.5px] leading-[1.6] text-[color:var(--ink)]">
              {issue.prompt}
            </p>
          </div>
        </section>

        {/* Related fix */}
        {relatedFix && (
          <p className="text-body mt-8 flex items-center gap-2">
            <span aria-hidden>🚑</span>
            <span>
              Full entry in the database:{" "}
              <Link href={`/fixes/${relatedFix.id}`} className="vp-link">
                {relatedFix.title} →
              </Link>
            </span>
          </p>
        )}

        {/* Subscribe, quiet link, the form lives on /weekly */}
        <div className="mt-10 border-t border-[color:var(--ink-rule)] pt-6">
          <WeeklyFixLink />
        </div>

        {/* More issues */}
        {moreIssues.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title mb-3">More issues</h2>
            <ul className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
              {moreIssues.map((w) => (
                <li key={w.slug}>
                  <Link href={`/weekly/${w.slug}`} className="group block py-3">
                    <span className="text-body font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                      {w.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

export const revalidate = 3600;
