"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StepChecklist } from "./workflow-checklist";
import type { ArticleMeta } from "@/lib/articles";
import type { ListProblem } from "@/lib/list-problems";
import { LIST_CATEGORY_LABEL } from "@/lib/list-problems";
import type { AwesomeItem } from "@/lib/awesome-data";

export type StepTool = AwesomeItem & { categoryTitle: string; categoryEmoji: string };

type Resource = { label: string; href: string; usage?: string[]; type?: "video" | "tool" | "article" };

export type TaskLink = { label: string; href: string };
export type TaskItem = {
  /** Short headline / action verb. */
  text: string;
  /** What this thing is + why you need it (intro). */
  detail?: string;
  /**
   * YouTube video id (the 11-char `v=` part). When set on a "Watch:" item the
   * cookbook embeds a real player inline instead of linking out to a search.
   * Leave it off and the lesson falls back to the YouTube link in `links`.
   */
  youtubeId?: string;
  /** Runtime shown on the lesson row, e.g. "4:12". Display only. */
  duration?: string;
  /** Platform-specific instructions for macOS users. */
  mac?: string;
  /** Platform-specific instructions for Windows users. */
  windows?: string;
  /** Build-type variant for app builders (mobile / desktop / packaged). */
  app?: string;
  /** Build-type variant for website / web app builders. */
  website?: string;
  /** How to verify the step worked (the "✓ Done when" line). */
  verify?: string;
  /** Inline tool links (rendered in Ingredients aside, deduped). */
  links?: TaskLink[];
  /** One-sentence "why it matters" shown under the instruction. */
  why?: string;
  /** Calibration for judgment tasks: a short strong vs weak example. */
  strongExample?: string;
  weakExample?: string;
};
export type TaskGroup = { heading?: string; description?: string; badge?: string; tier?: "must" | "power" | "habit" | "troubleshoot"; items: TaskItem[]; resources?: Resource[] };

export type StepRelated = {
  articles: ArticleMeta[];
  fixes: ListProblem[];
  tools?: StepTool[];
};

/** The trailer clip shown on the course-intro hero. `youtubeId` plays inline. */
export type PreviewVideo = { youtubeId?: string; href?: string; duration?: string };

/** Rich content for the course-landing view rendered on the `intro` step. */
export type CourseIntroContent = {
  /** A longer lead paragraph that sets up the whole cookbook. */
  lead: string;
  /** "What you'll walk away with" bullets. */
  outcomes: string[];
  /** "This is for you if" bullets. */
  forWho: string[];
  /** Cookbook-specific FAQ accordion. */
  faqs: { q: string; a: string }[];
};

export type LearnBlock =
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "text"; text: string }
  | { kind: "video"; title: string; youtubeId?: string; href?: string; duration?: string }
  | { kind: "check"; text: string }
  | { kind: "bridge"; text: string }
  | { kind: "diagram"; steps: string[] }
  | { kind: "example"; filename?: string; tone?: "good" | "bad"; content: string }
  | { kind: "case"; label?: string; input: string; process: string; output: string }
  | { kind: "graduation"; intro: string; accomplished: string[]; skills: string[]; next: string[] }
  | { kind: "read"; title: string; slug?: string; href?: string; blurb?: string };

export type StepData = {
  step: string;
  title: string;
  emoji: string;
  whatThis: string;
  why: string;
  timeEstimate?: string;
  tasks: TaskGroup[];
  commonMistakes: string[];
  resources: Resource[];
  output: string[];
  browseSlug: string;
  /** Hero trailer for the course-intro view (the `intro` step). */
  previewVideo?: PreviewVideo;
  /** Course-landing copy for the `intro` step. */
  courseIntro?: CourseIntroContent;
  /** Optional per-recipe FAQ, shown in the recipe's FAQ tab. */
  faqs?: { q: string; a: string }[];
  /** Optional our-own-words explainer for the Learn tab (one entry per paragraph). */
  learnNote?: string[];
  /** Optional woven Learn lesson: ordered text / video / read blocks. */
  learn?: LearnBlock[];
  /** TL;DR card at the top of the recipe: orient before diving in. */
  tldr?: {
    accomplish: string;
    deliverable: string;
    feedsInto?: string;
    prerequisites: string[];
    checklist: string[];
  };
  /** "Stuck?" beginner-rescue panel in the Task tab. */
  stuck?: {
    mistakes: string[];
    success: string;
  };
  /** The single completion rule, rendered at the bottom: "You can move on when ..." */
  moveOnWhen?: string;
  /** Optional "Already set up? You can skip this step" self-check, shown near the top. */
  skipIf?: string;
  /** Optional callout at the top of the Task tab (e.g. "No idea yet? Start in Learn"). */
  taskIntro?: string;
  intro?: {
    forWho: string[];
    struggle: string[];
    origin: string;
  };
};

interface WorkflowStepperProps {
  steps: StepData[];
  relatedByStep?: Record<string, StepRelated>;
}

export function WorkflowStepper({ steps, relatedByStep = {} }: WorkflowStepperProps) {
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    function compute() {
      try {
        const raw = localStorage.getItem("vibeprompt-tasks-v1");
        const checked = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
        const completed = new Set<string>();
        steps.forEach((step) => {
          const flat = step.tasks.flatMap((g) => g.items);
          const allDone = flat.length > 0 && flat.every((_, i) => checked[`step-${step.step}-${i}`]);
          if (allDone) completed.add(step.step);
        });
        setCompletedSteps(completed);
      } catch {}
    }
    compute();
    window.addEventListener("vp-tasks-changed", compute);
    return () => window.removeEventListener("vp-tasks-changed", compute);
  }, [steps]);

  // Drive current step from URL hash so navbar links work.
  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace(/^#/, "");
      const match = /^step-(\d+)$/.exec(hash);
      if (!match) return;
      const stepId = match[1];
      const idx = steps.findIndex((s) => s.step === stepId);
      if (idx >= 0) setCurrent(idx);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [steps]);

  function go(i: number) {
    setCurrent(i);
    const newHash = `#step-${steps[i].step}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
      // replaceState does not fire hashchange, so notify listeners (navbar active state) manually.
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const s = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const taskCount = s.tasks.reduce((n, g) => n + g.items.filter(i => !i.text.startsWith("Watch:") && !i.text.startsWith("Read:")).length, 0);
  const learnCount = s.tasks.reduce((n, g) => n + g.items.filter(i => i.text.startsWith("Watch:") || i.text.startsWith("Read:")).length, 0);

  const related = relatedByStep[s.step] ?? { articles: [], fixes: [], tools: [] };
  const relatedArticles = related.articles;
  const relatedProblems = related.fixes;
  const relatedTools = related.tools ?? [];

  return (
    <div className="vp-card-bordered overflow-hidden">

      {/* Step tabs, same as category tabs in browse/awesome */}
      <div className="relative border-b border-[color:var(--ink-rule)]">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[color:var(--page)] to-transparent" />
        <div className="flex items-center overflow-x-auto no-scrollbar px-4">
          {steps.map((step, i) => {
            const isActive = i === current;
            const isDone = completedSteps.has(step.step);
            return (
              <button
                key={step.step}
                onClick={() => go(i)}
                className={`shrink-0 flex items-center gap-1.5 border-b-2 px-3 py-3.5 text-xs transition-colors ${
                  isActive ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-[color:var(--ink-soft)]"
                }`}
              >
                {isDone && (
                  <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">✓</span>
                )}
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step header */}
      <div className="border-b border-[color:var(--ink-rule)] px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {s.step !== ", " && (
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
                Recipe {s.step}
              </p>
            )}
            <h2 className="text-base font-semibold text-[color:var(--ink-soft)] sm:text-sm">{s.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.whatThis}</p>
          </div>
          {(taskCount > 0 || learnCount > 0 || s.timeEstimate) && (
            <div className="shrink-0 flex flex-col items-end gap-1 pt-0.5">
              {s.timeEstimate && <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">~{s.timeEstimate}</span>}
              {taskCount > 0 && <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">{taskCount} tasks</span>}
              {learnCount > 0 && <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">{learnCount} resources</span>}
            </div>
          )}
        </div>
      </div>

      {/* Intro (Before You Start) */}
      {s.intro && (
        <>
          <div className="flex items-center gap-3 border-b border-[color:var(--ink-rule)] vp-fill px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">This is for you if</span>
          </div>
          <div className="divide-y divide-[color:var(--ink-rule)]">
            {s.intro.forWho.map((line, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-4 sm:px-6 sm:py-3.5">
                <span className="shrink-0 mt-1 text-[color:var(--ink-faded)]">◆</span>
                <p className="text-sm leading-relaxed text-[color:var(--ink-soft)]">{line}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 border-y border-[color:var(--ink-rule)] vp-fill px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">The struggle</span>
          </div>
          <div className="divide-y divide-[color:var(--ink-rule)]">
            {s.intro.struggle.map((line, i) => (
              <div key={i} className="px-4 py-4 sm:px-6 sm:py-3.5">
                <div className="border-l-2 border-[color:var(--ink-rule)] pl-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{line}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[color:var(--ink-rule)] px-4 py-4 sm:px-6">
            <p className="text-xs italic text-muted-foreground/50">,  {s.intro.origin}</p>
          </div>
        </>
      )}

      {/* Tasks */}
      {s.tasks.length > 0 && (
        <StepChecklist
          step={s.step}
          items={s.tasks}
          startIndex={0}
          storageKey="vibeprompt-tasks-v1"
        />
      )}

      {/* Tools for this step. Pulled from the awesome list, scoped to this stage. */}
      {relatedTools.length > 0 && (
        <div className="border-t border-[color:var(--ink-rule)]">
          <div className="flex items-center justify-between gap-3 vp-fill px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
              Ingredients
            </span>
            <span className="text-[9px] font-mono tabular-nums text-[color:var(--ink-faded)]">
              {relatedTools.length}
            </span>
          </div>
          <div className="divide-y divide-[color:var(--ink-rule)]">
            {relatedTools.map((tool) => (
              <a
                key={`${tool.href}-${tool.name}`}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 px-4 py-3.5 sm:px-6 transition-colors hover:bg-[color:var(--accent-soft)]"
              >
                <span className="shrink-0 mt-1 text-[color:var(--ink-faded)] text-[10px]">◆</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="text-[13px] font-medium leading-snug text-[color:var(--ink-soft)] transition-colors group-hover:text-foreground">
                      {tool.name}
                    </p>
                    <span className="text-[10px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink-soft)]">↗</span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[color:var(--ink-faded)] line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <span className="hidden sm:inline shrink-0 mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
                  {tool.categoryTitle}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Prompts CTA, as row */}
      {s.browseSlug && (
        <Link
          href={`/browse?category=${s.browseSlug}`}
          className="group flex items-center gap-4 border-t border-[color:var(--ink-rule)] px-4 py-4 sm:px-6 sm:py-3.5 transition-colors hover:bg-[color:var(--accent-soft)]"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-foreground">Prompts for this recipe</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground/40">Battle-tested prompts, ready to copy</p>
          </div>
          <span className="text-[11px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink-soft)]">Browse →</span>
        </Link>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-[color:var(--ink-rule)]">
          <div className="flex items-center gap-3 vp-fill px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
              Techniques
            </span>
          </div>
          <div className="divide-y divide-[color:var(--ink-rule)]">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group flex items-start gap-3 px-4 py-3.5 sm:px-6 transition-colors hover:bg-[color:var(--accent-soft)]"
              >
                <span className="shrink-0 mt-1 text-[color:var(--ink-faded)] text-[10px]">◆</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium leading-snug text-[color:var(--ink-soft)] transition-colors group-hover:text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[color:var(--ink-faded)] line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <span className="shrink-0 mt-1 text-[9px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink-soft)]">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related fixes — when things break at this step */}
      {relatedProblems.length > 0 && (
        <div className="border-t border-[color:var(--ink-rule)]">
          <div className="flex items-center gap-3 vp-fill px-4 py-3 sm:px-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
              Troubleshooting
            </span>
          </div>
          <div className="divide-y divide-[color:var(--ink-rule)]">
            {relatedProblems.map((problem) => (
              <Link
                key={problem.id}
                href={`/fixes/${problem.id}`}
                className="group flex items-baseline gap-3 px-4 py-3 sm:px-6 transition-colors hover:bg-[color:var(--accent-soft)]"
              >
                <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)] w-12">
                  {LIST_CATEGORY_LABEL[problem.category]}
                </span>
                <span className="flex-1 text-[12px] leading-snug text-[color:var(--ink-soft)] transition-colors group-hover:text-foreground">
                  {problem.title}
                </span>
                <span className="shrink-0 text-[9px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink-soft)]">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next, as footer row */}
      <div className="flex border-t border-[color:var(--ink-rule)]">
        <button
          onClick={() => go(current - 1)}
          disabled={isFirst}
          className="flex flex-1 items-center gap-2 border-r border-[color:var(--ink-rule)] px-4 py-4 sm:px-6 text-xs text-muted-foreground transition-colors hover:bg-[color:var(--accent-soft)] hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          <span>←</span>
          <span>{steps[current - 1]?.title}</span>
        </button>
        <button
          onClick={() => go(current + 1)}
          disabled={isLast}
          className="flex flex-1 items-center justify-end gap-2 px-4 py-4 sm:px-6 text-xs text-muted-foreground transition-colors hover:bg-[color:var(--accent-soft)] hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
        >
          <span>{steps[current + 1]?.title}</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
