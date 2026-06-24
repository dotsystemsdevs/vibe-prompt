"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwesomeCategory, AwesomeItem } from "@/lib/awesome-data";

// The 149 tools carry 14 fine-grained categories in the data. That's too many
// filter chips, so we collapse them into 5 broad workflow phases here. The
// underlying data stays untouched, only the filter UI groups them.
type GroupKey = "plan" | "setup" | "build" | "ship" | "grow";

const GROUPS: { key: GroupKey; emoji: string; title: string }[] = [
  { key: "plan", emoji: "📋", title: "Plan" },
  { key: "setup", emoji: "⚙️", title: "Setup" },
  { key: "build", emoji: "🛠️", title: "Build" },
  { key: "ship", emoji: "🚀", title: "Ship" },
  { key: "grow", emoji: "📈", title: "Grow" },
];

const GROUP_BY_SLUG: Record<string, GroupKey> = {
  "research-validate": "plan",
  "prd-spec": "plan",
  "setup": "setup",
  "architecture-stack": "setup",
  "agent-setup": "setup",
  "build-ship": "build",
  "prompting-craft": "build",
  "backend": "build",
  "auth": "build",
  "testing-quality": "ship",
  "launch-growth": "ship",
  "monetization": "grow",
  "email": "grow",
  "ops-maintenance": "grow",
};

const GROUP_META = Object.fromEntries(GROUPS.map((g) => [g.key, g])) as Record<
  GroupKey,
  { key: GroupKey; emoji: string; title: string }
>;

function groupOf(slug: string): GroupKey {
  return GROUP_BY_SLUG[slug] ?? "build";
}

function Favicon({ href, emoji, size = 20 }: { href: string; emoji: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  let domain = "";
  try {
    domain = new URL(href).hostname;
  } catch {
    return <span className="leading-none" style={{ fontSize: size - 2 }}>{emoji}</span>;
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

/* Surface a status-style chip from the tags, mirroring the Active/Available
   badge in marketplace UIs. Free and open-source rank first per the house rules. */
function pricing(tags: readonly string[]): { label: string; tone: string } | null {
  if (tags.includes("free") || tags.includes("open-source")) {
    return { label: "Free", tone: "vp-badge-success" };
  }
  if (tags.includes("free-tier")) return { label: "Freemium", tone: "vp-badge-outline" };
  if (tags.includes("paid")) return { label: "Paid", tone: "vp-badge" };
  return null;
}

function ToolCard({
  item,
  categoryEmoji,
  categoryTitle,
  showCategory,
}: {
  item: AwesomeItem;
  categoryEmoji: string;
  categoryTitle: string;
  showCategory: boolean;
}) {
  const status = pricing(item.tags);
  const [copied, setCopied] = useState(false);
  let domain = "";
  try {
    domain = new URL(item.href).hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(item.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="vp-card-bordered vp-card-hover group relative flex flex-col gap-3 p-4">
      {/* Category pill, shown on the flat "All" view so each card says where it belongs */}
      {showCategory && (
        <span className="vp-badge self-start">
          <span aria-hidden>{categoryEmoji}</span>
          {categoryTitle}
        </span>
      )}

      {/* Header: logo + name/domain */}
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
          <Favicon href={item.href} emoji={categoryEmoji} size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-body font-semibold text-[color:var(--ink)]">
            {item.name}
          </div>
          {domain && (
            <div className="truncate text-meta text-[color:var(--ink-faded)]">{domain}</div>
          )}
        </div>
      </div>

      {/* Description, clamped to keep the grid even */}
      <p className="line-clamp-2 text-body text-[color:var(--ink-soft)]">{item.description}</p>

      {/* Footer: price chip + copy link + visit */}
      <div className="mt-auto flex items-center gap-2 border-t border-[color:var(--ink-rule)] pt-3">
        {status && <span className={`${status.tone} vp-badge`}>{status.label}</span>}
        <div className="relative z-10 ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void copyLink();
            }}
            aria-label={copied ? "Copied" : `Copy ${item.name} link`}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--ink-rule)] text-[color:var(--ink-faded)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={copied ? "text-[color:var(--accent)]" : ""}>
              {copied ? (
                <path d="M20 6 9 17l-5-5" />
              ) : (
                <>
                  <rect x="9" y="9" width="11" height="11" rx="1.5" />
                  <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
                </>
              )}
            </svg>
          </button>
          <span className="text-label font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
            Visit ↗
          </span>
        </div>
      </div>

      {/* Whole-card link, sits under the copy button (z-10) */}
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${item.name}`}
        className="absolute inset-0"
      />
    </div>
  );
}

/* Notion-style database filter chip, mirrors the Articles page so the two
   pages read as one product. */
function CategoryChip({
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
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-meta transition-colors ${
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)] font-medium"
          : "border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
      }`}
    >
      <span>{label}</span>
      <span className="text-[color:var(--ink-faded)] tabular-nums">{count}</span>
    </button>
  );
}

export function AwesomeClient({ categories }: { categories: readonly AwesomeCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const q = query.toLowerCase().trim();

  const total = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    [categories]
  );

  // Filter by tag instead of cookbook phase. Count every tag and surface the
  // most common ones as chips (free, open-source, ai, paid, ...).
  const tagCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of categories)
      for (const item of cat.items)
        for (const tag of item.tags) c[tag] = (c[tag] ?? 0) + 1;
    return c;
  }, [categories]);

  const topTags = useMemo(
    () => Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 16).map(([tag]) => tag),
    [tagCounts]
  );

  const filtered = useMemo(() => {
    const terms = q ? q.split(/\s+/) : [];
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          if (activeTag && !item.tags.includes(activeTag)) return false;
          if (!terms.length) return true;
          const searchable =
            `${item.name} ${item.description} ${item.tags.join(" ")} ${cat.title}`.toLowerCase();
          return terms.every((term) => searchable.includes(term));
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, q, activeTag]);

  return (
    <div>
      {/* Tag filter, the most common tags across all tools */}
      <div className="mb-3 flex flex-wrap gap-2">
        <CategoryChip
          active={activeTag === null}
          label="All"
          count={total}
          onClick={() => setActiveTag(null)}
        />
        {topTags.map((tag) => (
          <CategoryChip
            key={tag}
            active={activeTag === tag}
            label={tag}
            count={tagCounts[tag] ?? 0}
            onClick={() => setActiveTag(tag)}
          />
        ))}
      </div>

      {/* Search, a real bordered field with a leading magnifier */}
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
          placeholder={`Search ${total} tools…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tools and resources"
          className="vp-input vp-input-search"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-meta text-[color:var(--ink-faded)] hover:text-[color:var(--ink)]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="vp-empty">
          <div aria-hidden className="vp-empty-emoji">🔍</div>
          <p className="vp-empty-title">No tools match here.</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="vp-empty-body text-[color:var(--accent)] hover:underline"
          >
            Clear filters →
          </button>
        </div>
      ) : (
        // Flat grid, no category sections. Each card carries its own phase pill.
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.flatMap((cat) => {
            const group = GROUP_META[groupOf(cat.slug)];
            return cat.items.map((item) => (
              <ToolCard
                key={`${cat.slug}-${item.href}`}
                item={item}
                categoryEmoji={group.emoji}
                categoryTitle={group.title}
                showCategory
              />
            ));
          })}
        </div>
      )}
    </div>
  );
}
