import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found · vibeprompt",
  description: "The page you're looking for doesn't exist. Try the workflow, prompts, or articles instead.",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  {
    href: "/workflow",
    label: "The 10-step workflow",
    description: "From raw idea to shipped. Interactive checklists, save your progress.",
  },
  {
    href: "/articles",
    label: "Deep-dive articles & fixes",
    description: "TestFlight, ASO, conversion, vibe coding mistakes. Common problems and the tactical answer for each.",
  },
  {
    href: "/awesome",
    label: "Tools & resources",
    description: "MCP servers, agents, CLIs, no affiliates.",
  },
  {
    href: "/built-with",
    label: "Built with vibeprompt",
    description: "Indie apps shipped end to end with the workflow.",
  },
];

export default function NotFound() {
  return (
    <main>
      <div className="page-shell">
        <div aria-hidden className="page-emoji">🧭</div>
        <h1 className="page-title">Page not found.</h1>
        <p className="page-lede">
          That URL doesn&apos;t lead anywhere. The page was renamed, deleted, or never existed. Try one of these instead:
        </p>

        <ul className="mt-12 divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-body font-semibold text-[color:var(--ink)]">
                    {s.label}
                  </p>
                  <p className="mt-1 text-meta">
                    {s.description}
                  </p>
                </div>
                <span aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink)]">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
