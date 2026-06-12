import "server-only";
import { unstable_cache } from "next/cache";
import { getAllArticles } from "@/lib/articles";
import { getPromptLibrary } from "@/lib/prompt-library";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export type SearchItem = {
  type: "article" | "prompt" | "problem" | "page";
  id: string;
  title: string;
  href: string;
  snippet?: string;
  category?: string;
};

const STATIC_PAGES: SearchItem[] = [
  { type: "page", id: "workflow", title: "The 10-step workflow", href: "/workflow", snippet: "Interactive build loop from idea to shipped." },
  { type: "page", id: "articles", title: "Articles", href: "/articles", snippet: "Deep-dives with real receipts from shipped apps." },
  { type: "page", id: "awesome", title: "Awesome tools", href: "/awesome", snippet: "Curated tools, platforms, and resources." },
  { type: "page", id: "vs-books", title: "vs. the vibe coding books", href: "/vs-books", snippet: "How vibeprompt compares to Gene Kim and Smykowski." },
  { type: "page", id: "vs-tools", title: "vs. the vibe coding tools", href: "/vs-tools", snippet: "Replit, Lovable, Bolt, Cursor, Claude Code, v0 — honest comparison." },
  { type: "page", id: "built-with", title: "Built with vibeprompt", href: "/built-with", snippet: "Six indie apps shipped using the 10-step workflow. What worked, what broke." },
  { type: "page", id: "faq", title: "FAQ", href: "/faq", snippet: "Frequently asked questions." },
];

/**
 * Cached across server requests. Without this the root layout re-builds
 * the full search index (articles + prompts + problems) on every page nav,
 * which dominates dev-mode latency.
 */
export const getSearchData = unstable_cache(
  async (): Promise<SearchItem[]> => {
    const [{ prompts }, articles] = await Promise.all([
      getPromptLibrary(),
      getAllArticles(),
    ]);

    const articleItems: SearchItem[] = articles.map((a) => ({
      type: "article",
      id: a.slug,
      title: a.title,
      href: `/articles/${a.slug}`,
      snippet: a.description,
      category: a.category,
    }));

    const promptItems: SearchItem[] = prompts.map((p) => ({
      type: "prompt",
      id: p.slug,
      title: p.title,
      href: "/workflow",
      snippet: p.useCase,
      category: p.categoryName,
    }));

    const problemItems: SearchItem[] = LIST_PROBLEMS.map((p) => ({
      type: "problem",
      id: p.id,
      title: p.title,
      href: `/articles/${p.articleSlug}#${p.id}`,
      snippet: p.answer.slice(0, 140),
      category: p.category,
    }));

    return [...STATIC_PAGES, ...articleItems, ...promptItems, ...problemItems];
  },
  ["search-data"],
  { revalidate: 3600, tags: ["articles", "prompts"] }
);
