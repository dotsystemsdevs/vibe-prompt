import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FixActions } from "@/components/fixes/fix-actions";
import { NewsletterCta } from "@/components/fixes/newsletter-cta";
import { LIST_PROBLEMS, LIST_CATEGORY_LABEL } from "@/lib/list-problems";

// Fixed dataset — only the known failures exist; everything else is a hard 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LIST_PROBLEMS.map((p) => ({ id: p.id }));
}

function getProblem(id: string) {
  return LIST_PROBLEMS.find((p) => p.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProblem(id);
  if (!p) return { title: "Fix not found | vibeprompt" };
  const desc = p.answer.length > 158 ? `${p.answer.slice(0, 155).trimEnd()}...` : p.answer;
  return {
    title: `${p.title} | vibeprompt`,
    description: desc,
    alternates: { canonical: `/fixes/${p.id}` },
    openGraph: {
      title: `${p.title} — the fix`,
      description: desc,
      url: `https://vibeprompt.tech/fixes/${p.id}`,
      type: "article",
    },
  };
}

export default async function FixPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProblem(id);
  if (!p) notFound();

  const categoryLabel = LIST_CATEGORY_LABEL[p.category];
  const related = LIST_PROBLEMS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: p.title,
      text: p.title,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.answer,
        url: `https://vibeprompt.tech/fixes/${p.id}`,
      },
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-shell">
        <Link href="/fixes" className="btn-ghost">
          ← All fixes
        </Link>

        <PageHeader kicker={`${categoryLabel} failure`} title={p.title} />

        <FixActions title={p.title} answer={p.answer} path={`/fixes/${p.id}`} />

        {/* The fix */}
        <div className="vp-card vp-fill vp-card-lg mt-6">
          <p className="text-label mb-2">The fix</p>
          <p className="text-body-lg whitespace-pre-line">{p.answer}</p>
        </div>

        {p.articleSlug && (
          <p className="text-body mt-6 flex items-center gap-2">
            <span aria-hidden>📄</span>
            <span>
              Deeper dive:{" "}
              <Link href={`/articles/${p.articleSlug}`} className="vp-link">
                read the full article →
              </Link>
            </span>
          </p>
        )}

        {/* Related failures */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title mb-4">More {categoryLabel} failures</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/fixes/${r.id}`} className="group block vp-card-bordered vp-card-hover vp-card-tight">
                    <span className="text-body font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contribute */}
        <p className="text-meta mt-10">
          Know a better fix, or hit one that&rsquo;s not here?{" "}
          <Link href="/submit-fix" className="vp-link">
            Submit a fix →
          </Link>
        </p>

        {/* Capture — these pages are the SEO entry points, so capture matters most here */}
        <div className="mt-8">
          <NewsletterCta />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
