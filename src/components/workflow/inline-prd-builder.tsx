"use client";

import { useEffect, useRef, useState } from "react";
import type { TaskItem } from "./workflow-stepper";

const STORAGE_KEY = "vibeprompt-prd-draft-v1";

type PRD = {
  targetUser: string;
  goal: string;
  why: string;
  features: string;
  outOfScope: string;
  successCriteria: string;
};

const EMPTY: PRD = {
  targetUser: "",
  goal: "",
  why: "",
  features: "",
  outOfScope: "",
  successCriteria: "",
};

const PLACEHOLDERS: Record<keyof PRD, string> = {
  targetUser:
    "A freelance designer with 3–5 active clients who keeps losing feedback threads in email and Slack.",
  goal: "A minimal client portal where freelancers collect and track feedback in one place.",
  why: "Cuts the time freelancers spend reconciling feedback by 70%. Reduces missed change requests, which is the #1 reason clients churn.",
  features:
    "1. Magic-link login for designer and client\n2. Project per client, file upload per project\n3. Threaded comments on each file with @-mentions\n4. Status per comment (open / resolved)\n5. Email digest of unread comments",
  outOfScope:
    "No user profiles or avatars\nNo notifications beyond the daily email digest\nNo admin dashboard\nNo billing / Stripe integration in v1\nNo mobile app",
  successCriteria:
    "1. A new freelancer signs up, creates a project, uploads a file, invites a client, and the client leaves a comment, all in under 5 minutes without support.\n2. Email digest delivers within 2 minutes of trigger.\n3. Zero unhandled exceptions in Sentry for the first 50 production sessions.",
};

function buildMarkdown(prd: PRD, productName: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const name = productName.trim() || "[Product Name]";
  const list = (s: string) =>
    s
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (/^[0-9]+\.\s|^-\s|^\*\s/.test(line) ? line : `- ${line}`))
      .join("\n");

  return `# PRD · ${name}

_Last updated ${today}_

## Target user
${prd.targetUser.trim() || "_one real person, one real situation_"}

## Goal
${prd.goal.trim() || "_what the product does in one sentence_"}

## Why this matters
${prd.why.trim() || "_business value + problem it solves_"}

## MVP features (max 5)
${prd.features.trim() ? list(prd.features) : "- _feature 1_\n- _feature 2_\n- _feature 3_"}

## Out of scope
${prd.outOfScope.trim() ? list(prd.outOfScope) : "- _explicit exclusion 1_\n- _explicit exclusion 2_\n- _explicit exclusion 3_"}

## Success criteria
${prd.successCriteria.trim() ? list(prd.successCriteria) : "- _testable condition 1_\n- _testable condition 2_"}

---

Generated with [vibeprompt](https://vibeprompt.tech).
`;
}

export function InlinePRDBuilder({ methodItems = [] }: { methodItems?: TaskItem[] }) {
  // Map each PRD field to the corresponding method-step item (by index).
  // The 7th step is the SAVE action; handled by the Download button below.
  const stepFor = (idx: number) => methodItems[idx];
  const [prd, setPrd] = useState<PRD>(EMPTY);
  const [productName, setProductName] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { prd?: Partial<PRD>; productName?: string };
        if (parsed.prd) setPrd({ ...EMPTY, ...parsed.prd });
        if (typeof parsed.productName === "string") setProductName(parsed.productName);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ prd, productName }));
    } catch {}
  }, [prd, productName, mounted]);

  function update<K extends keyof PRD>(field: K, value: string) {
    setPrd((prev) => ({ ...prev, [field]: value }));
  }

  function clear() {
    if (typeof window === "undefined") return;
    if (!confirm("Clear the entire PRD draft? This cannot be undone.")) return;
    setPrd(EMPTY);
    setProductName("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  function copy() {
    try {
      navigator.clipboard.writeText(buildMarkdown(prd, productName));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  function download() {
    const md = buildMarkdown(prd, productName);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PRD.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const filledCount = (Object.keys(prd) as (keyof PRD)[]).filter((k) => prd[k].trim().length > 0).length;

  return (
    <section>
      {/* Product name + filled counter, full-bleed, no card chrome */}
      <div className="flex flex-wrap items-baseline gap-3 mb-7">
        <p className="recipe-no shrink-0 text-[11px]">PRD ·</p>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="product name (becomes the title)"
          aria-label="Product name"
          className="cookbook-serif min-w-0 flex-1 bg-transparent border-b border-[color:var(--ink-rule)] pb-1 text-[16px] font-semibold text-[color:var(--ink)] placeholder:italic placeholder:font-normal placeholder:text-[color:var(--ink-faded)] focus:outline-none focus:border-[color:var(--ink)] transition-colors"
        />
        <p className="cookbook-serif shrink-0 text-[10.5px] italic text-[color:var(--ink-faded)] tabular-nums">
          {filledCount} / 6
        </p>
      </div>

      {/* Fields, flat list, no card chrome */}
      <div className="space-y-7">
        <div>
          <Field
            number="1"
            stepText={stepFor(0)?.text ?? "Target user"}
            stepDetail={stepFor(0)?.detail}
            value={prd.targetUser}
            onChange={(v) => update("targetUser", v)}
            placeholder={PLACEHOLDERS.targetUser}
            rows={2}
          />
        </div>
        <div>
          <Field
            number="2"
            stepText={stepFor(1)?.text ?? "Goal"}
            stepDetail={stepFor(1)?.detail}
            value={prd.goal}
            onChange={(v) => update("goal", v)}
            placeholder={PLACEHOLDERS.goal}
            rows={1}
          />
        </div>
        <div>
          <Field
            number="3"
            stepText={stepFor(2)?.text ?? "Why it matters"}
            stepDetail={stepFor(2)?.detail}
            value={prd.why}
            onChange={(v) => update("why", v)}
            placeholder={PLACEHOLDERS.why}
            rows={2}
          />
        </div>
        <div>
          <Field
            number="4"
            stepText={stepFor(3)?.text ?? "MVP features (max 5)"}
            stepDetail={stepFor(3)?.detail}
            value={prd.features}
            onChange={(v) => update("features", v)}
            placeholder={PLACEHOLDERS.features}
            rows={3}
          />
        </div>
        <div>
          <Field
            number="5"
            stepText={stepFor(4)?.text ?? "Out of scope"}
            stepDetail={stepFor(4)?.detail}
            value={prd.outOfScope}
            onChange={(v) => update("outOfScope", v)}
            placeholder={PLACEHOLDERS.outOfScope}
            rows={3}
          />
        </div>
        <div>
          <Field
            number="6"
            stepText={stepFor(5)?.text ?? "Success criteria"}
            stepDetail={stepFor(5)?.detail}
            value={prd.successCriteria}
            onChange={(v) => update("successCriteria", v)}
            placeholder={PLACEHOLDERS.successCriteria}
            rows={3}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[color:var(--ink-rule)] pt-4">
        <button
          onClick={download}
          className="btn-primary"
        >
          Download PRD.md ↓
        </button>
        <button
          onClick={copy}
          className="btn-secondary"
        >
          {copied ? "Copied ✓" : "Copy markdown"}
        </button>
        <button
          onClick={clear}
          className="cookbook-serif ml-auto text-[11px] italic text-[color:var(--ink-faded)] hover:text-[color:var(--ink)]"
        >
          Clear draft
        </button>
      </div>
    </section>
  );
}

/**
 * Textarea that grows to fit its content so the user never has to scroll
 * inside it. minRows sets the visual starting height when empty.
 */
function AutoGrowTextarea({
  value,
  onChange,
  placeholder,
  minRows,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minRows: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // Grow to fit content. Render the textarea, then size it to scrollHeight.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  });

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      rows={minRows}
      className="vp-input block overflow-hidden resize-none"
    />
  );
}

function Field({
  number,
  stepText,
  stepDetail,
  value,
  onChange,
  placeholder,
  rows = 2,
}: {
  number: string;
  stepText: string;
  stepDetail?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const filled = value.trim().length > 0;
  const typePrompt = rows === 1 ? "Type your answer..." : "Type your answer here...";
  return (
    <div className="vp-card vp-card-md">
      {/* Heading row: number badge + question + state */}
      <div className="flex items-baseline gap-3 mb-1.5">
        <span
          className={`shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-md text-[12px] font-bold tabular-nums transition-colors ${
            filled
              ? "bg-[color:var(--accent)] text-white"
              : "bg-[color:var(--paper-soft)] border-2 border-[color:var(--ink-rule)] text-[color:var(--ink-faded)]"
          }`}
        >
          {number}
        </span>
        <h4 className="flex-1 text-[15px] font-semibold leading-snug text-[color:var(--ink)] tracking-tight">
          {stepText}
        </h4>
        {filled && (
          <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold text-[color:var(--ink-faded)]">
            Filled
          </span>
        )}
      </div>
      {stepDetail && (
        <p className="ml-10 text-[12.5px] leading-snug text-[color:var(--ink-soft)]">
          {stepDetail}
        </p>
      )}

      {/* Example, clearly labeled, visually distinct */}
      {placeholder && (
        <div className="ml-10 mt-3 inline-flex items-start gap-2 bg-[color:var(--page)] border border-[color:var(--ink-rule)] rounded-md px-3 py-2 max-w-full">
          <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold text-[color:var(--ink-faded)] mt-0.5">
            Eg.
          </span>
          <span className="text-[12.5px] leading-snug text-[color:var(--ink-soft)] italic">
            {placeholder}
          </span>
        </div>
      )}

      {/* Typing area, clearly empty, clearly clickable */}
      <div className="ml-10 mt-3">
        {rows === 1 ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={typePrompt}
            aria-label={stepText}
            className="vp-input block cursor-text"
          />
        ) : (
          <AutoGrowTextarea
            value={value}
            onChange={onChange}
            placeholder={typePrompt}
            minRows={rows}
            ariaLabel={stepText}
          />
        )}
      </div>
    </div>
  );
}
