"use client";

import type { StepData } from "./workflow-stepper";
import { lessonsForStep, stepTaskStats } from "./cookbook-helpers";

/** Empty / complete status dot, mirrors the clean look of the left sidebar. */
function StatusDot({ done }: { done: boolean }) {
  if (done) {
    return (
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-white">
        <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    );
  }
  return <span className="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[color:var(--ink-rule)]" />;
}

interface CourseContentRailProps {
  steps: StepData[];
  activeStep: string;
  checked: Record<string, boolean>;
  mounted: boolean;
  onSelect: (stepId: string) => void;
}

export function CourseContentRail({ steps, activeStep, checked, mounted, onSelect }: CourseContentRailProps) {
  const withTasks = steps.filter((s) => stepTaskStats(s, checked).total > 0);
  const finished = mounted
    ? withTasks.filter((s) => {
        const { total, done } = stepTaskStats(s, checked);
        return total > 0 && done === total;
      }).length
    : 0;
  const overallPct = withTasks.length ? Math.round((finished / withTasks.length) * 100) : 0;

  return (
    <div className="flex w-full flex-col">
      {/* Header, pinned. Matches the sidebar's quiet weight. */}
      <div className="sticky top-0 z-10 border-b border-[color:var(--ink-rule)] bg-[color:var(--sidebar-bg)] px-4 pt-5 pb-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[14px] font-semibold tracking-tight text-[color:var(--ink)]">Course content</h2>
          <span className="text-[11px] tabular-nums text-[color:var(--ink-faded)]">{steps.length} recipes</span>
        </div>
        {mounted && withTasks.length > 0 && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] text-[color:var(--ink-faded)]">
              <span>{finished} of {withTasks.length} complete</span>
              <span className="tabular-nums">{overallPct}%</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[color:var(--accent-soft)]">
              <div className="h-full rounded-full bg-[color:var(--accent)] transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Modules only, clean sidebar-style rows. No expanded lessons. */}
      <ol className="px-2 py-3 space-y-0.5">
        {steps.map((step) => {
          const isActive = step.step === activeStep;
          const lessons = lessonsForStep(step).length;
          const { total, done } = stepTaskStats(step, checked);
          const isDone = mounted && total > 0 && done === total;
          const isNumeric = /^\d+$/.test(step.step);

          return (
            <li key={step.step}>
              <button
                type="button"
                onClick={() => onSelect(step.step)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors ${
                  isActive ? "bg-[color:var(--sidebar-active)]" : "hover:bg-[color:var(--sidebar-hover)]"
                }`}
              >
                <StatusDot done={isDone} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    {isNumeric && (
                      <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">{step.step}</span>
                    )}
                    <span className={`truncate text-[13px] ${isActive ? "font-semibold text-[color:var(--ink)]" : "text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]"}`}>
                      {step.title}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] text-[color:var(--ink-faded)]">
                    {lessons > 0 && `${lessons} lessons`}
                    {lessons > 0 && total > 0 && " · "}
                    {total > 0 ? `${done}/${total} tasks` : lessons === 0 && step.timeEstimate ? `~${step.timeEstimate}` : ""}
                  </span>
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden
                  className="shrink-0 text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink-soft)]"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
