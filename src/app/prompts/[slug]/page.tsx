"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import { getPromptBySlug, MOCK_COMMENTS } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PromptPage({ params }: PageProps) {
  const { slug } = use(params);
  const prompt = getPromptBySlug(slug);

  const [copied, setCopied] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(prompt?.upvotes ?? 0);
  const [saved, setSaved] = useState(false);

  if (!prompt) notFound();

  function copyPrompt() {
    navigator.clipboard.writeText(prompt!.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/categories/${prompt.category}`} className="hover:text-foreground transition-colors">
          {prompt.categoryName}
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{prompt.title}</span>
      </nav>

      {/* Meta tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={`/categories/${prompt.category}`}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
        >
          {prompt.categoryName}
        </Link>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {prompt.difficulty}
        </span>
        {prompt.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground capitalize">
            {tool}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {prompt.title}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{prompt.useCase}</p>

      {/* Actions */}
      <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-border pb-8">
        <button
          onClick={() => { setUpvoteCount(n => upvoted ? n - 1 : n + 1); setUpvoted(!upvoted); }}
          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs transition-all ${
            upvoted ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          <svg className="h-3 w-3" fill={upvoted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
          {upvoteCount}
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs transition-all ${
            saved ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          <svg className="h-3 w-3" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {saved ? "Saved" : "Save"}
        </button>

        <span className="ml-auto text-xs text-muted-foreground">
          @{prompt.author}
        </span>
      </div>

      {/* When to use */}
      <div className="mb-8">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">When to use</p>
        <p className="text-sm leading-relaxed">{prompt.whenToUse}</p>
      </div>

      {/* The prompt */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Prompt</p>
          <button
            onClick={copyPrompt}
            className={`text-xs transition-colors ${copied ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {copied ? "Copied ✓" : "Copy →"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-border bg-card p-5 text-xs leading-relaxed whitespace-pre-wrap font-mono text-foreground">
          {prompt.prompt}
        </pre>
      </div>

      {/* Output example */}
      {prompt.outputExample && (
        <div className="mb-8">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">Output example</p>
          <div className="rounded-lg border border-border bg-card p-5">
            <pre className="whitespace-pre-wrap text-xs text-muted-foreground leading-relaxed font-sans">
              {prompt.outputExample}
            </pre>
          </div>
        </div>
      )}

      {/* Notes */}
      {prompt.notes && (
        <div className="mb-10 border-l-2 border-foreground pl-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Note</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{prompt.notes}</p>
        </div>
      )}

      {/* Tags */}
      <div className="mb-12 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>

      {/* Comments */}
      <div className="border-t border-border pt-10">
        <p className="mb-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          Comments ({MOCK_COMMENTS.length})
        </p>

        <div className="mb-6 border border-dashed border-border p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Sign in to comment.{" "}
            <button className="text-foreground underline underline-offset-2">Sign in →</button>
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {MOCK_COMMENTS.map((comment) => (
            <div key={comment.id} className="flex gap-4 py-5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-foreground">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="mb-1.5 flex items-center gap-3">
                  <span className="text-xs font-medium">@{comment.author}</span>
                  <span className="text-[10px] text-muted-foreground">{comment.createdAt}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{comment.content}</p>
                <button className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  ↑ {comment.upvotes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center">
        <button className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          Report prompt
        </button>
      </div>
    </div>
  );
}
