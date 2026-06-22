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
  { type: "page", id: "fixes", title: "The AI Build Failure Database", href: "/fixes", snippet: "Search field-tested fixes for when AI breaks your build." },
  { type: "page", id: "workflow", title: "The 10-step workflow", href: "/workflow", snippet: "Interactive build loop from idea to shipped." },
  { type: "page", id: "articles", title: "Articles", href: "/articles", snippet: "The latest in vibe coding: new apps, model drops, new tools, and deep-dive guides." },
  { type: "page", id: "awesome", title: "Awesome tools", href: "/awesome", snippet: "Curated tools, platforms, and resources." },
  { type: "page", id: "compare", title: "Compare", href: "/compare", snippet: "vibeprompt vs the vibe coding tools and books, on the same axes." },
  { type: "page", id: "built-with", title: "Built with vibeprompt", href: "/built-with", snippet: "Real indie apps shipped using the 10-step workflow. What worked, what broke." },
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
      href: `/fixes/${p.id}`,
      snippet: p.answer.slice(0, 140),
      category: p.category,
    }));

    return [...STATIC_PAGES, ...articleItems, ...promptItems, ...problemItems];
  },
  ["search-data"],
  { revalidate: 3600, tags: ["articles", "prompts"] }
);
