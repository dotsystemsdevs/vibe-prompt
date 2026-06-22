import type { StepData, LearnBlock } from "./workflow-stepper";
import type { Lesson } from "./lesson-video";

/** "Learn" / "Watch" / "Read" groups are lessons (videos), not checkable tasks. */
export function isLearnHeading(heading?: string): boolean {
  return /^(learn|watch|read)\b/i.test((heading ?? "").trim());
}

/** A friendly emoji for each task-group heading, so sections feel lively. */
export function headingEmoji(heading: string): string {
  const k = heading.trim().toLowerCase();
  if (k.includes("learn") || k.includes("read") || k.includes("watch")) return "📚";
  if (k.includes("checklist") || k.includes("task")) return "✅";
  if (k.includes("how") || k.includes("use")) return "📖";
  if (k.includes("setup") || k.includes("environment") || k.includes("install")) return "🧰";
  if (k.includes("ship") || k.includes("launch") || k.includes("deploy")) return "🚀";
  if (k.includes("test") || k.includes("debug") || k.includes("fix")) return "🔧";
  return "📋";
}

/** Every watch/read item in a step, normalised into lessons for the player + rail. */
export function lessonsForStep(step: StepData): Lesson[] {
  // Learn blocks are the single source of truth for a recipe's video lessons.
  // Fall back to the legacy "Learn" task group only for steps without `learn`.
  if (step.learn && step.learn.length > 0) {
    return step.learn
      .filter((b): b is Extract<LearnBlock, { kind: "video" }> => b.kind === "video")
      .map((b) => ({
        title: b.title,
        youtubeId: b.youtubeId,
        href: b.href,
        duration: b.duration,
        read: false,
      }));
  }
  return step.tasks
    .filter((g) => isLearnHeading(g.heading))
    .flatMap((g) => g.items)
    .map((item) => ({
      title: item.text.replace(/^(Watch|Read):\s*/i, ""),
      youtubeId: item.youtubeId,
      href: item.links?.[0]?.href,
      duration: item.duration,
      read: /^read/i.test(item.text),
    }));
}

/**
 * Done/total for the ACTIONABLE tasks of a step (videos excluded,they're
 * lessons, not checkboxes). `checked` is the localStorage progress map; keys
 * stay `step-<id>-<flatIndex>` against the step's full flattened task list.
 */
export function stepTaskStats(
  step: StepData,
  checked: Record<string, boolean>
): { total: number; done: number } {
  let flatCursor = 0;
  let total = 0;
  let done = 0;
  for (const group of step.tasks) {
    const learn = isLearnHeading(group.heading);
    group.items.forEach((_, i) => {
      const idx = flatCursor + i;
      if (!learn) {
        total += 1;
        if (checked[`step-${step.step}-${idx}`]) done += 1;
      }
    });
    flatCursor += group.items.length;
  }
  return { total, done };
}
