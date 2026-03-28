import Link from "next/link";
import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Vibe Coding Articles | Beginner guides, tips, and tool categories",
  description:
    "Beginner-friendly vibe coding articles: what it is, where the name comes from, copy-paste prompts, and awesome tool categories.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Vibe Coding Articles",
    description:
      "Read beginner-friendly guides for vibe coding, prompts, and tool categories.",
    url: "/articles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Articles",
    description: "Beginner-friendly vibe coding articles you actually want to read.",
  },
};

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl">
        <section className="border-b border-border px-6 py-16">
          <p className="hero-kicker mb-4">Articles</p>
          <h1 className="hero-display max-w-4xl">What is vibe coding? Start here.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Beginner-first articles with practical examples, copy-paste prompts, and categorized tool lists.
          </p>
        </section>

        <section className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-r border-border px-6 py-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {article.kicker}
                </span>
                <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>

              <h2 className="mt-4 flex items-start gap-2 text-xl font-semibold tracking-tight">
                <span aria-hidden="true" className="mt-0.5 text-lg">
                  {article.icon}
                </span>
                <span>{article.title}</span>
              </h2>
              <p className="mt-2 text-base leading-relaxed text-foreground/95">{article.hook}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>

              <Link
                href={`/articles/${article.slug}`}
                className="mt-5 inline-flex text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Read more →
              </Link>
            </article>
          ))}
        </section>

        <section className="px-6 py-14 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Need implementation flow too?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Open workflow for the step-by-step execution system.</p>
          <Link
            href="/workflow"
            className="mt-6 inline-flex bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Open workflow →
          </Link>
        </section>
      </div>
    </div>
  );
}

