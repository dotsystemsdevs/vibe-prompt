import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { GeneratorClient } from "@/components/generator/generator-client";

export const metadata: Metadata = {
  title: "AGENTS.md & PRD Generator — fill in, get ready-to-ship markdown | vibeprompt",
  description:
    "Free AGENTS.md and PRD generator for vibe coders. Fill in your project details, get production-ready markdown to drop into your repo. No sign-up, no API key, runs in your browser.",
  alternates: { canonical: "/generator" },
  keywords:
    "AGENTS.md generator, PRD generator, CLAUDE.md generator, vibe coding generator, AI context file, Claude Code setup, Cursor setup, AGENTS.md template",
  openGraph: {
    title: "AGENTS.md & PRD Generator — vibeprompt",
    description: "Fill in your project details, get ready-to-ship AGENTS.md and PRD markdown. Free, no sign-up.",
    url: "https://vibeprompt.tech/generator",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function GeneratorPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Fill in. Get the\nmarkdown."}
          description="AGENTS.md and PRD generators that turn your project details into ready-to-ship files. Runs in your browser. No sign-up, no API key, nothing sent anywhere."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
        <GeneratorClient />

        <Reveal>
          <GithubCta
            title={"Missing\na generator?"}
            description="More starter files would help vibe coders — AGENTS.md, PRD, memory-bank, architecture, implementation plan. Suggest one and we'll add it."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a generator"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}
