import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Compare: vibeprompt vs the tools and the books",
  description:
    "A table comparing vibeprompt against the major vibe coding tools (Cursor, Claude Code, Replit, Lovable, Bolt, v0, Windsurf, Aider) and the published vibe coding books. No affiliate links.",
  alternates: { canonical: "/compare" },
  keywords:
    "vibe coding tools, replit vs cursor, lovable vs bolt, claude code, cursor alternative, ai coding tool comparison, vibe coding books, indie hacker tools 2026",
  openGraph: {
    title: "Compare — vibeprompt vs the tools and the books",
    description: "One table: how vibeprompt fits alongside the major tools and the published books. No affiliate links.",
    url: "https://vibeprompt.tech/compare",
  },
};

type Row = {
  name: string;
  favicon?: string;
  emoji?: string;
  type: string;
  pricing: string;
  bestFor: string;
  caveat: string;
  url?: string;
  you?: boolean;
};

function faviconFor(url: string): string {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
  } catch {
    return "/favicon.svg";
  }
}

const ROWS: Row[] = [
  { name: "vibeprompt", favicon: "/favicon.svg", type: "Methodology", pricing: "Free, MIT", bestFor: "What to prompt, in what order, how to fix it", caveat: "Doesn't write code — makes other tools write better", you: true },
  { name: "Claude Code", url: "https://www.anthropic.com/claude-code", type: "CLI agent", pricing: "Pay per use", bestFor: "Existing repos, real engineering, multi-step tasks", caveat: "Terminal scares non-devs; loves AGENTS.md context" },
  { name: "Cursor", url: "https://cursor.com", type: "IDE", pricing: "$20/mo", bestFor: "VS Code devs who want AI inline", caveat: "Easy to overuse inline edits → messy code" },
  { name: "Windsurf", url: "https://windsurf.com", type: "IDE", pricing: "$15/mo", bestFor: "Cursor alt with a different agent loop", caveat: "Similar trade-offs; pick on UX" },
  { name: "Replit", url: "https://replit.com", type: "App builder", pricing: "Free, $20/mo", bestFor: "Non-devs building apps, hosting + DB included", caveat: "Vendor lock-in; best for prototypes" },
  { name: "Lovable", url: "https://lovable.dev", type: "App builder", pricing: "Free, $20+/mo", bestFor: "Landing pages / simple full-stack from chat", caveat: "Great first 80%, painful last 20%" },
  { name: "Bolt.new", url: "https://bolt.new", type: "App builder", pricing: "Free, $20+/mo", bestFor: "Quick prototypes you can export", caveat: "Exportable, but you own maintenance" },
  { name: "v0.dev", url: "https://v0.dev", type: "UI generator", pricing: "Free, $20/mo", bestFor: "One-off UI components (shadcn/Tailwind)", caveat: "UI only; pair with a backend tool" },
  { name: "Aider", url: "https://aider.chat", type: "CLI agent", pricing: "Free, BYO key", bestFor: "Full control, any model, local", caveat: "More config; for tinkerers" },
  { name: "Vibe Coding (Gene Kim & Steve Yegge)", emoji: "📗", type: "Book", pricing: "~$30", bestFor: "Eng leaders, enterprise rollout (Amodei foreword)", caveat: "Frozen at print date" },
  { name: "Vibe Coding Bible (Tom Smykowski)", emoji: "📘", type: "Book", pricing: "Paid", bestFor: "Engineers going AI-first; the mindset shift", caveat: "Static after release; ~459 pages" },
];

const cell = "border border-[color:var(--ink-rule)] px-3 py-3 align-top";
const headCell =
  "border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-3 py-3 text-label";

export default function ComparePage() {
  return (
    <main className="">
      <div className="page-shell-wide">

        {/* Page header */}
        <PageHeader
          emoji="⚖️"
          accent="orange"
          title="Compare"
          lede={
            <>
              Everything next to vibeprompt, the tools and the books, on the same axes. vibeprompt is the
              methodology and prompt library you use <em>with</em> any of them. No affiliate links.
            </>
          }
        />

        <Reveal>
          <div className="mt-10">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr>
                  {([["Name", "w-[20%]"], ["Type", "w-[13%]"], ["Pricing", "w-[14%]"], ["Best for", "w-[28%]"], ["Caveat", "w-[25%]"]] as const).map(([h, w]) => (
                    <th key={h} className={`${headCell} ${w}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name} className={r.you ? "bg-[color:var(--paper-soft)]" : ""}>
                    <td className={cell}>
                      <div className="flex items-center gap-2">
                        {r.favicon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.favicon} alt="" width={18} height={18} className="shrink-0 rounded-sm" />
                        ) : r.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={faviconFor(r.url)} alt="" width={18} height={18} loading="lazy" className="shrink-0 rounded-sm" />
                        ) : (
                          <span aria-hidden className="shrink-0 text-[16px] leading-none">{r.emoji}</span>
                        )}
                        <div className="min-w-0">
                          <div className="text-body font-semibold text-[color:var(--ink)]">{r.name}</div>
                          {r.you ? (
                            <span className="text-meta font-medium text-[color:var(--accent)]">You are here</span>
                          ) : r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-meta text-[color:var(--ink-faded)] transition-colors hover:text-[color:var(--accent)]"
                            >
                              Visit ↗
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className={`${cell} text-body`}>{r.type}</td>
                    <td className={`${cell} text-body`}>{r.pricing}</td>
                    <td className={`${cell} text-body`}>{r.bestFor}</td>
                    <td className={`${cell} text-body text-[color:var(--ink-faded)]`}>{r.caveat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

export const revalidate = 3600;
