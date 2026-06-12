"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwesomeCategory } from "@/lib/awesome-data";

function Favicon({ href, emoji, size = 16 }: { href: string; emoji: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  let domain = "";
  try {
    domain = new URL(href).hostname;
  } catch {
    return <span className="text-[14px] leading-none">{emoji}</span>;
  }

  if (failed) return <span style={{ fontSize: size - 2 }} className="leading-none">{emoji}</span>;

  return (
    <Image
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-sm"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

export function AwesomeClient({ categories }: { categories: readonly AwesomeCategory[] }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const total = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    [categories]
  );

  const filtered = useMemo(() => {
    if (!q) return categories;
    const terms = q.split(/\s+/);
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const searchable =
            `${item.name} ${item.description} ${item.tags.join(" ")} ${cat.title}`.toLowerCase();
          return terms.every((term) => searchable.includes(term));
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, q]);

  const shown = filtered.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div>
      {/* Minimal search — a single quiet input, no database chrome */}
      <div className="mb-8 flex items-center gap-2 border-b border-[color:var(--ink-rule)] pb-2">
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
          placeholder={`Search ${total} tools…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tools and resources"
          className="flex-1 bg-transparent text-body text-[color:var(--ink)] placeholder:text-[color:var(--ink-faded)] focus:outline-none"
        />
        {q && (
          <span className="shrink-0 text-meta tabular-nums">
            {shown} of {total}
          </span>
        )}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="shrink-0 text-meta hover:text-[color:var(--ink)]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="vp-empty">
          <div aria-hidden className="vp-empty-emoji">🔍</div>
          <p className="vp-empty-title">No tools match “{query}”.</p>
          <button
            onClick={() => setQuery("")}
            className="vp-empty-body text-[color:var(--accent)] hover:underline"
          >
            Clear search →
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filtered.map((cat) => (
            <section key={cat.slug}>
              <h2 className="section-title flex items-baseline gap-2 border-b border-[color:var(--ink-rule)] pb-2">
                <span aria-hidden className="text-headline">{cat.emoji}</span>
                <span>{cat.title}</span>
                <span className="ml-auto text-meta font-normal tabular-nums">
                  {cat.items.length}
                </span>
              </h2>

              <ul className="mt-3 space-y-0.5">
                {cat.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-[color:var(--sidebar-hover)]"
                    >
                      <Favicon href={item.href} emoji={cat.emoji} size={16} />
                      <span className="shrink-0 text-body font-medium text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)] group-hover:underline">
                        {item.name}
                      </span>
                      <span className="hidden flex-1 truncate text-body text-[color:var(--ink-faded)] sm:block">
                        {item.description}
                      </span>
                      <span className="ml-auto hidden shrink-0 gap-1.5 sm:flex">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="vp-badge-outline vp-badge">{tag}</span>
                        ))}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-label text-[color:var(--ink-faded)] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
