import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getAllArticles } from "@/lib/articles";

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

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">

        {/* Back */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs text-foreground/40 transition-colors hover:text-foreground/80 mb-8"
        >
          ← Articles
        </Link>

        <article className="mx-auto max-w-2xl">

          {/* Header */}
          <header className="mb-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35 mb-3">
              {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              {" · "}{article.author}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground">
              {article.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          </header>

          {/* Hero image */}
          {article.image && (
            <div className="relative w-full overflow-hidden mb-10 border border-foreground/10" style={{ aspectRatio: "16/9" }}>
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

        </article>
      </div>
    </div>
  );
}
