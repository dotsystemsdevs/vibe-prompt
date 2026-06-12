"use client";

import { useState } from "react";

/** Copy the failure + fix as a paste-ready block, and share the page. */
export function FixActions({ title, answer, path }: { title: string; answer: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const url = `https://vibeprompt.tech${path}`;

  async function copy() {
    const block = `I hit this AI build failure: "${title}".\n\nThe field-tested fix:\n${answer}\n\nSource: ${url}`;
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: `${title} — vibeprompt`, url });
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      /* no-op */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button type="button" onClick={copy} className="btn-secondary">
        {copied ? "✓ Copied" : "Copy fix"}
      </button>
      <button type="button" onClick={share} className="btn-ghost">
        {shared ? "✓ Link copied" : "Share ↗"}
      </button>
    </div>
  );
}
