"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  LIST_CATEGORIES,
  LIST_CATEGORY_LABEL,
  type ListCategory,
  type ListProblem,
} from "@/lib/list-problems";

// A muted color + its own icon per category, so the grid reads as lively and
// varied (like the reference), not flat. Colors reuse the original page-accent
// tones (collapsed to ink elsewhere on the site).
const CAT_STYLE: Record<ListCategory, { color: string; soft: string; icon: ReactNode }> = {
  build: {
    color: "#355E97",
    soft: "rgba(53,94,151,0.10)",
    icon: (
      <>
        <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
        <path d="m3 8 9 5 9-5" />
        <path d="M12 13v8" />
      </>
    ),
  },
  ship: {
    color: "#2C724B",
    soft: "rgba(44,114,75,0.10)",
    icon: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4z" />
      </>
    ),
  },
  grow: {
    color: "#5F4C97",
    soft: "rgba(95,76,151,0.10)",
    icon: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </>
    ),
  },
  earn: {
    color: "#946A14",
    soft: "rgba(148,106,20,0.12)",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.3a2.5 2.5 0 0 0-2.5-1.3c-1.4 0-2.5.8-2.5 1.9s1.1 1.9 2.5 1.9 2.5.8 2.5 1.9-1.1 1.9-2.5 1.9A2.5 2.5 0 0 1 9.5 14.7" />
        <path d="M12 6v12" />
      </>
    ),
  },
  stay: {
    color: "#A23B3B",
    soft: "rgba(162,59,59,0.10)",
    icon: <path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6z" />,
  },
};

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
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-meta transition-colors ${
        active
          ? "bg-[color:var(--sidebar-active)] text-[color:var(--ink)] font-medium"
          : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
      }`}
    >
      <span>{label}</span>
      <span className="text-[color:var(--ink-faded)] tabular-nums">{count}</span>
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
      {/* Category filter, same row style as Awesome / Articles */}
      <div className="mb-3 flex flex-wrap gap-1">
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

      {/* Search, same bordered field as the Awesome page */}
      <div className="relative mb-8">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--ink-faded)]"
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
          className="vp-input vp-input-search"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-meta text-[color:var(--ink-faded)] hover:text-[color:var(--ink)]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="vp-empty">
          <div aria-hidden className="vp-empty-emoji">🔍</div>
          <p className="vp-empty-title">No failures match “{query}”.</p>
          <p className="vp-empty-body">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCat("all");
              }}
              className="text-[color:var(--accent)] hover:underline"
            >
              Clear filters
            </button>{" "}
            or{" "}
            <Link href="/submit-fix" className="text-[color:var(--accent)] hover:underline">
              submit this fix →
            </Link>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const s = CAT_STYLE[p.category];
            return (
              <li key={p.id}>
                <Link
                  href={`/fixes/${p.id}`}
                  className="vp-card-bordered group flex h-full flex-col p-5 transition-colors hover:border-[color:var(--ink-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundColor: s.soft, color: s.color }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {s.icon}
                      </svg>
                    </span>
                    <span
                      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                      style={{ color: s.color, backgroundColor: s.soft }}
                    >
                      {LIST_CATEGORY_LABEL[p.category]}
                    </span>
                  </div>
                  <h2 className="mt-4 line-clamp-3 text-[15px] font-semibold leading-snug text-[color:var(--ink)]">
                    {p.title}
                  </h2>
                  <div className="mt-auto flex items-center justify-between border-t border-[color:var(--ink-rule)] pt-3">
                    <span className="text-label">Read the fix</span>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--ink-rule)] text-[14px] text-[color:var(--ink-faded)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}

          {/* Ghost card, submit a missing fix */}
          <li>
            <Link
              href="/submit-fix"
              className="group flex h-full min-h-[160px] flex-col items-center justify-center gap-2.5 rounded-[var(--radius-lg)] border border-dashed border-[color:var(--ink-rule)] p-5 text-center transition-colors hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-[color:var(--ink-rule)] text-[18px] leading-none text-[color:var(--ink-faded)] transition-colors group-hover:border-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]">
                +
              </span>
              <span className="text-[13px] font-medium text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink)]">
                Submit a fix
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
