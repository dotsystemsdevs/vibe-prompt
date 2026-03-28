"use client";

import { useState } from "react";
import { incrementDownvote, getDownvotes, SLOP_THRESHOLD } from "@/lib/votes";

interface PromptActionsProps {
  slug: string;
  promptText: string;
  initialUpvotes: number;
}

export function PromptActions({ slug, promptText, initialUpvotes }: PromptActionsProps) {
  const [copied, setCopied] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);
  const [saved, setSaved] = useState(false);
  const [downvoteCount, setDownvoteCount] = useState(() => getDownvotes(slug));
  const [downvoted, setDownvoted] = useState(false);

  const isSlop = downvoteCount >= SLOP_THRESHOLD;

  function copy() {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downvote() {
    if (downvoted) return;
    const next = incrementDownvote(slug);
    setDownvoteCount(next);
    setDownvoted(true);
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-4">
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => {
              setUpvoteCount((count) => (upvoted ? count - 1 : count + 1));
              setUpvoted((value) => !value);
            }}
            title="Upvote"
            className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
              upvoted ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className={`h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 ${upvoted ? "fill-current" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
            <span className="tabular-nums">{upvoteCount}</span>
          </button>

          <button
            onClick={downvote}
            disabled={downvoted}
            title="Mark as slop"
            className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
              downvoted ? "text-muted-foreground/40" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            {downvoteCount > 0 && <span className="tabular-nums">{downvoteCount}</span>}
          </button>

          <button
            onClick={() => setSaved((value) => !value)}
            title={saved ? "Saved" : "Save"}
            className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
              saved ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${saved ? "fill-current" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <span>{saved ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={copy}
            className={`px-3 py-1.5 text-xs transition-colors ${
              copied ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      {isSlop && (
        <div className="mb-8 border border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">This prompt has been flagged as slop by the community.</p>
        </div>
      )}
    </>
  );
}

