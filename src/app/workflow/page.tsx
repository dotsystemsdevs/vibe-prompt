import type { Metadata } from "next";
import { WorkflowStepper, type StepRelated } from "@/components/workflow/workflow-stepper";
import { WORKFLOW_PAGE_STEPS as STEPS } from "@/lib/workflow-data";
import { WORKFLOW_RELATED } from "@/lib/workflow-related";
import { getAllArticles, type ArticleMeta } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "The Vibe Coding Workflow — 10 steps from idea to shipped, with prompts and fixes",
  description:
    "The complete vibe code workflow for indie devs and solo founders: environment, research, PRD, stack, context, build, quality, ship, launch, iterate. Interactive checklist with prompts, AGENTS.md template, and field-tested fixes for each step. Free, no sign-up.",
  keywords:
    "vibe code workflow, vibe coding workflow, vibecoding workflow, AI coding workflow, indie hacker workflow, prompt engineering workflow, AGENTS.md, PRD template, Claude Code workflow, Cursor workflow",
  alternates: { canonical: "/workflow" },
  openGraph: {
    title: "The Vibe Coding Workflow — 10 steps from idea to shipped",
    description: "Interactive checklist with prompts, templates, and field-tested fixes for each step. Free, no sign-up.",
    url: "https://vibeprompt.tech/workflow",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function WorkflowPage() {
  const allArticles = await getAllArticles();
  const relatedByStep: Record<string, StepRelated> = {};
  for (const step of STEPS) {
    const map = WORKFLOW_RELATED[step.step];
    if (!map) continue;
    const articles: ArticleMeta[] = (map.articleSlugs ?? [])
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a): a is ArticleMeta => Boolean(a));
    const fixes = (map.fixIds ?? [])
      .map((id) => LIST_PROBLEMS.find((p) => p.id === id))
      .filter((p): p is (typeof LIST_PROBLEMS)[number] => Boolean(p));
    if (articles.length > 0 || fixes.length > 0) {
      relatedByStep[step.step] = { articles, fixes };
    }
  }

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"The vibe coding\nworkflow."}
          description="9 steps from idea to shipped, built from the most-starred vibe coding repos."
          accent="#ffffff"
        />
      </Reveal>
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <WorkflowStepper steps={STEPS} relatedByStep={relatedByStep} />
        <Reveal>
          <GithubCta
            title={"Something\nmissing?"}
            description="Suggest a step, a resource, or a fix. If it belongs here, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a change"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}
