import Link from "next/link";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { BUILT_WITH_PROJECTS } from "@/lib/built-with-data";

export default async function HomePage() {
  const { prompts } = await getPromptLibrary();
  const articles = await getAllArticles();
  const fixesCount = LIST_PROBLEMS.length;
  const articlesCount = articles.length;
  const promptsCount = prompts.length;
  const recipeCount = WORKFLOW_STEPS.length;
  const builtCount = BUILT_WITH_PROJECTS.length;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "vibeprompt",
    description: `The vibe coding cookbook — recipes for shipping with AI. 10-step workflow, ${promptsCount} battle-tested prompts, ${fixesCount} field-tested fixes, and ${articlesCount} deep-dives. Free, open source, web-native.`,
    url: "https://vibeprompt.tech",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    keywords: "vibe coding, vibe coding cookbook, AI prompts, prompt library, Claude prompts, AI workflow, open source",
    creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  const FEATURES = [
    { emoji: "✍️", title: `${promptsCount} prompts`, desc: "Copy-paste for every stage, from planning to polish." },
    { emoji: "🛡️", title: `${fixesCount} fixes`, desc: "For when AI breaks your build or your launch stalls." },
    { emoji: "🚀", title: `${recipeCount}-step workflow`, desc: "Idea to shipped, nothing skipped." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-6 py-14 sm:px-8 lg:h-full lg:overflow-hidden lg:py-0">

        {/* Hero — Notion-style left-aligned */}
        <div aria-hidden className="page-emoji">🍳</div>
        <p className="page-kicker">
          vibeprompt · the vibe coding cookbook
        </p>
        <h1 className="text-display mt-3">
          Vibe code that actually ships.
        </h1>
        <p className="text-body-lg mt-4 max-w-xl">
          A {recipeCount}-step playbook with {promptsCount} battle-tested prompts and {fixesCount} fixes
          for when AI breaks your build. Free, open source, no sign-up.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/workflow" className="btn-primary">
            Open the cookbook
            <span aria-hidden>→</span>
          </Link>
          <a
            href="https://github.com/dotsystemsdevs/vibe-prompt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.688 0 3.837-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.575.688.475A10.005 10.005 0 0 0 22 12c0-5.525-4.475-10-10-10Z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Notion-callout feature cards */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="vp-card vp-fill vp-card-tight">
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-[18px] leading-none">{f.emoji}</span>
                <p className="text-body font-semibold text-[color:var(--ink)]">{f.title}</p>
              </div>
              <p className="text-body mt-1.5">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="text-meta mt-8">
          Proven on{" "}
          <Link href="/built-with" className="vp-link">
            {builtCount} real indie apps
          </Link>{" "}
          shipped to iOS, Android, and web. MIT licensed.
        </p>
      </div>
    </>
  );
}

export const revalidate = 3600;
