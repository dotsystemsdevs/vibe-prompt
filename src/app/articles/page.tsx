import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getAllArticles, CATEGORIES, CATEGORY_LABEL, type Category } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles | vibeprompt",
  description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles, vibeprompt",
    description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
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
      <div className="page-shell">
        <PageHeader
          emoji="📝"
          title="Articles"
          lede="Practical guides for building with AI. No fluff, no theory, just what actually works once you start shipping."
        />

        {/* Category chip filter — Notion database filter row */}
        <div className="mb-3 flex flex-wrap gap-1">
          <CategoryChip href="/articles" active={activeCategory === null} label="All" count={allArticles.length} />
          {CATEGORIES.filter((c) => counts[c] > 0).map((c) => (
            <CategoryChip
              key={c}
              href={`/articles?cat=${c}`}
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
          <ul className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_84px_104px_48px] items-center gap-x-3 -mx-3 rounded-md px-3 py-2.5 transition-colors hover:bg-[color:var(--sidebar-hover)]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden className="shrink-0 text-[14px] leading-none">📄</span>
                    <span className="truncate text-body font-medium text-[color:var(--ink)] group-hover:underline">
                      {article.title}
                    </span>
                  </span>
                  <span className="hidden sm:block">
                    <span className="vp-badge">
                      {CATEGORY_LABEL[article.category]}
                    </span>
                  </span>
                  <span className="hidden sm:block text-meta tabular-nums">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-meta text-right tabular-nums">
                    {article.readingMinutes} min
                  </span>
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
