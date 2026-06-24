"use client";

import { useState, type ReactNode } from "react";
import type { StepData } from "./workflow-stepper";
import { LessonVideo, type Lesson } from "./lesson-video";
import { lessonsForStep } from "./cookbook-helpers";

type TabKey = "overview" | "faq";
const TABS: [TabKey, string][] = [
  ["overview", "Overview"],
  ["faq", "FAQ"],
];

// Phase folders for the curriculum, contiguous ranges so the cookbook's ordered
// path is preserved. Rendered like the Templates file-manager (folder + rows).
const PHASES: { name: string; steps: string[] }[] = [
  { name: "Set up", steps: ["00"] },
  { name: "Plan & design", steps: ["01", "02", "03", "04"] },
  { name: "Build", steps: ["05", "06"] },
  { name: "Ship", steps: ["07", "08"] },
  { name: "Grow", steps: ["09"] },
];

// A symbol that fits each FAQ, matched on the question's wording.
function faqIcon(q: string): ReactNode {
  const k = q.toLowerCase();
  if (k.includes("code") || k.includes("coding") || k.includes("program"))
    return <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>;
  if (k.includes("free") || k.includes("cost") || k.includes("pay") || k.includes("price"))
    return <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1.2" /></>;
  if (k.includes("tool") || k.includes("work with"))
    return <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.7 2.7-2-2 2.7-2.7z" />;
  if (k.includes("order") || k.includes("sequence") || k.includes("skip"))
    return <><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-1.5 2-2.5S5 14 4 14.5" /></>;
  if (k.includes("ship") || k.includes("app") || k.includes("real") || k.includes("launch"))
    return <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>;
  return <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.5 2-2.5 2.3" /><path d="M12 16.5h.01" /></>;
}

function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-[color:var(--ink-faded)]">
        {icon}
      </svg>
      {children}
    </span>
  );
}

export function CourseIntro({ step, steps, onStart, onPick }: { step: StepData; steps: StepData[]; onStart: () => void; onPick?: (stepId: string) => void }) {
  const [tab, setTab] = useState<TabKey>("overview");

  const intro = step.courseIntro;
  const recipeSteps = steps.filter((s) => /^\d+$/.test(s.step));
  const recipes = recipeSteps.length;
  const lessons = steps.reduce((n, s) => n + lessonsForStep(s).length, 0);

  const preview: Lesson | null = step.previewVideo
    ? {
        title: "Cookbook preview",
        youtubeId: step.previewVideo.youtubeId,
        href: step.previewVideo.href,
        duration: step.previewVideo.duration,
      }
    : null;

  return (
    <div className="min-w-0">
      {/* Course header: title + tag + CTA, then the meta row */}
      <header className="mb-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-[24px] sm:text-[28px] font-bold leading-tight tracking-[-0.02em] text-[color:var(--ink)]">
                The Vibe Coding Cookbook
              </h1>
              <span className="rounded-md bg-[color:var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[color:var(--accent)]">
                Free course
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-[color:var(--ink-soft)]">
              <MetaItem icon={<><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19" /></>}>{recipes} recipes</MetaItem>
              <MetaItem icon={<path d="M9 7.5v9l7-4.5z" />}>{lessons} lessons</MetaItem>
              <MetaItem icon={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}>Self-paced</MetaItem>
              <MetaItem icon={<><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" /><path d="M9 11l3 3L22 4" /></>}>No sign-up</MetaItem>
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[color:var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[color:var(--accent-hover)]"
          >
            Start the course
            <span aria-hidden>→</span>
          </button>
        </div>
      </header>

      {/* Video */}
      {preview && (
        <div className="mb-5">
          <LessonVideo lesson={preview} badge="Preview" />
        </div>
      )}

      {/* Tabs under the video */}
      <div className="flex items-center gap-1 border-b border-[color:var(--ink-rule)]">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-current={tab === key ? "true" : undefined}
            className={`-mb-px border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors ${
              tab === key
                ? "border-[color:var(--accent)] text-[color:var(--ink)]"
                : "border-transparent text-[color:var(--ink-faded)] hover:text-[color:var(--ink-soft)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-2xl">
        {tab === "overview" && (
          <div className="space-y-8">
            <section>
              <h2 className="mb-2 text-[15px] font-semibold text-[color:var(--ink)]">About this cookbook</h2>
              {intro?.lead && <p className="text-body">{intro.lead}</p>}
              <p className="mt-3 border-l-2 border-[color:var(--accent)] pl-3.5 text-[13px] leading-relaxed text-[color:var(--ink-faded)]">
                No coding experience needed, just basic comfort with a computer. Recipes 04 and 06 get more technical, that is normal.
              </p>
            </section>

            {intro?.outcomes && intro.outcomes.length > 0 && (
              <section>
                <h2 className="mb-3 text-[15px] font-semibold text-[color:var(--ink)]">What you&apos;ll learn</h2>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {intro.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent)]">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-[13.5px] leading-snug text-[color:var(--ink-soft)]">{o}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Curriculum as a Templates-style file manager: phase folders you can
                collapse, recipes as rows under each. Each row jumps into that recipe. */}
            <section>
              <h2 className="mb-3 text-[15px] font-semibold text-[color:var(--ink)]">The {recipes} recipes</h2>
              <div className="overflow-hidden rounded-md border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
                {PHASES.map((phase, pi) => {
                  const items = recipeSteps.filter((s) => phase.steps.includes(s.step));
                  if (items.length === 0) return null;
                  return (
                    <details key={phase.name} open className={`group/f ${pi > 0 ? "border-t border-[color:var(--ink-rule)]" : ""}`}>
                      {/* Folder row */}
                      <summary className="flex cursor-pointer list-none items-center gap-2.5 bg-[color:var(--paper-soft)] px-4 py-2.5 transition-colors hover:bg-[color:var(--sidebar-hover)] [&::-webkit-details-marker]:hidden">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open/f:rotate-90">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-[color:var(--accent)]">
                          <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />
                        </svg>
                        <span className="text-[13px] font-semibold text-[color:var(--ink)]">{phase.name}</span>
                        <span className="ml-auto text-[12px] tabular-nums text-[color:var(--ink-faded)]">
                          {items.length} {items.length === 1 ? "recipe" : "recipes"}
                        </span>
                      </summary>

                      {/* Recipe rows */}
                      {items.map((s) => {
                        const n = lessonsForStep(s).length;
                        return (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => onPick?.(s.step)}
                            className="group flex w-full items-center gap-3 border-t border-[color:var(--ink-rule)] px-4 py-2.5 text-left transition-colors hover:bg-[color:var(--sidebar-hover)]"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[color:var(--paper-soft)] font-mono text-[11px] font-semibold text-[color:var(--ink-soft)]">
                              {s.step}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13.5px] font-medium text-[color:var(--ink)]">
                                <span aria-hidden className="mr-1.5">{s.emoji}</span>
                                {s.title}
                              </span>
                              {s.whatThis && (
                                <span className="mt-0.5 block truncate text-[12px] text-[color:var(--ink-faded)]">{s.whatThis}</span>
                              )}
                            </span>
                            {n > 0 && (
                              <span className="hidden shrink-0 text-[11px] tabular-nums text-[color:var(--ink-faded)] sm:block">
                                {n} {n === 1 ? "lesson" : "lessons"}
                              </span>
                            )}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--ink-soft)]">
                              <path d="M9 6l6 6-6 6" />
                            </svg>
                          </button>
                        );
                      })}
                    </details>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {tab === "faq" && intro?.faqs && (
          <div className="space-y-2.5">
            {intro.faqs.map(({ q, a }) => (
              <details key={q} name="cookbook-faq" className="group rounded-xl border border-[color:var(--ink-rule)] px-4 transition-colors hover:border-[color:var(--ink-soft)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--accent)]">
                      {faqIcon(q)}
                    </svg>
                    <span className="text-[14px] font-medium text-[color:var(--ink)]">{q}</span>
                  </span>
                  <span aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open:rotate-90">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </summary>
                <p className="text-body pb-4 pl-[26px]">{a}</p>
              </details>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
