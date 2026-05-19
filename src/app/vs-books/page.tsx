import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "vibeprompt vs. vibe coding books — what you get for $0",
  description:
    "How vibeprompt compares to paid vibe coding books and guides. Free, web-native, updated weekly. 56+ prompts, 9-step workflow, 46+ field-tested fixes, 15+ deep-dive articles. Honest comparison, no affiliate links.",
  alternates: { canonical: "/vs-books" },
  openGraph: {
    title: "vibeprompt vs. vibe coding books — what you get for $0",
    description:
      "Honest comparison: vibeprompt (free, web, updated weekly) vs. paid vibe coding books.",
    url: "https://vibeprompt.tech/vs-books",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function VsBooksPage() {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const promptsCount = prompts.length;
  const articlesCount = articles.length;
  const fixesCount = LIST_PROBLEMS.length;

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Books vs. cookbook.\nHere's the math."}
          description="How vibeprompt compares to the $30 vibe coding books on Amazon. No affiliate links, no disparagement — just what you get from each."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 pt-2 pb-12">

        {/* TL;DR */}
        <section className="mb-12 border border-foreground/15 p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
            TL;DR
          </p>
          <p className="text-[15px] leading-7 text-foreground/80">
            Books are great for one thing: a structured introduction you read on a flight.
            vibeprompt is built for the other 99% of the time you actually code with AI — when
            you need a specific prompt, a fix for a specific bug, or a workflow you can check
            off as you go. Free, web-native, updated weekly.
          </p>
        </section>

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Quick comparison
          </h2>
          <div className="overflow-x-auto border border-foreground/15">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-foreground/[0.04]">
                  <th className="text-left font-semibold text-foreground/85 px-4 py-3 border-b border-foreground/15"></th>
                  <th className="text-left font-semibold text-foreground/85 px-4 py-3 border-b border-foreground/15 border-l border-foreground/10">
                    vibeprompt
                  </th>
                  <th className="text-left font-semibold text-foreground/70 px-4 py-3 border-b border-foreground/15 border-l border-foreground/10">
                    Paid books
                  </th>
                </tr>
              </thead>
              <tbody>
                <Row label="Price" left="Free, MIT licensed" right="$25–$40" />
                <Row label="Format" left="Web app, searchable, filterable" right="PDF / paperback / Kindle" />
                <Row label="Update cadence" left="Weekly, sometimes daily" right="Frozen at print date" />
                <Row label="Copy-paste prompts" left={`${promptsCount}, ready to use`} right="Embedded in prose" />
                <Row label="Interactive workflow" left="9 steps, localStorage progress" right="Read-only chapters" />
                <Row label="Field-tested fixes" left={`${fixesCount} with tactical answers`} right="Embedded in prose, no search" />
                <Row label="Real builder receipts" left={`${articlesCount} deep-dives with real data`} right="Author's own anecdotes" />
                <Row label="Search by error" left="Paste error → find fix" right="Index at the back" />
                <Row label="Sign-up required" left="No" right="No (but Amazon account)" />
                <Row label="Open source / fork" left="Yes (GitHub)" right="No" />
                <Row label="AI tool coverage" left="Claude Code, Cursor, Windsurf, Aider, Copilot" right="Varies by book" />
                <Row label="Indie founder lens" left="Built by indie devs, for indie devs" right="Mix of enterprise + indie" />
              </tbody>
            </table>
          </div>
        </section>

        {/* What you get free */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            What you actually get here, for $0
          </h2>
          <ul className="space-y-3 text-[15px] leading-7 text-foreground/75">
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/workflow" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  The 9-step build loop
                </Link>{" "}
                with interactive checklists that save your progress.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/browse" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  {promptsCount} battle-tested prompts
                </Link>{" "}
                organized by the stage of the build (research, PRD, build, ship, etc.).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/articles" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  {articlesCount} deep-dive articles
                </Link>{" "}
                with real data from shipped apps — not theory.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/list" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  {fixesCount} field-tested fixes
                </Link>{" "}
                with searchable problem → tactical answer format.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/awesome" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  A curated tool list
                </Link>{" "}
                — Claude Code, Cursor, MCP servers, Context7, and more.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>
                <Link href="/scan" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors font-medium">
                  A free audit tool
                </Link>{" "}
                that scans any URL for SEO, conversion, security, and AI discoverability issues.
              </span>
            </li>
          </ul>
        </section>

        {/* When books still make sense */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            When the books still make sense
          </h2>
          <p className="mb-3 text-[15px] leading-7 text-foreground/75">
            We&apos;re not pretending the books are useless. They&apos;re great for:
          </p>
          <ul className="space-y-3 text-[15px] leading-7 text-foreground/75">
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>You want a single linear read on a flight, sofa, or coffee shop.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>You learn best from a narrative, not a reference library.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>You want to support an author whose work you respect.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground/30 shrink-0">→</span>
              <span>You&apos;re in an org that needs a sanctioned reference for the methodology.</span>
            </li>
          </ul>
          <p className="mt-4 text-[15px] leading-7 text-foreground/75">
            For everything else — the daily &quot;what prompt do I use here?&quot;, the &quot;my AI just
            wrote broken code, now what?&quot;, the &quot;how do I actually ship this?&quot; — vibeprompt is
            the faster path.
          </p>
        </section>

        {/* Why free works for us */}
        <section className="mb-12">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Why this is free (and not a hidden trial)
          </h2>
          <p className="text-[15px] leading-7 text-foreground/75">
            vibeprompt is open source on GitHub, MIT licensed. We have no premium tier, no ads,
            no affiliate links, and no email gates. The site funds itself with sister projects
            and the goodwill of contributors. If something here saved you 30 minutes,{" "}
            <a
              href="https://github.com/dotsystemsdevs/vibeprompt"
              className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground transition-colors"
            >
              star the repo
            </a>{" "}
            or contribute a prompt. That&apos;s how we keep it free.
          </p>
        </section>

        <Reveal>
          <GithubCta
            title={"Found something\nthe books missed?"}
            description="Suggest a prompt, a fix, or an article. Vibeprompt updates weekly because contributors keep adding to it."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a contribution"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Star the repo"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}

function Row({ label, left, right }: { label: string; left: string; right: string }) {
  return (
    <tr className="border-b border-foreground/[0.07] last:border-b-0">
      <td className="px-4 py-3 font-medium text-foreground/85">{label}</td>
      <td className="px-4 py-3 text-foreground/75 border-l border-foreground/10">{left}</td>
      <td className="px-4 py-3 text-foreground/55 border-l border-foreground/10">{right}</td>
    </tr>
  );
}

export const revalidate = 3600;
