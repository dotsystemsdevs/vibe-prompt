import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { GeneratorClient } from "@/components/generator/generator-client";

export const metadata: Metadata = {
  title: "Toolbox — generators, scanners, and templates for vibe coders | vibeprompt",
  description:
    "Free interactive tools for vibe coding: AGENTS.md and PRD generator, site auditor, downloadable templates. No signup, no API key required for the basics.",
  alternates: { canonical: "/toolbox" },
  keywords: "vibe coding tools, AGENTS.md generator, PRD generator, site auditor, AGENTS.md template, PRD template, MEMORY.md template",
  openGraph: {
    title: "vibeprompt Toolbox",
    description: "Generators, scanners, templates. All free, all open source.",
    url: "https://vibeprompt.tech/toolbox",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

type Template = {
  filename: string;
  description: string;
  purpose: string;
};

const TEMPLATES: Template[] = [
  {
    filename: "AGENTS.md",
    description: "The file every AI session reads first. Project rules, conventions, hard rules.",
    purpose: "Drop in repo root. Read by Claude Code, Cursor, Codex CLI, Windsurf.",
  },
  {
    filename: "PRD.md",
    description: "Product Requirements Document. What you're building, for whom, with what success criteria.",
    purpose: "Save under docs/. Reference from AGENTS.md.",
  },
  {
    filename: "architecture.md",
    description: "File map, where state lives, server/client boundaries. The mental model of the codebase.",
    purpose: "Save under memory-bank/. Prefix with @ to set as always-read.",
  },
  {
    filename: "implementation-plan.md",
    description: "Ordered task list with acceptance criteria. The agent's punch list.",
    purpose: "Save under memory-bank/. Update as tasks complete.",
  },
  {
    filename: "MEMORY.md",
    description: "Session continuity. Decisions made, gotchas discovered, in-progress threads.",
    purpose: "Save under memory-bank/. Every agent appends when it finishes.",
  },
];

export default function ToolboxPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"The toolbox."}
          description="Interactive utilities for vibe coders. Generators, scanners, templates. Everything free and open source. No signup."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
        {/* Generators — embedded inline so /toolbox is the actual surface */}
        <Reveal>
          <section id="generators" className="mb-16 scroll-mt-20">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-2">
                  Generators
                </p>
                <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
                  AGENTS.md &amp; PRD Generator
                </h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-foreground/65">
                  Fill in the blanks below, copy or download the markdown. Inputs save to
                  your browser, never to a server.
                </p>
              </div>
            </div>

            <GeneratorClient />
          </section>
        </Reveal>

        {/* Scanners */}
        <Reveal>
          <section className="mb-16">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
              Scanners
            </p>
            <Link
              href="/scan"
              className="block border border-foreground/20 p-6 transition-colors hover:bg-foreground/[0.04] sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
                  Site Scan
                </h2>
                <span className="text-[11px] text-foreground/55">Open →</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                Audit any URL for SEO basics, conversion blockers, broken links, missing
                security headers. Honest output — flags bot-protection challenge pages so
                you don&rsquo;t get false findings.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-foreground/55">
                <span>· Free, no signup</span>
                <span>· Works on any public URL</span>
                <span>· Drops a score per category</span>
              </div>
            </Link>
          </section>
        </Reveal>

        {/* Templates */}
        <Reveal>
          <section className="mb-16">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
              Templates
            </p>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-foreground/70">
              Plain markdown files. Download, fill in, commit to your repo. Each one is
              under 100 lines and stack-agnostic — adapt to your project.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {TEMPLATES.map((t) => (
                <article
                  key={t.filename}
                  className="border border-foreground/12 p-5 transition-colors hover:bg-foreground/[0.02]"
                >
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <h3 className="font-mono text-sm font-semibold text-foreground">
                      {t.filename}
                    </h3>
                    <a
                      href={`/templates/${t.filename}`}
                      className="text-[11px] text-foreground/55 transition-colors hover:text-foreground"
                      download
                    >
                      Download ↓
                    </a>
                  </div>
                  <p className="mb-2 text-[13px] leading-relaxed text-foreground/80">
                    {t.description}
                  </p>
                  <p className="text-[11px] italic text-foreground/50">{t.purpose}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* What's missing CTA */}
        <Reveal>
          <section className="mt-16 border-t border-foreground/12 pt-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              Missing a tool?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-6">
              Tell us what to build next.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/70 max-w-2xl">
              The toolbox grows when vibe coders tell us what&rsquo;s painful. Open an issue
              with the tool you wish existed — even if it&rsquo;s &ldquo;a thing that turns my
              messy notes into an AGENTS.md&rdquo; or &ldquo;a checker for whether my prompt
              is too long.&rdquo;
            </p>
          </section>
        </Reveal>

        <Reveal>
          <GithubCta
            title={"Everything here\nis open source."}
            description="Fork the repo, swap in your branding, ship your own toolbox. MIT licensed, no strings."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a tool"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="View source"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}
