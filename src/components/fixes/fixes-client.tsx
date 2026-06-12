"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LIST_CATEGORIES,
  LIST_CATEGORY_LABEL,
  type ListCategory,
  type ListProblem,
} from "@/lib/list-problems";

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
          : "border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
      }`}
    >
      {label}
      <span className={`tabular-nums ${active ? "text-white/70" : "text-[color:var(--ink-faded)]"}`}>{count}</span>
    </button>
  );
}

export function FixesClient({ problems }: { problems: ListProblem[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<ListCategory | "all">("all");
  const q = query.toLowerCase().trim();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: problems.length };
    for (const p of problems) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [problems]);

  const filtered = useMemo(() => {
    const terms = q ? q.split(/\s+/) : [];
    return problems.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (terms.length === 0) return true;
      const hay = `${p.title} ${p.answer} ${LIST_CATEGORY_LABEL[p.category]}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [problems, q, cat]);

  return (
    <div>
      {/* Search */}
      <div className="mb-5 flex items-center gap-2 border-b border-[color:var(--ink-rule)] pb-2">
        <svg
          className="h-4 w-4 shrink-0 text-[color:var(--ink-faded)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          type="text"
          placeholder={`Search ${problems.length} failures…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search failures and fixes"
          className="flex-1 bg-transparent text-body text-[color:var(--ink)] placeholder:text-[color:var(--ink-faded)] focus:outline-none"
        />
        {q && <span className="shrink-0 text-meta tabular-nums">{filtered.length}</span>}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 text-meta hover:text-[color:var(--ink)]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mb-7 flex flex-wrap gap-2">
        <FilterPill label="All" count={counts.all} active={cat === "all"} onClick={() => setCat("all")} />
        {LIST_CATEGORIES.map((c) => (
          <FilterPill
            key={c}
            label={LIST_CATEGORY_LABEL[c]}
            count={counts[c] ?? 0}
            active={cat === c}
            onClick={() => setCat(c)}
          />
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="vp-empty">
          <div aria-hidden className="vp-empty-emoji">🔍</div>
          <p className="vp-empty-title">No failures match “{query}”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="vp-empty-body text-[color:var(--accent)] hover:underline"
          >
            Clear filters →
          </button>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((p) => (
            <li key={p.id}>
              <Link href={`/fixes/${p.id}`} className="group block vp-card-bordered vp-card-hover vp-card-md">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-body font-semibold leading-snug text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--accent)]">
                    {p.title}
                  </h2>
                  <span
                    aria-hidden
                    className="shrink-0 text-label text-[color:var(--ink-faded)] opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>
                <p className="mt-1.5 text-meta line-clamp-2">{p.answer}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="vp-badge-outline vp-badge">{LIST_CATEGORY_LABEL[p.category]}</span>
                  {p.articleSlug && (
                    <span className="vp-badge">
                      <span aria-hidden>📄</span> deep-dive
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
