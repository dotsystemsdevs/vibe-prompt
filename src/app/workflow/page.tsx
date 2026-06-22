import type { Metadata } from "next";
import { WorkflowCookbook, type CookbookRelated } from "@/components/workflow/workflow-cookbook";
import { WORKFLOW_PAGE_STEPS as STEPS } from "@/lib/workflow-data";
import { WORKFLOW_RELATED } from "@/lib/workflow-related";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "The Vibe Coding Workflow — 10 steps from idea to shipped, with prompts and fixes",
  description:
    "The complete vibe code workflow for indie devs and solo founders: environment, research, PRD, stack, context, build, quality, ship, launch, iterate. Interactive checklist with prompts, AGENTS.md template, and fixes for each step. Free, no sign-up.",
  keywords:
    "vibe code workflow, vibe coding workflow, vibecoding workflow, AI coding workflow, indie hacker workflow, prompt engineering workflow, AGENTS.md, PRD template, Claude Code workflow, Cursor workflow",
  alternates: { canonical: "/workflow" },
  openGraph: {
    title: "The Vibe Coding Workflow — 10 steps from idea to shipped",
    description: "Interactive checklist with prompts, templates, and fixes for each step. Free, no sign-up.",
    url: "https://vibeprompt.tech/workflow",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function WorkflowPage() {
  const allArticles = await getAllArticles();
  // Only ship what the rail actually renders (title + id/slug). The full fix
  // answers live on /fixes/[id]; sending them here just bloats the page.
  const relatedByStep: Record<string, CookbookRelated> = {};
  for (const step of STEPS) {
    const map = WORKFLOW_RELATED[step.step];
    if (!map) continue;
    const articles = (map.articleSlugs ?? [])
      .map((slug) => allArticles.find((a) => a.slug === slug))
      .filter((a) => Boolean(a))
      .map((a) => ({ slug: a!.slug, title: a!.title }));
    const fixes = (map.fixIds ?? [])
      .map((id) => LIST_PROBLEMS.find((p) => p.id === id))
      .filter((p) => Boolean(p))
      .map((p) => ({ id: p!.id, title: p!.title }));
    if (articles.length > 0 || fixes.length > 0) {
      relatedByStep[step.step] = { articles, fixes };
    }
  }

  // Cover images for the articles referenced in the recipes' Learn reads.
  const articleImages: Record<string, { src: string; alt: string }> = {};
  for (const a of allArticles) {
    if (a.image) articleImages[a.slug] = { src: a.image, alt: a.imageAlt };
  }

  return (
    // Full-bleed: the cookbook owns its own layout so the Course content rail
    // can sit flush against the right edge, mirroring the left app sidebar.
    <div className="cookbook-paper">
      <WorkflowCookbook steps={STEPS} relatedByStep={relatedByStep} articleImages={articleImages} />
    </div>
  );
}

export const revalidate = 3600;
