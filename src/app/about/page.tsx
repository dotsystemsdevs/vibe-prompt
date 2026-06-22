import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

const FEATURES = [
  { emoji: "✍️", title: "Prompts", desc: "Planning, building, debugging, polishing." },
  { emoji: "🔄", title: "Workflow", desc: "10 stages from idea to shipped." },
  { emoji: "📄", title: "Templates", desc: "AGENTS.md, PRD, plan, MEMORY." },
];

const CONTACTS = [
  {
    href: "https://github.com/dotsystemsdevs/vibe-prompt",
    label: "Open source on GitHub",
    description: "Star it, fork it, or browse the code.",
    external: true,
  },
  {
    href: "https://github.com/dotsystemsdevs/vibe-prompt/issues",
    label: "GitHub Issues",
    description: "Bugs, feature requests, and feedback.",
    external: true,
  },
  {
    href: "mailto:dot.systems@proton.me",
    label: "dot.systems@proton.me",
    description: "Private questions.",
    external: false,
  },
];

export const metadata: Metadata = {
  title: "About | vibeprompt",
  description: "vibeprompt is an open-source prompt library and toolkit for vibe coders who ship.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="">
      <div className="page-shell">
        <PageHeader
          icon="info"
          title="Built for builders who ship."
          lede="vibeprompt is an open-source toolkit for vibe coders, builders who use AI to go from idea to prototype to shipped product. Use the prompts, follow the workflow, and keep momentum."
        />

        <div className="mt-10 space-y-9">

          {/* What it is */}
          <section>
            <h2 className="section-title flex items-center gap-2.5">
              <span aria-hidden className="text-[22px] leading-none">📦</span>
              What it is
            </h2>
            <p className="mt-3 text-body-lg">
              A starter pack for building with AI: a prompt library you can copy-paste, plus a workflow
              you can follow when you want to move fast without losing quality.
            </p>
            <p className="mt-3 text-body-lg">
              The goal is simple: reduce blank-page time, keep scope tight, and help you finish the
              last 10% instead of getting stuck iterating forever.
            </p>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((f) => (
                <li
                  key={f.title}
                  className="vp-card vp-fill vp-card-tight flex items-start gap-3"
                >
                  <span aria-hidden className="shrink-0 text-[18px] leading-none mt-0.5">{f.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-body font-semibold text-[color:var(--ink)]">{f.title}</p>
                    <p className="text-body mt-0.5">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-body">
              Got questions?{" "}
              <Link href="/faq" className="vp-link">
                See the FAQ →
              </Link>
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="section-title flex items-center gap-2.5">
              <span aria-hidden className="text-[22px] leading-none">✉️</span>
              Contact
            </h2>
            <p className="mt-3 text-body-lg">
              Feedback, bugs, or ideas: GitHub issues for anything public, email for private questions.
            </p>
            <ul className="mt-4">
              {CONTACTS.map((c) => (
                <li key={c.href} className="border-b border-[color:var(--ink-rule)] last:border-0">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-[color:var(--paper-soft)] -mx-3 px-3 rounded-md"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-medium text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">{c.label}</p>
                      <p className="text-meta mt-0.5">{c.description}</p>
                    </div>
                    <span
                      aria-hidden
                      className="shrink-0 text-[color:var(--ink-faded)] group-hover:text-[color:var(--accent)] transition-colors"
                    >
                      {c.external ? "↗" : "→"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
