import type { SiteStats } from "@/lib/site-stats";

/** Authority layer, the "battle-tested" proof numbers, one consistent row. */
export function StatsRow({ stats }: { stats: SiteStats }) {
  const items = [
    { n: stats.fixes, label: "field-tested fixes" },
    { n: stats.prompts, label: "battle-tested prompts" },
    { n: stats.articles, label: "deep-dive articles" },
    { n: stats.tools, label: "curated AI tools" },
    { n: stats.apps, label: "shipped apps as proof" },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((it) => (
        <div key={it.label} className="vp-card vp-fill vp-card-tight">
          <dt className="sr-only">{it.label}</dt>
          <dd className="text-[26px] font-bold leading-none tracking-tight text-[color:var(--ink)] tabular-nums">
            {it.n}
          </dd>
          <p className="text-meta mt-1.5">{it.label}</p>
        </div>
      ))}
    </dl>
  );
}
