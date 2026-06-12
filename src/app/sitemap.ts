import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";
import { WEEKLY_FIXES } from "@/lib/weekly-fixes";
import { BUILT_WITH_PROJECTS, builtWithSlug } from "@/lib/built-with-data";

const BASE = "https://vibeprompt.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/fixes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/weekly`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/workflow`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/articles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/awesome`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/vs-books`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/vs-tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/built-with`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/submit-fix`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // One indexable URL per failure — the long-tail SEO surface.
  const fixRoutes: MetadataRoute.Sitemap = LIST_PROBLEMS.map((p) => ({
    url: `${BASE}/fixes/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // One indexable URL per Weekly Fix issue — freshness signal + long-tail.
  const weeklyRoutes: MetadataRoute.Sitemap = WEEKLY_FIXES.map((w) => ({
    url: `${BASE}/weekly/${w.slug}`,
    lastModified: new Date(`${w.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.65,
  }));

  // One indexable postmortem per shipped app — the proof surface.
  const builtWithRoutes: MetadataRoute.Sitemap = BUILT_WITH_PROJECTS.map((p) => ({
    url: `${BASE}/built-with/${builtWithSlug(p.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...fixRoutes, ...weeklyRoutes, ...builtWithRoutes];
}
