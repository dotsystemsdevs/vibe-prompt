"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LIST_CATEGORIES,
  LIST_CATEGORY_LABEL,
  type ListCategory,
  type ListProblem,
} from "@/lib/list-problems";

// Recently added fixes get a NEW badge. Edit this set to curate what's flagged.
const NEW_FIXES = new Set<string>([
  "ai-code-security-holes",
  "cold-start-slow",
  "five-stars-three-reviews",
]);

const FAVS_KEY = "vibeprompt-fix-favs";

// A muted color + its own icon per category, so the grid reads as lively and
// varied (like the reference), not flat. Colors reuse the original page-accent
// tones (collapsed to ink elsewhere on the site).
const CAT_STYLE: Record<ListCategory, { color: string; soft: string; icon: ReactNode }> = {
  build: {
    color: "#3A3D45",
    soft: "rgba(0,0,0,0.06)",
    icon: (
      <>
        <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
        <path d="m3 8 9 5 9-5" />
        <path d="M12 13v8" />
      </>
    ),
  },
  ship: {
    color: "#3A3D45",
    soft: "rgba(0,0,0,0.06)",
    icon: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4z" />
      </>
    ),
  },
  grow: {
    color: "#3A3D45",
    soft: "rgba(0,0,0,0.06)",
    icon: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </>
    ),
  },
  earn: {
    color: "#3A3D45",
    soft: "rgba(0,0,0,0.06)",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.3a2.5 2.5 0 0 0-2.5-1.3c-1.4 0-2.5.8-2.5 1.9s1.1 1.9 2.5 1.9 2.5.8 2.5 1.9-1.1 1.9-2.5 1.9A2.5 2.5 0 0 1 9.5 14.7" />
        <path d="M12 6v12" />
      </>
    ),
  },
  stay: {
    color: "#3A3D45",
    soft: "rgba(0,0,0,0.06)",
    icon: <path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6z" />,
  },
};

// Render the answer with `inline code` spans styled, so the solution reads well
// directly on the card instead of behind a click.
function renderAnswer(text: string): ReactNode[] {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-[color:var(--paper-soft)] px-1 py-0.5 font-mono text-[0.85em] text-[color:var(--ink)]"
      >
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon?: ReactNode;
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
      {icon}
      <span>{label}</span>
      <span className="text-[color:var(--ink-faded)] tabular-nums">{count}</span>
    </button>
  );
}

export function FixesClient({ problems }: { problems: ListProblem[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<ListCategory | "all">("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const q = query.toLowerCase().trim();

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(FAVS_KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {}
  }, []);

  function toggleFav(id: string) {
    setFavs((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const favCount = mounted ? Object.values(favs).filter(Boolean).length : 0;

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: problems.length };
    for (const p of problems) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [problems]);

  const filtered = useMemo(() => {
    const terms = q ? q.split(/\s+/) : [];
    return problems.filter((p) => {
      if (savedOnly && !favs[p.id]) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (terms.length === 0) return true;
      const hay = `${p.title} ${p.answer} ${LIST_CATEGORY_LABEL[p.category]}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [problems, q, cat, savedOnly, favs]);

  return (
    <div>
      {/* Category filter, same row style as Awesome / Articles */}
      <div className="mb-3 flex flex-wrap gap-1">
        <FilterPill label="All" count={counts.all} active={cat === "all" && !savedOnly} onClick={() => { setCat("all"); setSavedOnly(false); }} />
        <FilterPill
          label="Saved"
          count={favCount}
          active={savedOnly}
          onClick={() => setSavedOnly((v) => !v)}
          icon={
            <svg width="12" height="12" viewBox="0 0 24 24" fill={savedOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
            </svg>
          }
        />
        {LIST_CATEGORIES.map((c) => (
          <FilterPill
            key={c}
            label={LIST_CATEGORY_LABEL[c]}
            count={counts[c] ?? 0}
            active={cat === c && !savedOnly}
            onClick={() => { setCat(c); setSavedOnly(false); }}
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
          <div aria-hidden className="vp-empty-emoji">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[color:var(--ink-faded)]">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </div>
          {savedOnly && favCount === 0 ? (
            <>
              <p className="vp-empty-title">No saved fixes yet.</p>
              <p className="vp-empty-body">Tap the star on any card to save it for later.</p>
            </>
          ) : (
            <>
              <p className="vp-empty-title">No failures match “{query}”.</p>
              <p className="vp-empty-body">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCat("all");
                    setSavedOnly(false);
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
            </>
          )}
        </div>
      ) : (
        // One card per fix: Problem on the left, Solution on the right, so the
        // answer is readable at a glance without clicking through.
        <ul className="space-y-3">
          {filtered.map((p) => {
            const s = CAT_STYLE[p.category];
            const isFav = mounted && !!favs[p.id];
            const isNewFix = NEW_FIXES.has(p.id);
            return (
              <li key={p.id}>
                <div className="vp-card-bordered group relative grid gap-x-6 gap-y-3 p-5 transition-colors hover:border-[color:var(--ink-soft)] sm:grid-cols-[minmax(0,15rem)_1fr]">
                  {/* Save star, pinned to the card corner */}
                  <button
                    type="button"
                    onClick={() => toggleFav(p.id)}
                    aria-label={isFav ? "Remove from saved" : "Save this fix"}
                    aria-pressed={isFav}
                    className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-[color:var(--ink-faded)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "#E5A100" : "none"} stroke={isFav ? "#E5A100" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                    </svg>
                  </button>

                  {/* Problem */}
                  <div className="flex items-start gap-3 pr-8 sm:pr-0">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: s.soft, color: s.color }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {s.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: s.color }}>
                          {LIST_CATEGORY_LABEL[p.category]}
                        </span>
                        {isNewFix && (
                          <span className="rounded bg-[color:var(--accent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                            New
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/fixes/${p.id}`}
                        className="text-[15px] font-semibold leading-snug text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
                      >
                        {p.title}
                      </Link>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="min-w-0 pr-8 sm:border-l sm:border-[color:var(--ink-rule)] sm:pl-6 sm:pr-0">
                    <p className="text-body leading-relaxed text-[color:var(--ink-soft)]">
                      {renderAnswer(p.answer)}
                    </p>
                    <Link
                      href={`/fixes/${p.id}`}
                      className="mt-3 inline-flex items-center gap-1 text-meta font-medium text-[color:var(--ink-faded)] transition-colors hover:text-[color:var(--accent)]"
                    >
                      Copy the prompt <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}

          {/* Submit a missing fix */}
          <li>
            <Link
              href="/submit-fix"
              className="group flex items-center justify-center gap-2.5 rounded-[var(--radius-lg)] border border-dashed border-[color:var(--ink-rule)] p-4 text-center transition-colors hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-[color:var(--ink-rule)] text-[16px] leading-none text-[color:var(--ink-faded)] transition-colors group-hover:border-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]">
                +
              </span>
              <span className="text-[13px] font-medium text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink)]">
                Submit a fix that&rsquo;s missing
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
