import "server-only";

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  author: string;
  html: string;
};

export type ArticleMeta = Omit<Article, "html">;

export async function getAllArticles(): Promise<ArticleMeta[]> {
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
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title ?? "",
          description: data.description ?? "",
          date: data.date ?? "",
          image: data.image ?? "",
          imageAlt: data.imageAlt ?? "",
          author: data.author ?? "VibePrompt",
        } satisfies ArticleMeta;
      })
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const html = await marked(content, { async: true });

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? "",
    author: data.author ?? "VibePrompt",
    html,
  };
}
