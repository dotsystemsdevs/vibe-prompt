"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { StepData, TaskItem, LearnBlock } from "./workflow-stepper";
import { LessonVideo, youtubeThumb, type Lesson } from "./lesson-video";
import { CourseContentRail } from "./course-content-rail";
import { CourseIntro } from "./course-intro";
import { isLearnHeading, lessonsForStep } from "./cookbook-helpers";

const STORAGE_KEY = "vibeprompt-tasks-v1";

function InlineCode({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded-sm border border-[color:var(--ink-rule)] vp-fill px-1 font-mono text-[0.85em] text-[color:var(--accent)]"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function getFavicon(href: string) {
  try {
    const domain = new URL(href).hostname;
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  } catch {
    return null;
  }
}

function FavIcon({ href }: { href: string }) {
  const src = getFavicon(href);
  if (!src) return <span aria-hidden className="shrink-0 text-[12px] leading-none">🔗</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={14}
      height={14}
      className="h-[14px] w-[14px] shrink-0 rounded-sm"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

/** Only the fields the rail renders,keeps the page payload light. */
export type CookbookRelated = {
  articles: { slug: string; title: string }[];
  fixes: { id: string; title: string }[];
};

type RecipeTab = "learn" | "task" | "faq";
const RECIPE_TABS: [RecipeTab, string][] = [
  ["learn", "Learn"],
  ["task", "Task"],
  ["faq", "FAQ"],
];

// Phase label per recipe number, for the hero kicker. Matches the curriculum
// folders (Set up / Plan & design / Build / Ship / Grow).
const PHASE_NAME: Record<string, string> = {
  "00": "Set up",
  "01": "Plan & design", "02": "Plan & design", "03": "Plan & design", "04": "Plan & design",
  "05": "Build", "06": "Build",
  "07": "Ship", "08": "Ship",
  "09": "Grow",
};

// A line icon per Learn section, matched on the heading's wording (icons, not emojis).
function sectionIcon(heading: string) {
  const k = heading.toLowerCase();
  if (k.includes("aim")) return <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>;
  if (k.includes("no idea") || k.includes("find")) return <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></>;
  if (k.includes("what")) return <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /></>;
  if (k.includes("how") || k.includes("set it up") || k.includes("run it") || k.includes("choose") || k.includes("write it")) return <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.7 2.7-2-2 2.7-2.7z" />;
  if (k.includes("wrong") || k.includes("trap") || k.includes("avoid") || k.includes("mistake")) return <><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>;
  if (k.includes("start from") || k.includes("prd")) return <><path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></>;
  if (k.includes("deeper") || k.includes("prompt") || k.includes("diff") || k.includes("session")) return <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>;
  return <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2.5" /></>;
}

// A line icon per recipe tab.
function tabIcon(key: RecipeTab) {
  if (key === "learn") return <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>;
  if (key === "task") return <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>;
  return <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.5 2-2.5 2.3" /><path d="M12 16.5h.01" /></>;
}

interface WorkflowCookbookProps {
  steps: StepData[];
  relatedByStep?: Record<string, CookbookRelated>;
  articleImages?: Record<string, { src: string; alt: string }>;
}

export function WorkflowCookbook({ steps, relatedByStep, articleImages }: WorkflowCookbookProps) {
  const [activeStep, setActiveStep] = useState<string>(steps[0]?.step ?? "intro");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  // Which lesson plays in the top player (a per-recipe playlist).
  const [lessonIdx, setLessonIdx] = useState(0);
  const [recipeTab, setRecipeTab] = useState<RecipeTab>("learn");

  // Load progress from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setChecked(raw ? (JSON.parse(raw) as Record<string, boolean>) : {});
    } catch {}
    const onChange = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setChecked(raw ? JSON.parse(raw) : {});
      } catch {}
    };
    window.addEventListener("vp-tasks-changed", onChange);
    return () => window.removeEventListener("vp-tasks-changed", onChange);
  }, []);

  // Sync active step from URL hash (rail links + prev/next both update the hash)
  useEffect(() => {
    function apply(scroll: boolean) {
      const hash = window.location.hash.replace(/^#/, "");
      const match = /^step-([a-z0-9-]+)$/i.exec(hash);
      if (match && steps.some((s) => s.step === match[1])) {
        setActiveStep(match[1]);
        setLessonIdx(0);
        setRecipeTab("learn");
        if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
    apply(false);
    const onHash = () => apply(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [steps]);

  function goToStep(stepId: string) {
    setActiveStep(stepId);
    setLessonIdx(0);
    setRecipeTab("learn");
    const newHash = `#step-${stepId}`;
    if (window.location.hash !== newHash) {
      history.pushState(null, "", newHash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function toggle(key: string) {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("vp-tasks-changed"));
      } catch {}
      return next;
    });
  }

  // Mark every task in a step done, used so "Start the course" checks off the intro.
  function markStepDone(s: StepData) {
    setChecked((prev) => {
      const next = { ...prev };
      let idx = 0;
      for (const g of s.tasks) {
        for (let i = 0; i < g.items.length; i++) {
          next[`step-${s.step}-${idx}`] = true;
          idx++;
        }
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("vp-tasks-changed"));
      } catch {}
      return next;
    });
  }

  const active = steps.find((s) => s.step === activeStep) ?? steps[0];

  // Flatten every task with its STABLE storage index, then split the lesson
  // group(s) off so videos play in the player instead of the checklist.
  // (Storage keys stay `step-<id>-<flatIndex>` so saved progress never shifts.)
  // Group offsets are derived (no mutable cursor) so the math is render-safe.
  const groupOffsets = active.tasks.reduce<number[]>((acc, g, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + active.tasks[i - 1].items.length);
    return acc;
  }, []);
  const flatGroups = active.tasks.map((g, gi) => {
    const base = groupOffsets[gi];
    const items = g.items.map((item, ii) => ({ item, idx: base + ii }));
    return { heading: g.heading, description: g.description, tier: g.tier, items, learn: isLearnHeading(g.heading) };
  });
  const actionableGroups = flatGroups.filter((g) => !g.learn);
  // Two-level task model: Must do (required, counts toward progress) vs Power up
  // (optional). Build uses habit / troubleshoot groups, which are standing
  // practice / reference, not one-off checkboxes, so they don't count.
  const mustGroups = actionableGroups.filter((g) => (g.tier ?? "must") === "must");
  const powerGroups = actionableGroups.filter((g) => g.tier === "power");
  const habitGroups = actionableGroups.filter((g) => g.tier === "habit");
  const troubleshootGroups = actionableGroups.filter((g) => g.tier === "troubleshoot");

  const activeItems = mustGroups.flatMap((g) => g.items);
  const totalDone = mounted
    ? activeItems.filter(({ idx }) => checked[`step-${active.step}-${idx}`]).length
    : 0;
  const stepFinished = mounted && activeItems.length > 0 && totalDone === activeItems.length;
  const related = relatedByStep?.[active.step];

  // Lessons (videos / reads) for this recipe,the player playlist.
  const lessons = lessonsForStep(active);
  const featured: Lesson | null = lessons.length ? lessons[Math.min(lessonIdx, lessons.length - 1)] : null;

  const isNumericStep = /^\d+$/.test(active.step);
  const showIntro = active.step === "intro" && !!active.courseIntro;
  const firstRecipe = steps.find((s) => /^\d+$/.test(s.step))?.step ?? steps[1]?.step ?? active.step;

  // Adjacent steps, so each recipe has a clear path backward and forward.
  const stepIndex = steps.findIndex((s) => s.step === active.step);
  const prevStep = stepIndex > 0 ? steps[stepIndex - 1] : null;
  const nextStep = stepIndex >= 0 && stepIndex < steps.length - 1 ? steps[stepIndex + 1] : null;

  // One Learn block, rendered by kind. Headings are consumed by the section
  // grouping below, so this only renders the content inside a section card.
  function renderLearnBlock(b: LearnBlock, i: number) {
    if (b.kind === "heading") {
      return <h3 key={i} className="text-[15px] font-semibold tracking-tight text-[color:var(--ink)]">{b.text}</h3>;
    }
    if (b.kind === "subheading") {
      return <p key={i} className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">{b.text}</p>;
    }
    if (b.kind === "text") {
      return <p key={i} className="text-body">{b.text}</p>;
    }
    if (b.kind === "video") {
      return (
        <figure key={i}>
          <LessonVideo lesson={{ title: b.title, youtubeId: b.youtubeId, href: b.href, duration: b.duration }} />
          <figcaption className="mt-2.5 flex items-center justify-between gap-3 text-[12px]">
            <span className="truncate font-medium text-[color:var(--ink-soft)]">{b.title}</span>
            {b.duration && <span className="shrink-0 font-mono tabular-nums text-[color:var(--ink-faded)]">{b.duration}</span>}
          </figcaption>
        </figure>
      );
    }
    if (b.kind === "check") {
      return (
        <div key={i} className="rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] p-4">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Check yourself</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-[color:var(--ink-soft)]">{b.text}</p>
        </div>
      );
    }
    if (b.kind === "bridge") {
      return (
        <div key={i} className="mt-2 flex items-start gap-2 border-t border-[color:var(--ink-rule)] pt-4 text-[13px] font-medium text-[color:var(--ink-soft)]">
          <span aria-hidden className="shrink-0 text-[color:var(--accent)]">→</span>
          <span>{b.text}</span>
        </div>
      );
    }
    if (b.kind === "diagram") {
      return (
        <div key={i} className="flex flex-col items-center gap-1 rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] p-4">
          {b.steps.map((s, si) => (
            <div key={si} className="flex flex-col items-center gap-1">
              <span className="rounded-md border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--ink)]">{s}</span>
              {si < b.steps.length - 1 && <span aria-hidden className="leading-none text-[color:var(--ink-faded)]">↓</span>}
            </div>
          ))}
        </div>
      );
    }
    if (b.kind === "example") {
      return (
        <figure key={i} className="overflow-hidden rounded-lg border border-[color:var(--ink-rule)]">
          {(b.filename || b.tone) && (
            <figcaption className="flex items-center justify-between gap-2 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-3 py-1.5">
              {b.filename ? <span className="font-mono text-[11px] text-[color:var(--ink-soft)]">{b.filename}</span> : <span />}
              {b.tone && (
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: b.tone === "good" ? "var(--success)" : "var(--page-red)" }}>
                  {b.tone === "good" ? "Good" : "Avoid"}
                </span>
              )}
            </figcaption>
          )}
          <pre className="overflow-x-auto whitespace-pre-wrap bg-[color:var(--paper)] p-3.5 text-[12px] leading-relaxed text-[color:var(--ink-soft)]"><code>{b.content}</code></pre>
        </figure>
      );
    }
    if (b.kind === "case") {
      return (
        <div key={i} className="rounded-lg border border-[color:var(--ink-rule)] border-l-2 border-l-[color:var(--accent)] bg-[color:var(--paper-soft)] p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">Worked example{b.label ? `, ${b.label}` : ""}</p>
          <dl className="mt-2 space-y-1.5 text-[12.5px]">
            <div className="flex gap-2"><dt className="w-16 shrink-0 font-semibold text-[color:var(--ink-faded)]">Input</dt><dd className="text-[color:var(--ink-soft)]">{b.input}</dd></div>
            <div className="flex gap-2"><dt className="w-16 shrink-0 font-semibold text-[color:var(--ink-faded)]">Process</dt><dd className="text-[color:var(--ink-soft)]">{b.process}</dd></div>
            <div className="flex gap-2"><dt className="w-16 shrink-0 font-semibold text-[color:var(--ink-faded)]">Output</dt><dd className="text-[color:var(--ink-soft)]">{b.output}</dd></div>
          </dl>
        </div>
      );
    }
    if (b.kind === "graduation") {
      return (
        <div key={i} className="rounded-xl border border-[color:var(--accent)] bg-[color:var(--accent-soft)] p-6">
          <p className="text-[22px] font-bold tracking-tight text-[color:var(--ink)]">You shipped.</p>
          <p className="mt-2 text-body">{b.intro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">You accomplished</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] text-[color:var(--ink-soft)]">{b.accomplished.map((x, xi) => <li key={xi}>{x}</li>)}</ul>
            </div>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Skills learned</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] text-[color:var(--ink-soft)]">{b.skills.map((x, xi) => <li key={xi}>{x}</li>)}</ul>
            </div>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Next steps</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] text-[color:var(--ink-soft)]">{b.next.map((x, xi) => <li key={xi}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      );
    }
    const readHref = b.slug ? `/articles/${b.slug}` : b.href ?? "#";
    const preview = b.slug ? articleImages?.[b.slug] : undefined;
    return (
      <a
        key={i}
        href={readHref}
        {...(b.slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="group flex items-start gap-3 rounded-xl border border-[color:var(--ink-rule)] p-3.5 transition-colors hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--accent-soft)]"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview.src} alt="" className="h-16 w-24 shrink-0 rounded-md object-cover" />
        ) : b.href ? (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
            <FavIcon href={b.href} />
          </span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-[color:var(--ink-faded)]">
            <path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[color:var(--ink)]">
            <span className="min-w-0 flex-1">{b.title}</span>
            <span aria-hidden className="shrink-0 text-[11px] text-[color:var(--ink-faded)] transition-transform group-hover:translate-x-0.5">→</span>
          </span>
          {b.blurb && <span className="mt-0.5 block text-[12.5px] leading-snug text-[color:var(--ink-faded)]">{b.blurb}</span>}
        </span>
      </a>
    );
  }

  return (
    <div
      className="w-full"
      style={{ "--page-accent": "var(--page-amber)", "--page-accent-soft": "var(--page-amber-soft)" } as CSSProperties}
    >
      <div className="lg:flex lg:items-start">

        {/* Main content, a centered reading column between the two sidebars. */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-14">

            {/* Mobile module picker, the right rail is lg-only, so on small
                screens this strip is how you jump between recipes. */}
            <div className="lg:hidden -mx-5 mb-6 border-y border-[color:var(--ink-rule)]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-5 py-2">
          {steps.map((s) => {
            const isActive = s.step === activeStep;
            const isNumeric = /^\d+$/.test(s.step);
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => goToStep(s.step)}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors ${
                  isActive
                    ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)] font-semibold"
                    : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
                }`}
              >
                <span aria-hidden className="text-[12px]">{s.emoji ?? "•"}</span>
                <span className="font-mono tabular-nums text-[10.5px]">{isNumeric ? s.step : "·"}</span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

            {/* The intro step renders the course-landing instead of a lesson. */}
            {showIntro ? (
          <CourseIntro step={active} steps={steps} onStart={() => { markStepDone(active); goToStep(firstRecipe); }} onPick={(s) => { markStepDone(active); goToStep(s); }} />
        ) : (
        <div className="min-w-0">

          {/* Editorial recipe hero: big ghost number, phase kicker, title, lead. */}
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-faded)]">
                {isNumericStep ? `${PHASE_NAME[active.step] ?? "Cookbook"} · Recipe ${active.step}` : "Before you begin"}
              </span>
              {active.timeEstimate && (
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[color:var(--ink-faded)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                  </svg>
                  ~{active.timeEstimate}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-start gap-4 sm:gap-6">
              {isNumericStep && (
                <span aria-hidden className="hidden font-mono text-[64px] font-bold leading-[0.85] tracking-tight text-[color:var(--ink-rule)] sm:block">
                  {active.step}
                </span>
              )}
              <div className="min-w-0">
                <h1 className="text-[30px] sm:text-[40px] font-bold leading-[1.04] tracking-tight text-[color:var(--ink)]">
                  {active.title}
                </h1>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[color:var(--ink-soft)]">
                  {active.whatThis}
                </p>
              </div>
            </div>

            {/* Progress, momentum at a glance */}
            {mounted && activeItems.length > 0 && (
              <div className="mt-6 flex max-w-2xl items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--paper-soft)]">
                  <div className="h-full rounded-full bg-[color:var(--accent)] transition-all duration-500" style={{ width: `${Math.round((totalDone / activeItems.length) * 100)}%` }} />
                </div>
                <span className={`shrink-0 text-[12px] font-medium tabular-nums ${stepFinished ? "text-[color:var(--accent)]" : "text-[color:var(--ink-soft)]"}`}>
                  {stepFinished && <span aria-hidden>✓ </span>}{totalDone}/{activeItems.length}
                </span>
              </div>
            )}
          </header>

          {/* Outcome, a quiet inline rail, no boxed card. */}
          {active.tldr && (
            <div className="mb-8 max-w-2xl space-y-2.5 border-l-2 border-[color:var(--ink-rule)] pl-4">
              <p className="text-[14.5px] font-medium leading-snug text-[color:var(--ink)]">{active.tldr.accomplish}</p>
              <p className="text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Output</span>{" "}
                {active.tldr.deliverable}
              </p>
              <p className="text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Needs</span>{" "}
                {active.tldr.prerequisites.join(", ")}
              </p>
              {active.tldr.feedsInto && (
                <p className="text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Feeds into</span>{" "}
                  {active.tldr.feedsInto}
                </p>
              )}
            </div>
          )}

          {/* "Already set up?" skip hint, lets experienced devs move past a step */}
          {active.skipIf && (
            <div className="mb-6 flex flex-col gap-3 rounded-lg border border-dashed border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent)]">
                  <polygon points="13 19 22 12 13 5 13 19" /><polygon points="2 19 11 12 2 5 2 19" />
                </svg>
                <p className="text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                  <span className="font-semibold text-[color:var(--ink)]">Already set up?</span> {active.skipIf}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  markStepDone(active);
                  const i = steps.findIndex((s) => s.step === active.step);
                  const next = steps[i + 1];
                  if (next) goToStep(next.step);
                }}
                className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-3 py-2 text-[12.5px] font-semibold text-[color:var(--ink)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] sm:self-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Mark done &amp; skip
              </button>
            </div>
          )}

          {/* Per-recipe tabs, segmented control */}
          <div className="mb-7 inline-flex items-center gap-1 rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] p-1">
            {RECIPE_TABS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRecipeTab(key)}
                aria-current={recipeTab === key ? "true" : undefined}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  recipeTab === key
                    ? "bg-[color:var(--paper)] text-[color:var(--ink)] shadow-[0_1px_2px_rgba(0,0,0,0.07)]"
                    : "text-[color:var(--ink-faded)] hover:text-[color:var(--ink-soft)]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{tabIcon(key)}</svg>
                {label}
              </button>
            ))}
          </div>

          {recipeTab === "learn" && (active.learn && active.learn.length > 0 ? (
            (() => {
              const all = active.learn ?? [];
              const lead: LearnBlock[] = [];
              const sections: { heading: string; blocks: LearnBlock[] }[] = [];
              let cur: { heading: string; blocks: LearnBlock[] } | null = null;
              for (const blk of all) {
                if (blk.kind === "heading") { cur = { heading: blk.text, blocks: [] }; sections.push(cur); }
                else if (cur) cur.blocks.push(blk);
                else lead.push(blk);
              }
              return (
                <div className="max-w-2xl space-y-5">
                  {lead.length > 0 && <div className="space-y-4">{lead.map((blk, i) => renderLearnBlock(blk, i))}</div>}
                  {sections.map((sec, si) => (
                    <section key={si} className="rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      <div className="mb-3.5 flex items-center gap-2.5">
                        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{sectionIcon(sec.heading)}</svg>
                        </span>
                        <h3 className="text-[16px] font-semibold tracking-tight text-[color:var(--ink)]">{sec.heading}</h3>
                      </div>
                      <div className="space-y-4">{sec.blocks.map((blk, i) => renderLearnBlock(blk, i))}</div>
                    </section>
                  ))}
                </div>
              );
            })()
          ) : (
            <>
          {active.learnNote && active.learnNote.length > 0 && (
            <div className="mb-7 max-w-2xl space-y-4">
              {active.learnNote.map((para, i) => (
                <p key={i} className="text-body">{para}</p>
              ))}
            </div>
          )}

          {/* Intro video, with its title + length captioned underneath */}
          {featured && (
            <figure className="mb-8">
              <LessonVideo lesson={featured} />
              <figcaption className="mt-2.5 flex items-center justify-between gap-3 text-[12px]">
                <span className="truncate font-medium text-[color:var(--ink-soft)]">{featured.title}</span>
                {featured.duration && (
                  <span className="shrink-0 font-mono tabular-nums text-[color:var(--ink-faded)]">{featured.duration}</span>
                )}
              </figcaption>
            </figure>
          )}

          {/* Learn block, the videos for this recipe */}
          {lessons.length > 0 && (
            <section className="mb-8">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  Learn
                </p>
                <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                  {lessons.length.toString().padStart(2, "0")}
                </span>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {lessons.map((l, i) => (
                  <li key={i}>
                    <LessonCard
                      lesson={l}
                      active={!!l.youtubeId && i === Math.min(lessonIdx, lessons.length - 1)}
                      onPlay={l.youtubeId ? () => { setLessonIdx(i); window.scrollTo({ top: 0, behavior: "smooth" }); } : undefined}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Read, articles for this recipe, inside the Learn tab */}
          {related && related.articles.length > 0 && (
            <section className="mb-8">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M8.5 13h7M8.5 16.5h5" />
                  </svg>
                  Read
                </p>
                <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                  {related.articles.length.toString().padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-1">
                {related.articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/articles/${a.slug}`} className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-[color:var(--accent-soft)]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-[color:var(--ink-faded)]">
                        <path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      </svg>
                      <span className="flex-1 text-[13px] leading-snug text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)] group-hover:underline">{a.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
            </>
          ))}

          {recipeTab === "task" && (
            <>
          {/* Optional lead-in (e.g. "No idea yet? Start in the Learn tab") */}
          {active.taskIntro && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-4 py-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--paper)] text-[color:var(--accent)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
                </svg>
              </span>
              <p className="text-[13px] leading-relaxed text-[color:var(--ink)]">{active.taskIntro}</p>
            </div>
          )}

          {/* Must do, the required tasks that keep you building */}
          {mustGroups.length > 0 && (
            <section className="mb-8">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  Must do
                </p>
                {mounted && activeItems.length > 0 && (
                  <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                    {totalDone}/{activeItems.length}
                  </span>
                )}
              </div>
              {mustGroups.map((group, gi) => (
                <div key={gi} className="mb-6 last:mb-0">
                  {group.heading && group.heading !== "Must do" && (
                    <p className="mb-2 text-[12.5px] font-semibold text-[color:var(--ink-soft)]">{group.heading}</p>
                  )}
                  {group.description && <p className="mb-3 text-meta">{group.description}</p>}
                  <ol className="space-y-2.5">
                    {group.items.map(({ item, idx }, ii) => {
                      const key = `step-${active.step}-${idx}`;
                      return <TaskRow key={ii} index={idx + 1} item={item} done={!!checked[key]} onToggle={() => toggle(key)} />;
                    })}
                  </ol>
                </div>
              ))}
            </section>
          )}

          {/* Habits + troubleshooting (Build): standing practice / reference, not one-off checkboxes */}
          {[...habitGroups, ...troubleshootGroups].map((group, gi) => (
            <section key={gi} className="mb-8">
              <p className="mb-1 flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" />
                </svg>
                {group.heading ?? (group.tier === "troubleshoot" ? "Troubleshooting prompts" : "Habits")}
              </p>
              <p className="mb-3 text-meta">
                {group.tier === "troubleshoot"
                  ? "Ready-made prompts for when the AI drifts. Copy one when you need it."
                  : "Standing practice, not a one-time check. The loop reinforces these every cycle."}
              </p>
              <ul className="space-y-2.5">
                {group.items.map(({ item }, ii) => (
                  <li key={ii} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium leading-snug text-[color:var(--ink)]"><InlineCode text={item.text} /></span>
                      {item.detail && <span className="mt-0.5 block text-[12.5px] leading-snug text-[color:var(--ink-soft)]"><InlineCode text={item.detail} /></span>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Power up, optional, with an overwhelm guard */}
          {powerGroups.length > 0 && (
            <details className="group mb-8">
              <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open:rotate-90"><path d="M9 6l6 6-6 6" /></svg>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M13 2 3 14h7l-1 8 10-12h-7z" /></svg>
                  Power up
                </span>
                <span className="rounded-full bg-[color:var(--paper-soft)] px-2 py-0.5 text-[10px] text-[color:var(--ink-faded)]">optional</span>
              </summary>
              <p className="mb-3 mt-2 text-[12px] text-[color:var(--ink-faded)]">First time? Complete only Must do. Come back for Power up later.</p>
              {powerGroups.map((group, gi) => (
                <div key={gi} className="mb-6 last:mb-0">
                  {group.heading && group.heading !== "Power up" && (
                    <p className="mb-2 text-[12.5px] font-semibold text-[color:var(--ink-soft)]">{group.heading}</p>
                  )}
                  {group.description && <p className="mb-3 text-meta">{group.description}</p>}
                  <ol className="space-y-2.5">
                    {group.items.map(({ item, idx }, ii) => {
                      const key = `step-${active.step}-${idx}`;
                      return <TaskRow key={ii} index={idx + 1} item={item} done={!!checked[key]} onToggle={() => toggle(key)} />;
                    })}
                  </ol>
                </div>
              ))}
            </details>
          )}

          {/* Stuck? beginner rescue */}
          {active.stuck && (
            <details className="group mb-8 rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span className="text-[14px] font-semibold text-[color:var(--ink)]">Stuck?</span>
                <span aria-hidden className="text-[color:var(--ink-faded)] transition-transform group-open:rotate-90">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </span>
              </summary>
              <div className="space-y-3 px-4 pb-4 text-[13px]">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">Common mistakes</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-[color:var(--ink-soft)]">
                    {active.stuck.mistakes.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
                <p className="text-[color:var(--ink-soft)]"><span className="font-semibold text-[color:var(--ink)]">What success looks like:</span> {active.stuck.success}</p>
              </div>
            </details>
          )}

          {/* You can move on when, the single completion rule */}
          {active.moveOnWhen && (
            <div className="mb-8 rounded-xl border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">You can move on when</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--ink-soft)]">{active.moveOnWhen}</p>
            </div>
          )}
            </>
          )}

          {recipeTab === "faq" && (
            <section className="mb-8">
              {active.faqs && active.faqs.length > 0 ? (
                <div className="space-y-2.5">
                  {active.faqs.map(({ q, a }) => (
                    <details key={q} name="recipe-faq" className="group rounded-xl border border-[color:var(--ink-rule)] px-4 transition-colors hover:border-[color:var(--ink-soft)]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 [&::-webkit-details-marker]:hidden">
                        <span className="text-[15px] font-medium text-[color:var(--ink)]">{q}</span>
                        <span aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open:rotate-90">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      </summary>
                      <p className="text-body pb-4">{a}</p>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="vp-empty">
                  <p className="vp-empty-title">No FAQs for this recipe yet.</p>
                  <p className="vp-empty-body">
                    Got a question about this step?{" "}
                    <a href="https://github.com/dotsystemsdevs/vibe-prompt/issues/new" target="_blank" rel="noopener noreferrer" className="vp-link">Ask it on GitHub →</a>
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Step navigation, a clear path forward that also works on mobile where the rail is hidden */}
          <nav className="mt-14 grid grid-cols-2 gap-3 border-t border-[color:var(--ink-rule)] pt-6">
            {prevStep ? (
              <button type="button" onClick={() => goToStep(prevStep.step)} className="group flex items-center gap-3 rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[color:var(--ink-soft)] hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.18)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-faded)]">Previous</span>
                  <span className="block truncate text-[13.5px] font-semibold text-[color:var(--ink)]">{prevStep.title}</span>
                </span>
              </button>
            ) : <span aria-hidden />}
            {nextStep ? (
              <button type="button" onClick={() => goToStep(nextStep.step)} className={`group flex items-center justify-end gap-3 rounded-xl border px-4 py-3 text-right transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.2)] ${stepFinished ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]" : "border-[color:var(--ink-rule)] bg-[color:var(--paper)] hover:border-[color:var(--ink-soft)]"}`}>
                <span className="min-w-0">
                  <span className={`block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${stepFinished ? "text-[color:var(--accent)]" : "text-[color:var(--ink-faded)]"}`}>{stepFinished ? "Done, next up" : "Next"}</span>
                  <span className="block truncate text-[13.5px] font-semibold text-[color:var(--ink)]">{nextStep.title}</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${stepFinished ? "text-[color:var(--accent)]" : "text-[color:var(--ink-faded)]"}`}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </button>
            ) : <span aria-hidden />}
          </nav>

        </div>
            )}
          </div>
        </div>

        {/* Course content rail, flush to the right edge and styled like the
            left app sidebar (same bg + a mirrored divider), full height. */}
        <aside className="hidden lg:flex lg:flex-col w-[300px] shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-[color:var(--ink-rule)] bg-[color:var(--sidebar-bg)]">
          <CourseContentRail
            steps={steps}
            activeStep={activeStep}
            checked={checked}
            mounted={mounted}
            onSelect={goToStep}
          />
        </aside>
      </div>
    </div>
  );
}

/** A lesson card in the playlist,thumbnail (when embeddable) + play/read. */
function LessonCard({ lesson, active, onPlay }: { lesson: Lesson; active: boolean; onPlay?: () => void }) {
  const inner = (
    <>
      <span className="relative flex h-[52px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)]">
        {lesson.youtubeId ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={youtubeThumb(lesson.youtubeId)} alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/15" />
            <span className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-white/95">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5 text-[color:var(--ink)]"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </>
        ) : (
          <span aria-hidden className="text-[18px] text-[color:var(--ink-faded)]">{lesson.read ? "📄" : "▶"}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-faded)]">
            {lesson.read ? "Read" : "Watch"}
          </span>
          {lesson.duration && <span className="font-mono text-[10px] tabular-nums text-[color:var(--ink-faded)]">{lesson.duration}</span>}
          {active && <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--accent)]">Now playing</span>}
        </span>
        <span className="mt-0.5 line-clamp-2 text-[12.5px] font-medium leading-snug text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]">
          {lesson.title}
        </span>
      </span>
    </>
  );

  const cls = `group flex items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
    active ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)]" : "border-[color:var(--ink-rule)] hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)]"
  }`;

  // Embeddable → play inline; otherwise open the link out.
  if (onPlay) {
    return <button type="button" onClick={onPlay} className={`${cls} w-full`}>{inner}</button>;
  }
  return (
    <a href={lesson.href ?? "#"} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

function TaskRow({ item, done, onToggle, index }: { item: TaskItem; done: boolean; onToggle: () => void; index: number }) {
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) return;
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if ((e.target as HTMLElement).closest("a")) return;
            e.preventDefault();
            onToggle();
          }
        }}
        aria-pressed={done}
        className={`group flex items-start gap-3 cursor-pointer rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all ${
          done ? "opacity-60" : "hover:-translate-y-0.5 hover:border-[color:var(--ink-soft)] hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.18)]"
        }`}
      >
        <span aria-hidden className="mt-1 w-4 shrink-0 text-right font-mono text-[11px] tabular-nums leading-none text-[color:var(--ink-faded)]">
          {String(index).padStart(2, "0")}
        </span>

        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            done ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white" : "border-[color:var(--ink-rule)] group-hover:border-[color:var(--accent)]"
          }`}
        >
          {done && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        <div className="flex-1 min-w-0">
          <p className={`text-[14.5px] font-medium leading-[1.45] ${done ? "text-[color:var(--ink-faded)] line-through" : "text-[color:var(--ink)]"}`}>
            <InlineCode text={item.text} />
          </p>
          {!done && item.detail && (
            <p className="mt-1 text-[13px] leading-[1.55] text-[color:var(--ink-soft)]">
              <InlineCode text={item.detail} />
            </p>
          )}
          {!done && item.why && (
            <p className="mt-1 text-[12.5px] leading-snug text-[color:var(--ink-faded)]">
              <span className="font-semibold text-[color:var(--ink-soft)]">Why it matters:</span> {item.why}
            </p>
          )}
          {!done && (item.strongExample || item.weakExample) && (
            <div className="mt-2 space-y-1 text-[12px] leading-snug">
              {item.strongExample && (
                <p className="text-[color:var(--ink-soft)]"><span className="font-semibold" style={{ color: "var(--success)" }}>Strong:</span> {item.strongExample}</p>
              )}
              {item.weakExample && (
                <p className="text-[color:var(--ink-soft)]"><span className="font-semibold" style={{ color: "var(--page-red)" }}>Weak:</span> {item.weakExample}</p>
              )}
            </div>
          )}
          {!done && item.links && item.links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.links.map((link, li) => (
                <a
                  key={li}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-2 py-1 text-[12px] font-medium text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--ink)]"
                >
                  <FavIcon href={link.href} />
                  {link.label}
                  <span aria-hidden className="text-[10px] text-[color:var(--ink-faded)]">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
