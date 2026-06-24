import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FixActions } from "@/components/fixes/fix-actions";
import { FixPrompt } from "@/components/fixes/fix-prompt";
import { LIST_PROBLEMS, LIST_CATEGORY_LABEL, FIX_RECIPE } from "@/lib/list-problems";
import { FIX_PROMPTS } from "@/lib/fix-prompts";
import { WORKFLOW_NAV } from "@/lib/workflow-nav";

// Fixed dataset, only the known failures exist; everything else is a hard 404.
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
      title: `${p.title}, the fix`,
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
  const promptToPaste = FIX_PROMPTS[p.id];
  const recipeStep = FIX_RECIPE[p.id];
  const recipe = recipeStep ? WORKFLOW_NAV.find((s) => s.step === recipeStep) : undefined;

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
        <Link
          href="/fixes"
          className="inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[color:var(--ink-rule)] px-3.5 py-1.5 text-[13px] font-medium text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
        >
          <span aria-hidden>←</span> All fixes
        </Link>

        {/* The problem, the failure, framed by the red category kicker */}
        <PageHeader accent="red" kicker={`${categoryLabel} failure`} title={p.title} />

        {/* The fix, the content is the interface, no box */}
        <section>
          <p className="text-label mb-2.5">The fix</p>
          <div className="whitespace-pre-line text-[17px] leading-[1.75] text-[color:var(--ink-soft)]">
            {p.answer}
          </div>

          <div className="mt-6">
            <FixActions title={p.title} answer={p.answer} path={`/fixes/${p.id}`} />
          </div>
        </section>

        {/* The prompt, paste this into your AI to apply the fix */}
        {promptToPaste && (
          <section className="mt-10">
            <FixPrompt prompt={promptToPaste} />
          </section>
        )}

        {(recipe || p.articleSlug) && (
          <div className="text-body mt-10 space-y-2.5">
            {recipe && (
              <p className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)]"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                <span>
                  Learn it properly:{" "}
                  <Link href={`/workflow#step-${recipe.step}`} className="vp-link">
                    Recipe {recipe.step}, {recipe.title} →
                  </Link>
                </span>
              </p>
            )}
            {p.articleSlug && (
              <p className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)]"><path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
                <span>
                  Deeper dive:{" "}
                  <Link href={`/articles/${p.articleSlug}`} className="vp-link">
                    read the full article →
                  </Link>
                </span>
              </p>
            )}
          </div>
        )}

        {/* Calm footer, contribute + subscribe as quiet one-liners */}
        <div className="text-meta mt-12 space-y-1.5 border-t border-[color:var(--ink-rule)] pt-6">
          <p>
            Know a better fix, or hit one that&rsquo;s not here?{" "}
            <Link href="/submit-fix" className="vp-link">
              Submit a fix →
            </Link>
          </p>
          <p>
            Get one fix in your inbox each week.{" "}
            <Link href="/weekly" className="vp-link">
              The Weekly Fix →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
