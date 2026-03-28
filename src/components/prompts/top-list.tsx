"use client";

import Link from "next/link";
import { useState } from "react";
import { Prompt } from "@/lib/types";
import { CATEGORY_COLOR_MAP } from "@/lib/categories";

const tabs = ["Today", "Week", "Year"] as const;
type Tab = (typeof tabs)[number];

const multipliers: Record<Tab, number> = { Today: 0.15, Week: 0.6, Year: 1 };

interface TopListProps {
  prompts: Prompt[];
}

export function TopList({ prompts }: TopListProps) {
  const [active, setActive] = useState<Tab>("Week");

  const sorted = [...prompts]
    .map((p) => ({ ...p, score: Math.round(p.upvotes * multipliers[active]) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Top prompts</span>
        <div className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1 text-xs transition-colors ${
                active === t
                  ? "border border-foreground bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div>
        {sorted.map((p, i) => (
          <Link
            key={p.slug}
            href={`/prompts/${p.slug}`}
            className="group flex items-center gap-6 border-b border-border px-6 py-4 transition-colors hover:bg-card"
          >
            <span className="w-6 shrink-0 text-xs text-muted-foreground tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-1">
                {p.title}
              </span>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR_MAP[p.category] ?? "#6b7280" }} />
              {p.categoryName}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {p.score} ↑
            </span>
            <span className="shrink-0 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
