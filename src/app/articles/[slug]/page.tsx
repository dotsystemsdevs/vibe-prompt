import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleKeywords, getArticles } from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function renderBulletText(bullet: string) {
  const match = bullet.match(/^([^:]{2,80}):\s(.+)$/);
  if (!match) return bullet;

  const [, term, rest] = match;
  return (
    <>
      <strong>{term}:</strong> {rest}
    </>
  );
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | VibePrompt",
      description: "The article you requested does not exist.",
    };
  }

  const canonical = `/articles/${article.slug}`;

  return {
    title: `${article.title} | VibePrompt`,
    description: article.excerpt,
    keywords: getArticleKeywords(article),
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      type: "article",
      publishedTime: article.publishedDate,
      section: article.kicker,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    articleSection: article.kicker,
    author: {
      "@type": "Organization",
      name: "VibePrompt",
    },
    publisher: {
      "@type": "Organization",
      name: "VibePrompt",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/articles/${article.slug}`,
    },
    keywords: getArticleKeywords(article).join(", "),
  };

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <section className="border-b border-border px-6 py-12">
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/articles" className="transition-colors hover:text-foreground">
              Articles
            </Link>
            <span>/</span>
            <span>{article.kicker}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {article.kicker}
            </span>
            <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>

          <h1 className="mt-5 flex items-start gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span aria-hidden="true" className="mt-1 text-2xl sm:text-3xl">
              {article.icon}
            </span>
            <span>{article.title}</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90">{article.excerpt}</p>
        </section>

        <section className="px-6 py-10">
          <div className="space-y-12">
            {article.sections.map((section) => (
              <article key={section.heading} className="pb-2">
                <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-8 text-foreground/85">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-4 space-y-2.5 text-[15px] leading-7 text-foreground/85">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span aria-hidden="true">-</span>
                        <span>{renderBulletText(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <pre className="mt-4 overflow-x-auto border border-border bg-card p-4 text-xs leading-relaxed whitespace-pre-wrap">
                    {section.code}
                  </pre>
                )}

                {section.links && (
                  <ul className="mt-4 space-y-3">
                    {section.links.map((item) => (
                      <li key={`${section.heading}-${item.url}`} className="border border-border bg-card p-3">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground underline-offset-2 hover:underline"
                        >
                          {item.label}
                        </a>
                        {item.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
