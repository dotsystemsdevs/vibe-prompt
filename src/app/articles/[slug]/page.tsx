import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getAllArticles, CATEGORY_LABEL } from "@/lib/articles";
import { PageHeader } from "@/components/layout/page-header";
import { ArticleToc } from "@/components/articles/article-toc";
import { LIST_PROBLEMS, LIST_CATEGORY_LABEL } from "@/lib/list-problems";

const CATEGORY_EMOJI: Record<string, string> = {
  Method: "🧠",
  Growth: "📈",
  iOS: "🍎",
  Android: "🤖",
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | vibeprompt`,
    description: article.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://vibeprompt.tech/articles/${slug}`,
      images: article.image ? [{ url: article.image, alt: article.imageAlt }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const relatedProblems = LIST_PROBLEMS.filter((p) => p.articleSlug === article.slug);

  return (
    <div className="">
      <div className="page-shell-wide">

        {/* Back */}
        <Link
          href="/articles"
          className="btn-ghost mb-8"
        >
          ← Articles
        </Link>

        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* TOC sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
              <ArticleToc
                items={article.toc}
                problems={relatedProblems.map((p) => ({ id: p.id, title: p.title }))}
              />
            </div>
          </aside>

          <article className="mx-auto max-w-2xl lg:mx-0">

            {/* Header */}
            <PageHeader
              emoji={CATEGORY_EMOJI[article.category] ?? "📄"}
              title={article.title}
              lede={article.description}
            >
              <p className="text-meta mt-3">
                {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                {" · "}{article.author}
                {" · "}{article.readingMinutes} min read
              </p>
            </PageHeader>

            {/* Hero image */}
            {article.image && (
              <div className="relative w-full overflow-hidden mb-10 rounded-lg border border-[color:var(--ink-rule)]" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 672px) 100vw, 672px"
                />
              </div>
            )}

            {/* Body */}
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            {/* Related section */}
            {(relatedArticles.length > 0 || relatedProblems.length > 0) && (
              <aside className="mt-16 border-t border-[color:var(--ink-rule)] pt-8">
                <h2 className="section-title mb-6 flex items-center gap-2.5">
                  <span aria-hidden className="text-[22px] leading-none">📚</span>
                  Keep reading
                </h2>

                {relatedArticles.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-meta mb-3 font-semibold text-[color:var(--ink)]/85">
                      More in {CATEGORY_LABEL[article.category]}
                    </h3>
                    <ul className="space-y-1">
                      {relatedArticles.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/articles/${a.slug}`}
                            className="group block py-2 border-b border-[color:var(--ink-rule)] last:border-b-0"
                          >
                            <p className="text-body font-medium leading-snug text-[color:var(--ink)]/85 group-hover:text-[color:var(--ink)] transition-colors">
                              {a.title}
                            </p>
                            <p className="text-meta mt-1 line-clamp-2">
                              {a.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedProblems.length > 0 && (
                  <div>
                    <h3 className="text-meta mb-3 font-semibold text-[color:var(--ink)]/85">
                      Fixes from this article
                    </h3>
                    {/* Each fix lives in one place, the Fixes database. Link, don't duplicate. */}
                    <ul className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
                      {relatedProblems.map((p) => (
                        <li key={p.id} id={p.id} className="scroll-mt-24">
                          <Link href={`/fixes/${p.id}`} className="group flex items-baseline justify-between gap-4 py-3.5">
                            <span className="text-body font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                              {p.title}
                            </span>
                            <span className="shrink-0 text-meta text-[color:var(--ink-faded)]">
                              {LIST_CATEGORY_LABEL[p.category]}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            )}

          </article>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
