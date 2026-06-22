"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { AwesomeCategory, AwesomeItem } from "@/lib/awesome-data";

// The 149 tools carry 14 fine-grained categories in the data. That's too many
// filter chips, so we collapse them into 5 broad workflow phases here. The
// underlying data stays untouched — only the filter UI groups them.
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
  let domain = "";
  try {
    domain = new URL(item.href).hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="vp-card-bordered vp-card-hover group flex flex-col gap-3 p-4"
    >
      {/* Category pill — shown on the flat "All" view so each card says where it belongs */}
      {showCategory && (
        <span className="vp-badge self-start">
          <span aria-hidden>{categoryEmoji}</span>
          {categoryTitle}
        </span>
      )}

      {/* Header: logo + name/domain, status chip pinned right */}
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
        {status && (
          <span className={`${status.tone} vp-badge shrink-0`}>{status.label}</span>
        )}
      </div>

      {/* Description — clamped to keep the grid even */}
      <p className="line-clamp-2 text-body text-[color:var(--ink-soft)]">{item.description}</p>

      {/* Footer: tags + the view action */}
      <div className="mt-auto flex items-center gap-1.5 border-t border-[color:var(--ink-rule)] pt-3">
        {item.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="vp-badge-outline vp-badge">{tag}</span>
        ))}
        <span className="ml-auto shrink-0 text-label font-medium text-[color:var(--ink-soft)] group-hover:text-[color:var(--accent)]">
          Visit ↗
        </span>
      </div>
    </a>
  );
}

/* Notion-style database filter chip — mirrors the Articles page so the two
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

export function AwesomeClient({ categories }: { categories: readonly AwesomeCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<GroupKey | null>(null);
  const q = query.toLowerCase().trim();

  const total = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    [categories]
  );

  const groupCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of categories) {
      const g = groupOf(cat.slug);
      c[g] = (c[g] ?? 0) + cat.items.length;
    }
    return c;
  }, [categories]);

  const filtered = useMemo(() => {
    const terms = q ? q.split(/\s+/) : [];
    return categories
      .filter((cat) => !activeGroup || groupOf(cat.slug) === activeGroup)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          if (!terms.length) return true;
          const searchable =
            `${item.name} ${item.description} ${item.tags.join(" ")} ${cat.title}`.toLowerCase();
          return terms.every((term) => searchable.includes(term));
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, q, activeGroup]);

  return (
    <div>
      {/* Category chip filter — 5 broad workflow phases, same row style as Articles */}
      <div className="mb-3 flex flex-wrap gap-1">
        <CategoryChip
          active={activeGroup === null}
          label="All"
          count={total}
          onClick={() => setActiveGroup(null)}
        />
        {GROUPS.map((g) => (
          <CategoryChip
            key={g.key}
            active={activeGroup === g.key}
            label={g.title}
            count={groupCounts[g.key] ?? 0}
            onClick={() => setActiveGroup(g.key)}
          />
        ))}
      </div>

      {/* Search — a real bordered field with a leading magnifier */}
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
              setActiveGroup(null);
            }}
            className="vp-empty-body text-[color:var(--accent)] hover:underline"
          >
            Clear filters →
          </button>
        </div>
      ) : (
        // Flat grid — no category sections. Each card carries its own phase pill.
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.flatMap((cat) => {
            const group = GROUP_META[groupOf(cat.slug)];
            return cat.items.map((item) => (
              <ToolCard
                key={`${cat.slug}-${item.href}`}
                item={item}
                categoryEmoji={group.emoji}
                categoryTitle={group.title}
                showCategory={activeGroup === null}
              />
            ));
          })}
        </div>
      )}
    </div>
  );
}
