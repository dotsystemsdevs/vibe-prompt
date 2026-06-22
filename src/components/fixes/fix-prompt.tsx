"use client";

import { useState } from "react";

/**
 * The "prompt to paste" block on a fix page. Shows the ready-to-use prompt and
 * a one-tap copy. This is the thing you paste into your AI to apply the fix.
 */
export function FixPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked, no-op */
    }
  }

  return (
    <div className="overflow-hidden border border-[color:var(--ink-rule)]">
      <div className="flex items-center justify-between gap-3 border-b border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)] px-4 py-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-faded)]">
          Prompt to paste
        </span>
        <button
          type="button"
          onClick={copy}
          className="text-[12px] font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <p className="whitespace-pre-line px-4 py-4 text-[15px] leading-[1.7] text-[color:var(--ink)]">
        {prompt}
      </p>
    </div>
  );
}
