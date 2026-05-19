"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LIST_CATEGORIES,
  LIST_CATEGORY_LABEL,
  LIST_CATEGORY_DESCRIPTION,
  type ListCategory,
  type ListProblem,
} from "@/lib/list-problems";

interface ProblemsListProps {
  problems: ListProblem[];
  initialCategory: ListCategory | null;
}

export function ProblemsList({ problems, initialCategory }: ProblemsListProps) {
  const [category, setCategory] = useState<ListCategory | null>(initialCategory);
  const [query, setQuery] = useState("");

  const counts: Record<ListCategory, number> = useMemo(() => {
    const c = Object.fromEntries(LIST_CATEGORIES.map((k) => [k, 0])) as Record<ListCategory, number>;
    for (const p of problems) c[p.category]++;
    return c;
  }, [problems]);

  const filtered = useMemo(() => {
    let list = problems;
    if (category) list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) || p.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [problems, category, query]);

  const hasFilter = category !== null || query.trim() !== "";

  return (
    <>
      {/* Search input */}
      <div className="mb-6">
        <label htmlFor="problem-search" className="sr-only">
          Describe your problem or paste an error
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
          </span>
          <input
            id="problem-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your problem, or paste an error message..."
            className="w-full border border-foreground/20 bg-transparent px-11 py-3.5 text-[14px] text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-foreground/45"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-2 flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-foreground/12 pb-0">
        <CategoryTab
          active={category === null}
          label="All"
          count={problems.length}
          onClick={() => setCategory(null)}
        />
        {LIST_CATEGORIES.map((c) => (
          <CategoryTab
            key={c}
            active={category === c}
            label={LIST_CATEGORY_LABEL[c]}
            count={counts[c]}
            onClick={() => setCategory(c)}
          />
        ))}
      </div>

      {/* Subhead — category description or match count */}
      {category ? (
        <p className="mb-6 pt-4 text-xs leading-relaxed text-muted-foreground max-w-2xl">
          {LIST_CATEGORY_DESCRIPTION[category]}
        </p>
      ) : (
        <div className="h-4" />
      )}

      {hasFilter && (
        <p className="mb-4 text-[11px] text-foreground/45">
          {filtered.length} {filtered.length === 1 ? "problem" : "problems"} match
          {query && <> for <span className="text-foreground/65">&ldquo;{query}&rdquo;</span></>}
        </p>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="border border-foreground/20 px-8 py-16 text-center">
          <p className="text-sm text-foreground/55 mb-2">No problems match.</p>
          <p className="text-[12px] text-foreground/35">
            Try shorter keywords like &ldquo;deploy&rdquo;, &ldquo;testflight&rdquo;, &ldquo;burnout&rdquo;.
          </p>
        </div>
      ) : (
        <ol className="border border-foreground/20 overflow-hidden">
          {filtered.map((problem, i) => (
            <li
              key={problem.id}
              id={problem.id}
              className={`relative px-5 sm:px-8 py-8 ${i > 0 ? "border-t border-foreground/[0.08]" : ""}`}
            >
              <div className="flex items-baseline gap-3 sm:gap-4 mb-3">
                <span className="shrink-0 text-[10px] tabular-nums uppercase tracking-widest text-foreground/30 w-8 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base sm:text-[17px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                  {problem.title}
                </h2>
              </div>

              <div className="ml-11 sm:ml-12 max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                    {LIST_CATEGORY_LABEL[problem.category]}
                  </span>
                </div>

                <p className="text-[15px] leading-7 text-foreground/75">
                  {problem.answer}
                </p>

                {problem.articleSlug && (
                  <Link
                    href={`/articles/${problem.articleSlug}`}
                    className="mt-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
                  >
                    Deep dive →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

function CategoryTab({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors ${
        active ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
      }`}
    >
      <span>{label}</span>
      <span className="ml-1.5 tabular-nums text-foreground/30">{count}</span>
      {active && <span className="absolute inset-x-2 -bottom-px h-px bg-foreground" />}
    </button>
  );
}
