"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Prompt } from "@/lib/types";
import { PromptCard } from "@/components/prompts/prompt-card";

const SORT_OPTIONS = ["Chronological", "Newest", "Most upvoted"] as const;
type Sort = (typeof SORT_OPTIONS)[number];

const PROJECT_TARGETS = [
  { label: "Web App", query: "webapp", icon: "🖥️" },
  { label: "Mobile", query: "mobile", icon: "📱" },
  { label: "SaaS", query: "saas", icon: "☁️" },
  { label: "API / Backend", query: "api", icon: "⚙️" },
  { label: "CLI / Script", query: "tooling", icon: "🛠️" },
] as const;

interface BrowseClientProps {
  categories: Category[];
  prompts: Prompt[];
}

export function BrowseClient({ categories, prompts }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const initialQuery = searchParams.get("q") ?? "";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Chronological");

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const results = useMemo(() => {
    let list = [...prompts];

    if (category !== "all") {
      list = list.filter((prompt) => prompt.category === category);
    }

    if (projectFilter) {
      const pf = normalize(projectFilter);
      list = list.filter((prompt) => {
        const searchable = normalize(`${prompt.tags.join(" ")} ${prompt.title} ${prompt.useCase} ${prompt.categoryName}`);
        return searchable.includes(pf);
      });
    }

    if (query.trim()) {
      const q = normalize(query);
      list = list.filter(
        (prompt) => {
          const searchable = normalize(
            `${prompt.title} ${prompt.useCase} ${prompt.whenToUse} ${prompt.categoryName} ${prompt.tags.join(" ")} ${prompt.prompt}`
          );
          return searchable.includes(q);
        }
      );
    }

    if (sort === "Chronological") list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sort === "Newest") list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "Most upvoted") list.sort((a, b) => b.upvotes - a.upvotes);

    return list;
  }, [category, projectFilter, prompts, query, sort]);

  function applyProjectTarget(nextQuery: string) {
    setProjectFilter(nextQuery);
    setSort("Chronological");
  }

  return (
    <>
      <div className="border-b border-border bg-card/30 px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-widest text-muted-foreground">Project filters</span>
          <button
            onClick={() => {
              setCategory("all");
              setQuery("");
              setProjectFilter(null);
              setSort("Chronological");
            }}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors ${
              projectFilter === null
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">📦</span>
            <span>All Projects</span>
          </button>
          {PROJECT_TARGETS.map((target) => (
            <button
              key={target.label}
              onClick={() => applyProjectTarget(target.query)}
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs transition-colors ${
                projectFilter === target.query
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <span aria-hidden="true">{target.icon}</span>
              <span>{target.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-6 py-0 scrollbar-none">
        <button
          onClick={() => setCategory("all")}
          className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${
            category === "all"
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item.slug}
            onClick={() => setCategory(item.slug)}
            className={`shrink-0 border-b-2 px-3 py-3.5 text-xs transition-colors ${
              category === item.slug
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 border-b border-border px-6 py-3">
        <div className="relative flex flex-1 items-center border border-border bg-input px-3 py-2">
          <svg
            className="mr-2 h-3.5 w-3.5 shrink-0 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="flex shrink-0 items-center">
          {SORT_OPTIONS.map((option, i) => (
            <span key={option} className="flex items-center">
              {i > 0 && <span className="mx-2 text-[10px] text-muted-foreground/40">·</span>}
              <button
                onClick={() => setSort(option)}
                className={`text-xs transition-colors ${
                  sort === option
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-border px-6 py-2.5">
        <span className="text-xs text-muted-foreground">
          {results.length} prompt{results.length !== 1 ? "s" : ""}
          {projectFilter && ` in ${projectFilter}`}
          {query && ` for "${query}"`}
        </span>
        {(category !== "all" || projectFilter !== null || query.trim()) && (
          <button
            onClick={() => {
              setCategory("all");
              setProjectFilter(null);
              setQuery("");
            }}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            x clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
          {results.map((prompt) => (
            <div key={prompt.slug} className="border-b border-r border-border">
              <PromptCard prompt={prompt} />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-20 text-center">
          <p className="text-sm text-muted-foreground">No prompts found.</p>
          <div className="mt-3 flex items-center justify-center gap-4">
            {query && (
              <button onClick={() => setQuery("")} className="text-xs text-foreground hover:underline">
                Clear search →
              </button>
            )}
            {category !== "all" && (
              <button onClick={() => setCategory("all")} className="text-xs text-foreground hover:underline">
                Clear filter →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

