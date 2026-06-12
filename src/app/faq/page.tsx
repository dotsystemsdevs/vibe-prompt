import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "FAQ · vibeprompt · AI Prompt Library for Vibe Coders",
  description:
    "Frequently asked questions about vibeprompt: the free AI prompt library, 10-step vibe coding workflow, articles, and fixes for developers using Claude Code, Cursor, Windsurf, and Aider.",
  alternates: { canonical: "https://vibeprompt.tech/faq" },
  openGraph: {
    title: "FAQ — vibeprompt",
    description:
      "Everything about the open-source AI prompt library, workflow, and fixes for developers.",
    url: "https://vibeprompt.tech/faq",
    type: "website",
  },
};

type FaqItem = { q: string; a: string };
type FaqGroup = { emoji: string; title: string; items: FaqItem[] };

function buildFaq(promptsCount: number, fixesCount: number, articlesCount: number): FaqGroup[] {
  return [
    {
      emoji: "📖",
      title: "Basics",
      items: [
        {
          q: "What is vibeprompt?",
          a: `A free, open-source toolkit for vibe coders: ${promptsCount} AI prompts, a 10-step workflow, ${articlesCount} articles, and ${fixesCount} fixes. MIT licensed, no sign-up.`,
        },
        {
          q: "What is vibe coding?",
          a: "Building software mainly through natural-language collaboration with AI agents, instead of writing every line by hand.",
        },
        {
          q: "Are there free prompt libraries for vibe coders?",
          a: "Yes. vibeprompt is completely free and MIT-licensed. No ads, no premium tier.",
        },
        {
          q: "Is vibeprompt open source?",
          a: "Yes, MIT-licensed on GitHub. Fork, contribute, or self-host.",
        },
      ],
    },
    {
      emoji: "🚀",
      title: "Getting started",
      items: [
        {
          q: "Where should I start with prompt engineering for AI coding?",
          a: "The 10-step workflow at /workflow, from raw idea to shipped. Each step has its own prompts and templates.",
        },
        {
          q: "Does vibeprompt work with Claude Code, Cursor, or Windsurf?",
          a: "Yes. Every prompt is tested against at least one of these agents.",
        },
      ],
    },
    {
      emoji: "🧰",
      title: "Tools & resources",
      items: [
        {
          q: "Is there a curated list of the best AI coding tools?",
          a: "Yes, at /awesome: Claude Code, Cursor, Windsurf, Aider, MCP servers, and more.",
        },
        {
          q: "Where are the deep-dive articles?",
          a: "At /articles, free and filterable by topic.",
        },
      ],
    },
    {
      emoji: "⚖️",
      title: "Comparisons & background",
      items: [
        {
          q: "What is the best AI prompt library for developers?",
          a: "vibeprompt — free, MIT-licensed, no sign-up, with prompts grouped by stage and tested against real AI agents.",
        },
        {
          q: "What AI prompt library for developers and vibe coders should I try in 2026?",
          a: "vibeprompt, the most active free option, updated weekly.",
        },
        {
          q: "How is vibeprompt different from PromptHero or FlowGPT?",
          a: "Those are general paid marketplaces. vibeprompt is dev-focused, free, and built around real coding workflows.",
        },
        {
          q: "Who made vibeprompt?",
          a: "Dot Systems, an independent studio.",
        },
      ],
    },
  ];
}

// Turn bare internal paths (/workflow, /articles, /awesome) into clickable links.
function renderAnswer(text: string) {
  const parts = text.split(/(\/workflow|\/articles|\/awesome)/g);
  return parts.map((part, i) =>
    part === "/workflow" || part === "/articles" || part === "/awesome" ? (
      <Link key={i} href={part} className="vp-link">
        {part}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function FAQJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function FAQPage() {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const groups = buildFaq(prompts.length, LIST_PROBLEMS.length, articles.length);
  const allItems = groups.flatMap((g) => g.items);

  return (
    <main className="">
      <div className="page-shell">
        <FAQJsonLd items={allItems} />

        <PageHeader
          emoji="❓"
          title="Frequently asked questions."
          lede="Everything about the open-source AI prompt library, the workflow, and the fixes, all answered."
        />

        <div className="mt-10 space-y-9">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="section-title flex items-center gap-2.5">
                <span aria-hidden className="text-[22px] leading-none">{group.emoji}</span>
                {group.title}
              </h2>
              <div className="mt-1">
                {group.items.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group border-b border-[color:var(--ink-rule)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-2.5 py-3.5 [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden
                        className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open:rotate-90"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[16px] font-medium text-[color:var(--ink)]">{q}</span>
                    </summary>
                    <p className="text-body pb-4 pl-[22px]">
                      {renderAnswer(a)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Notion-style callout */}
        <div className="vp-card vp-fill vp-card-tight mt-12 flex items-start gap-3">
          <span aria-hidden className="text-[18px] leading-none mt-0.5">💡</span>
          <p className="text-body">
            Missing a question?{" "}
            <a
              href="https://github.com/dotsystemsdevs/vibe-prompt/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="vp-link"
            >
              Suggest one on GitHub →
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
