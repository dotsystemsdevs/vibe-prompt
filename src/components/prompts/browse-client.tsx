"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Prompt } from "@/lib/types";
import { PromptCard } from "@/components/prompts/prompt-card";

interface BrowseClientProps {
  categories: Category[];
  prompts: Prompt[];
}

export function BrowseClient({ categories, prompts }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<"new" | "popular">("new");
  const [copyCounts, setCopyCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (sort === "popular") {
      fetch("/api/copy-counts")
        .then((r) => r.json())
        .then((data: Record<string, number>) => setCopyCounts(data))
        .catch(() => {});
    }
  }, [sort]);

  const normalize = (value: string) =>
    value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const results = useMemo(() => {
    let list = [...prompts];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = normalize(query);
      list = list.filter((p) =>
        normalize(`${p.title} ${p.useCase} ${p.whenToUse} ${p.categoryName} ${p.tags.join(" ")} ${p.prompt}`).includes(q)
      );
    }

    if (sort === "popular") {
      list.sort((a, b) => (copyCounts[b.slug] ?? 0) - (copyCounts[a.slug] ?? 0));
    } else {
      list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    return list;
  }, [category, prompts, query, sort, copyCounts]);

  return (
    <article className="border border-foreground/20 overflow-hidden">
      {/* Search + filters */}
      <div className="border-b border-foreground/20 bg-foreground/[0.03] px-6 pt-4 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex flex-1 items-center border border-foreground/20 bg-background px-4 py-3 transition-colors focus-within:border-foreground/50">
            <svg className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder='Search prompts…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2 shrink-0 text-xs text-muted-foreground/40 transition-colors hover:text-foreground">✕</button>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setSort("new")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-widest transition-colors ${sort === "new" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              New
            </button>
            <span className="text-foreground/15 text-xs">|</span>
            <button
              onClick={() => setSort("popular")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-widest transition-colors ${sort === "popular" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Popular
            </button>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground/40 tabular-nums hidden sm:block">
            {results.length} prompts
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory("all")}
            className={`px-3 py-1.5 text-xs transition-colors ${
              category === "all"
                ? "bg-[var(--accent-blue)] text-white"
                : "border border-foreground/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`px-3 py-1.5 text-xs transition-colors ${
                category === c.slug
                  ? "bg-[var(--accent-blue)] text-white"
                  : "border border-foreground/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {results.map((prompt, i) => (
            <div key={prompt.slug} className={`border-b border-foreground/20 ${i % 2 === 0 ? "sm:border-r sm:border-foreground/20" : ""}`}>
              <PromptCard prompt={prompt} number={i + 1} copyCount={sort === "popular" ? (copyCounts[prompt.slug] ?? 0) : undefined} />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-8 py-20 text-center">
          <p className="text-sm text-muted-foreground">No prompts found.</p>
          <div className="mt-3 flex items-center justify-center gap-4">
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-foreground hover:underline">Clear search →</button>
            )}
            {category !== "all" && (
              <button onClick={() => setCategory("all")} className="text-xs text-foreground hover:underline">Clear filter →</button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
