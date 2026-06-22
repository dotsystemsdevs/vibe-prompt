import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { getAllArticles, CATEGORIES, CATEGORY_LABEL, type Category } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles | vibeprompt",
  description: "The latest in vibe coding: new apps, model releases, new tools, and a few deep-dive guides for building with AI.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles, vibeprompt",
    description: "The latest in vibe coding: new apps, model releases, new tools, and a few deep-dive guides for building with AI.",
    url: "https://vibeprompt.tech/articles",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

interface ArticlesPageProps {
  searchParams: Promise<{ cat?: string }>;
}

function parseCategory(raw: string | undefined): Category | null {
  if (raw && (CATEGORIES as readonly string[]).includes(raw)) return raw as Category;
  return null;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { cat } = await searchParams;
  const activeCategory = parseCategory(cat);
  const allArticles = await getAllArticles();
  const articles = activeCategory ? allArticles.filter((a) => a.category === activeCategory) : allArticles;

  const counts: Record<Category, number> = Object.fromEntries(
    CATEGORIES.map((c) => [c, 0])
  ) as Record<Category, number>;
  for (const a of allArticles) counts[a.category]++;

  return (
    <div>
      <div className="page-shell-wide">
        <PageHeader
          icon="article"
          title="Articles"
          lede="The latest in vibe coding: new apps worth copying, model drops, new tools, and the occasional deep-dive guide. The how-to fixes now live in Fixes."
        />

        {/* Category chip filter — no "All"; clicking the active chip clears it */}
        <div className="mb-3 flex flex-wrap gap-1">
          {CATEGORIES.filter((c) => counts[c] > 0).map((c) => (
            <CategoryChip
              key={c}
              href={activeCategory === c ? "/articles" : `/articles?cat=${c}`}
              active={activeCategory === c}
              label={CATEGORY_LABEL[c]}
              count={counts[c]}
            />
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="vp-empty mt-4">
            <p className="vp-empty-title">No articles in this category yet.</p>
            {activeCategory && (
              <Link href="/articles" className="btn-ghost mt-3">
                Clear filter →
              </Link>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="vp-card-bordered group flex h-full flex-col overflow-hidden hover:border-[color:var(--ink-soft)]"
                >
                  <div
                    className="relative w-full overflow-hidden bg-[color:var(--sidebar-hover)]"
                    style={{ aspectRatio: "16/9" }}
                  >
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[28px]" aria-hidden>
                        📄
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="vp-badge self-start">{CATEGORY_LABEL[article.category]}</span>
                    <h2 className="text-body mt-2.5 font-medium leading-snug text-[color:var(--ink)] group-hover:underline">
                      {article.title}
                    </h2>
                    <p className="text-meta mt-auto flex items-center gap-2 pt-3 tabular-nums">
                      <span>
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{article.readingMinutes} min</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CategoryChip({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-meta transition-colors ${
        active
          ? "bg-[color:var(--sidebar-active)] text-[color:var(--ink)] font-medium"
          : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
      }`}
    >
      <span>{label}</span>
      <span className="text-[color:var(--ink-faded)] tabular-nums">{count}</span>
    </Link>
  );
}

export const revalidate = 3600;
