"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { StepData, StepRelated, TaskItem } from "./workflow-stepper";
import { LIST_CATEGORY_LABEL } from "@/lib/list-problems";

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

/** "Learn" / "Watch" / "Read" groups move out of the checklist into the rail. */
function isLearnHeading(heading?: string): boolean {
  return /^(learn|watch|read)\b/i.test((heading ?? "").trim());
}

/** A friendly emoji for each task-group heading, so sections feel lively. */
function headingEmoji(heading: string): string {
  const k = heading.trim().toLowerCase();
  if (k.includes("learn") || k.includes("read") || k.includes("watch")) return "📚";
  if (k.includes("checklist") || k.includes("task")) return "✅";
  if (k.includes("how") || k.includes("use")) return "📖";
  if (k.includes("setup") || k.includes("environment") || k.includes("install")) return "🧰";
  if (k.includes("ship") || k.includes("launch") || k.includes("deploy")) return "🚀";
  if (k.includes("test") || k.includes("debug") || k.includes("fix")) return "🔧";
  return "📋";
}

interface WorkflowCookbookProps {
  steps: StepData[];
  relatedByStep?: Record<string, StepRelated>;
}

export function WorkflowCookbook({ steps, relatedByStep }: WorkflowCookbookProps) {
  const [activeStep, setActiveStep] = useState<string>(steps[0]?.step ?? "intro");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

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

  // Sync active step from URL hash (sidebar links + prev/next both update the hash)
  useEffect(() => {
    function apply(scroll: boolean) {
      const hash = window.location.hash.replace(/^#/, "");
      const match = /^step-([a-z0-9-]+)$/i.exec(hash);
      if (match && steps.some((s) => s.step === match[1])) {
        setActiveStep(match[1]);
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

  function stepComplete(stepId: string): boolean {
    const step = steps.find((s) => s.step === stepId);
    if (!step) return false;
    // Mirror the checklist: Learn groups are resources, not checkable tasks.
    const items = step.tasks.filter((g) => !isLearnHeading(g.heading)).flatMap((g) => g.items);
    if (items.length === 0) return false;
    return items.every((_, i) => checked[`step-${stepId}-${i}`]);
  }

  const active = steps.find((s) => s.step === activeStep) ?? steps[0];
  const activeIdx = steps.findIndex((s) => s.step === activeStep);
  const prev = activeIdx > 0 ? steps[activeIdx - 1] : null;
  const next = activeIdx < steps.length - 1 ? steps[activeIdx + 1] : null;
  // Flatten every task with its STABLE storage index, then split the "Learn"
  // group(s) off so videos live in the side rail instead of the checklist.
  // (Storage keys stay `step-<id>-<flatIndex>` so saved progress never shifts.)
  let flatCursor = 0;
  const flatGroups = active.tasks.map((g) => {
    const items = g.items.map((item, ii) => ({ item, idx: flatCursor + ii }));
    flatCursor += g.items.length;
    return { heading: g.heading, description: g.description, items, learn: isLearnHeading(g.heading) };
  });
  const actionableGroups = flatGroups.filter((g) => !g.learn);
  const learnGroups = flatGroups.filter((g) => g.learn);

  const activeItems = actionableGroups.flatMap((g) => g.items);
  const totalDone = mounted
    ? activeItems.filter(({ idx }) => checked[`step-${active.step}-${idx}`]).length
    : 0;
  // The step counts as finished when every actionable task is checked.
  const stepFinished = mounted && activeItems.length > 0 && totalDone === activeItems.length;
  // Next button stays muted (and shows no checkmark) until the step is actually
  // finished — including before hydration and on task-less steps.
  const needsWork = !stepFinished;
  const related = relatedByStep?.[active.step];

  // Tools & links — unique links from the ACTIONABLE tasks only (no videos).
  const stepLinks = (() => {
    const seen = new Set<string>();
    const out: { href: string; label: string }[] = [];
    for (const g of actionableGroups) {
      for (const { item } of g.items) {
        if (!item.links) continue;
        for (const l of item.links) {
          if (seen.has(l.href)) continue;
          seen.add(l.href);
          out.push({ href: l.href, label: l.label });
        }
      }
    }
    return out;
  })();

  // Learn — the watch/read videos, shown with their real titles in the rail.
  const learnLinks = learnGroups
    .flatMap((g) => g.items)
    .map(({ item }) => ({
      title: item.text.replace(/^(Watch|Read):\s*/i, ""),
      href: item.links?.[0]?.href ?? null,
      watch: /^watch/i.test(item.text),
    }))
    .filter((x): x is { title: string; href: string; watch: boolean } => !!x.href);

  const hasRelated = !!related && (related.articles.length > 0 || related.fixes.length > 0);

  return (
    <div
      className="w-full"
      style={{ "--page-accent": "var(--page-amber)", "--page-accent-soft": "var(--page-amber-soft)" } as CSSProperties}
    >

      {/* Step picker — horizontal scrollable strip, only on smaller screens
          where the app sidebar isn't visible. On lg+ the app sidebar already
          shows all steps expanded under Cookbook. */}
      <div className="lg:hidden -mx-5 mb-6 border-y border-[color:var(--ink-rule)]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-5 py-2">
          {steps.map((s) => {
            const isActive = s.step === activeStep;
            const isDone = mounted && !isActive && stepComplete(s.step);
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
                    : isDone
                    ? "text-[color:var(--ink-faded)] hover:bg-[color:var(--sidebar-hover)]"
                    : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
                }`}
              >
                <span aria-hidden className="text-[12px]">
                  {isDone ? "✓" : s.emoji ?? "•"}
                </span>
                <span className="font-mono tabular-nums text-[10.5px]">
                  {isNumeric ? s.step : "·"}
                </span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-column: recipe (left) + sticky resources aside (right) */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(220px,24vw,300px)] lg:items-start lg:gap-8">

        {/* Main column — active recipe */}
        <div className="min-w-0">

        {/* Recipe header card */}
        <header
          className={`relative mb-6 overflow-hidden rounded-xl border bg-[color:var(--paper)] transition-colors ${
            stepFinished ? "border-[color:var(--accent)]" : "border-[color:var(--ink-rule)]"
          }`}
        >
          {/* Subtle accent wash for a touch of depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--page-accent-soft)] via-transparent to-transparent"
          />

          <div className="relative p-5 sm:p-6">
            <div className="flex items-start gap-4">
              {active.emoji && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--page-accent-soft)] text-[24px] leading-none shadow-[0_1px_2px_rgba(33,31,28,0.06)]">
                  <span aria-hidden>{active.emoji}</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--page-accent)]">
                  {/^\d+$/.test(active.step) ? `Recipe ${active.step}` : "Before you begin"}
                </span>
                <h2 className="mt-1.5 text-[26px] sm:text-[32px] font-bold leading-[1.1] tracking-tight text-[color:var(--ink)]">
                  {active.title}
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-body">
              {active.whatThis}
              {active.why && (
                <>
                  {" "}
                  <span className="text-[color:var(--ink-faded)]">{active.why}</span>
                </>
              )}
            </p>

            {(active.timeEstimate || activeItems.length > 0) && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {active.timeEstimate && (
                  <span className="vp-badge vp-badge-outline">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    ~{active.timeEstimate}
                  </span>
                )}
                {activeItems.length > 0 && (
                  <span className="vp-badge vp-badge-outline">{activeItems.length} tasks</span>
                )}
                {mounted && activeItems.length > 0 && totalDone > 0 && (
                  <span className={`vp-badge ${stepFinished ? "vp-badge-accent" : ""}`}>
                    {stepFinished ? "✓ " : ""}{totalDone}/{activeItems.length} done
                  </span>
                )}
              </div>
            )}

            {activeItems.length > 0 && mounted && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--accent-soft)]">
                <div
                  className="h-full rounded-full bg-[color:var(--accent)] transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((totalDone / activeItems.length) * 100))}%` }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Task groups — Learn is split out into the side rail */}
        {actionableGroups.map((group, gi) => {
          return (
            <section key={gi} className="mb-4 overflow-hidden rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
              {group.heading && (
                <div className="flex items-center justify-between gap-3 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5 sm:px-5">
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                    <span aria-hidden className="text-[12px] leading-none">{headingEmoji(group.heading)}</span>
                    {group.heading}
                  </p>
                  <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                    {group.items.length.toString().padStart(2, "0")}
                  </span>
                </div>
              )}
              {group.description && (
                <p className="px-4 pt-3.5 text-meta sm:px-5">
                  {group.description}
                </p>
              )}
              <ol className="divide-y divide-[color:var(--ink-rule)]">
                {group.items.map(({ item, idx }, ii) => {
                  const key = `step-${active.step}-${idx}`;
                  const done = !!checked[key];
                  return <TaskRow key={ii} index={idx + 1} item={item} done={done} onToggle={() => toggle(key)} />;
                })}
              </ol>
            </section>
          );
        })}

        {/* Prev / Next nav — large, tactile step controls */}
        <nav className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <button
              onClick={() => goToStep(prev.step)}
              aria-label={`Previous: ${prev.title}`}
              className="group flex items-center gap-3.5 rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)] p-3.5 text-left transition-all hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)]"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] text-[18px] leading-none text-[color:var(--ink-soft)] transition-transform group-hover:-translate-x-0.5 group-hover:text-[color:var(--ink)]"
              >
                ←
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-faded)]">
                  Previous
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold text-[color:var(--ink)]">
                  {prev.emoji && <span aria-hidden className="shrink-0 text-[14px] leading-none">{prev.emoji}</span>}
                  <span className="truncate">
                    {/^\d+$/.test(prev.step) ? `${prev.step} · ${prev.title}` : prev.title}
                  </span>
                </span>
              </span>
            </button>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}

          {next ? (
            <button
              onClick={() => goToStep(next.step)}
              aria-label={`Next: ${next.title}${needsWork ? " (finish this step first)" : ""}`}
              className={`group flex items-center justify-end gap-3.5 rounded-xl p-3.5 text-right transition-all ${
                needsWork
                  ? "border border-[color:var(--ink-rule)] bg-[color:var(--paper)] hover:border-[color:var(--ink-soft)] hover:bg-[color:var(--paper-soft)]"
                  : "border border-[color:var(--accent)] bg-[color:var(--accent)] shadow-[0_3px_14px_rgba(33,31,28,0.16)] hover:bg-[color:var(--accent-hover)]"
              }`}
            >
              <span className="flex min-w-0 flex-col items-end">
                <span
                  className={`flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                    needsWork ? "text-[color:var(--ink-faded)]" : "text-white/70"
                  }`}
                >
                  {!needsWork && <span aria-hidden>✓</span>}
                  Next up
                </span>
                <span
                  className={`mt-0.5 flex items-center gap-1.5 text-[14px] font-semibold ${
                    needsWork ? "text-[color:var(--ink)]" : "text-white"
                  }`}
                >
                  {next.emoji && <span aria-hidden className="shrink-0 text-[14px] leading-none">{next.emoji}</span>}
                  <span className="truncate">
                    {/^\d+$/.test(next.step) ? `${next.step} · ${next.title}` : next.title}
                  </span>
                </span>
              </span>
              <span
                aria-hidden
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[18px] leading-none transition-transform group-hover:translate-x-0.5 ${
                  needsWork
                    ? "border border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)]"
                    : "bg-white/15 text-white"
                }`}
              >
                →
              </span>
            </button>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}
        </nav>
        </div>

        {/* Resources aside — same boxed shell as the checklist sections */}
        <aside className="mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-6 space-y-4">

            {/* Tools & links pulled straight from this recipe's tasks */}
            {stepLinks.length > 0 && (
              <section className="overflow-hidden rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
                <div className="flex items-center justify-between gap-3 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5">
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                    <span aria-hidden className="text-[12px] leading-none">🧰</span>
                    Tools &amp; links
                  </p>
                  <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                    {stepLinks.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <ul className="space-y-0.5 p-2">
                  {stepLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-[color:var(--accent-soft)]"
                      >
                        <FavIcon href={link.href} />
                        <span className="flex-1 truncate text-[12.5px] text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--ink)]">
                          {link.label}
                        </span>
                        <span aria-hidden className="shrink-0 text-[10px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink)]">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Learn — watch/read videos lifted out of the checklist */}
            {learnLinks.length > 0 && (
              <section className="overflow-hidden rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
                <div className="flex items-center justify-between gap-3 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5">
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                    <span aria-hidden className="text-[12px] leading-none">🎥</span>
                    Learn
                  </p>
                  <span className="font-mono text-[10.5px] tabular-nums text-[color:var(--ink-faded)]">
                    {learnLinks.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <ul className="space-y-0.5 p-2">
                  {learnLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[color:var(--accent-soft)]"
                      >
                        <span className="mt-0.5 shrink-0">
                          <FavIcon href={l.href} />
                        </span>
                        <span className="flex-1 text-[12.5px] leading-snug text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--ink)] group-hover:underline">
                          {l.title}
                        </span>
                        <span aria-hidden className="mt-0.5 shrink-0 text-[10px] text-[color:var(--ink-faded)] transition-colors group-hover:text-[color:var(--ink)]">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related reading from the library */}
            {hasRelated && (
              <section className="overflow-hidden rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
                <div className="flex items-center gap-1.5 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5">
                  <span aria-hidden className="text-[12px] leading-none">📚</span>
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                    Related reading
                  </p>
                </div>
                <div className="p-2">
                  {related!.articles.length > 0 && (
                    <ul className="space-y-0.5">
                      {related!.articles.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/articles/${a.slug}`}
                            className="group flex items-start gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[color:var(--accent-soft)]"
                          >
                            <span aria-hidden className="shrink-0 mt-0.5 text-[13px] leading-none">📄</span>
                            <span className="flex-1 text-[12.5px] leading-snug text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)] group-hover:underline">
                              {a.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {related!.fixes.length > 0 && (
                    <>
                      <p className="mb-1 mt-3 flex items-center gap-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.10em] text-[color:var(--ink-faded)]">
                        <span aria-hidden className="text-[11px] leading-none">🔧</span>
                        When it breaks
                      </p>
                      <ul className="space-y-0.5">
                        {related!.fixes.map((f) => (
                          <li key={f.id}>
                            <Link
                              href={`/fixes/${f.id}`}
                              className="group flex items-start gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[color:var(--accent-soft)]"
                            >
                              <span aria-hidden className="shrink-0 mt-0.5 text-[13px] leading-none">🛠️</span>
                              <span className="flex-1 text-[12.5px] leading-snug text-[color:var(--ink-soft)] group-hover:text-[color:var(--ink)] group-hover:underline">
                                {f.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Fallback — a contents list so the rail is never empty */}
            {stepLinks.length === 0 && learnLinks.length === 0 && !hasRelated && (
              <section className="overflow-hidden rounded-xl border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
                <div className="flex items-center gap-1.5 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5">
                  <span aria-hidden className="text-[12px] leading-none">📋</span>
                  <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                    In this recipe
                  </p>
                </div>
                <ol className="space-y-1.5 p-3">
                  {activeItems.map(({ item }, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden className="mt-px font-mono text-[10.5px] tabular-nums leading-snug text-[color:var(--ink-faded)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[12.5px] leading-snug text-[color:var(--ink-soft)]">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

          </div>
        </aside>
      </div>
    </div>
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
        className={`group flex items-start gap-3 cursor-pointer px-4 py-4 transition-colors sm:px-5 ${
          done ? "opacity-55" : "hover:bg-[color:var(--accent-soft)]"
        }`}
      >
        {/* Mono index */}
        <span
          aria-hidden
          className="mt-1 w-4 shrink-0 text-right font-mono text-[11px] tabular-nums leading-none text-[color:var(--ink-faded)]"
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* Checkbox */}
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            done
              ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
              : "border-[color:var(--ink-rule)] group-hover:border-[color:var(--accent)]"
          }`}
        >
          {done && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L4 7L9 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-[14.5px] font-medium leading-[1.45] ${
              done ? "text-[color:var(--ink-faded)] line-through" : "text-[color:var(--ink)]"
            }`}
          >
            <InlineCode text={item.text} />
          </p>
          {!done && item.detail && (
            <p className="mt-1 text-[13px] leading-[1.55] text-[color:var(--ink-soft)]">
              <InlineCode text={item.detail} />
            </p>
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
