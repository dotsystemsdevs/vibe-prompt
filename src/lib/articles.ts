import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export const CATEGORIES = ["method", "android", "ios", "web", "growth"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  method: "Method",
  android: "Android",
  ios: "iOS",
  web: "Web",
  growth: "Growth",
};

function normalizeCategory(raw: unknown): Category {
  if (typeof raw === "string" && (CATEGORIES as readonly string[]).includes(raw)) {
    return raw as Category;
  }
  return "method";
}

export type TocItem = {
  level: 2 | 3;
  id: string;
  text: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  author: string;
  category: Category;
  readingMinutes: number;
  html: string;
  toc: TocItem[];
};

export type ArticleMeta = Omit<Article, "html" | "toc">;

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Reads + parses every article markdown file. Wrapped in two layers:
 * - unstable_cache: persists across server requests (heavy filesystem +
 *   markdown parse runs once, all subsequent navs hit cache).
 * - React.cache: dedupes within a single render (multiple components in
 *   the same render call this without re-fetching).
 */
const _getAllArticlesUncached = async (): Promise<ArticleMeta[]> => {
  let files: string[];
  try {
    files = await fs.readdir(ARTICLES_DIR);
  } catch {
    return [];
  }

  const articles = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(ARTICLES_DIR, file), "utf-8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title ?? "",
          description: data.description ?? "",
          date: data.date ?? "",
          image: data.image ?? "",
          imageAlt: data.imageAlt ?? "",
          author: data.author ?? "vibeprompt",
          category: normalizeCategory(data.category),
          readingMinutes: estimateReadingMinutes(content),
        } satisfies ArticleMeta;
      })
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
};

const _getAllArticlesPersistent = unstable_cache(
  _getAllArticlesUncached,
  ["all-articles"],
  { revalidate: 3600, tags: ["articles"] }
);

export const getAllArticles = cache(_getAllArticlesPersistent);

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const rawHtml = await marked(content, { async: true });

  const usedIds = new Set<string>();
  function uniqueId(base: string): string {
    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  }
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section";
  }

  const toc: TocItem[] = [];
  const withIds = rawHtml.replace(/<(h2|h3)>([^<]+)<\/\1>/g, (_m, tag: string, text: string) => {
    const level = (tag === "h2" ? 2 : 3) as 2 | 3;
    const id = uniqueId(slugify(text));
    toc.push({ level, id, text });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  const html = withIds
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? "",
    author: data.author ?? "vibeprompt",
    category: normalizeCategory(data.category),
    readingMinutes: estimateReadingMinutes(content),
    html,
    toc,
  };
}
