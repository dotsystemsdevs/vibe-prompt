"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const PHASES = [
  "Validate",
  "Specify",
  "Design",
  "Context Setup",
  "Build in Loops",
  "Quality Gates",
  "Ship",
  "Iterate",
] as const;

const QUICK_START = [
  {
    step: "01",
    title: "Validate",
    duration: "20–30 min",
    action:
      "Research market demand, competitors, and technical feasibility. Define kill criteria — what would stop the build. Skip this and you risk building the wrong thing.",
    output: "research.md",
  },
  {
    step: "02",
    title: "Specify",
    duration: "15–20 min",
    action:
      "Write a PRD: problem statement, target user, MVP scope, acceptance criteria, explicit out-of-scope list, and success metrics. Ambiguity here becomes bugs later.",
    output: "PRD-[app]-MVP.md",
  },
  {
    step: "03",
    title: "Design",
    duration: "15–20 min",
    action:
      "Choose the simplest stack that ships. Pin versions. Document architecture boundaries and key decisions. AI should never choose the stack autonomously.",
    output: "TechDesign-[app].md",
  },
  {
    step: "04",
    title: "Context Setup",
    duration: "1–5 min",
    action:
      "Create AGENTS.md or CLAUDE.md with project rules, conventions, and protected areas. Set up a memory bank (spec, stack, plan, progress, architecture). This is what separates coherent AI sessions from drift.",
    output: "AGENTS.md + agent_docs/",
  },
  {
    step: "05",
    title: "Build in Loops",
    duration: "hours",
    action:
      "One granular step at a time. Break your implementation plan into 20–30 focused prompts. Run Plan → Execute → Verify per step. Reset context between tasks. Commit after every verified step.",
    output: "Working feature per loop",
  },
  {
    step: "06",
    title: "Quality Gates",
    duration: "30–60 min",
    action:
      "Review against spec. Security audit. Unit + integration tests. AI cannot self-correct reliably — this gate is yours. Don't ship without it.",
    output: "REVIEW-CHECKLIST.md",
  },
  {
    step: "07",
    title: "Ship & Observe",
    duration: "ongoing",
    action:
      "Deploy. Monitor metrics. Collect real user feedback. Vibe deploying means getting to a real environment fast so feedback comes from users, not local demos.",
    output: "Deploy + metrics baseline",
  },
  {
    step: "08",
    title: "Iterate",
    duration: "ongoing",
    action:
      "Feedback loops back to Specify for new scope or directly to Build for tweaks and bugs. The loop never ends — the artifacts just get sharper.",
    output: "Updated PRD / new loop",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Human controls the plan",
    detail:
      "AI executes, never plans autonomously. If you let AI plan your codebase, it becomes an unmanageable mess within days.",
  },
  {
    title: "Context engineering > prompts",
    detail:
      "More structured context means fewer failures. Most AI breakdowns come from insufficient context, not model limitations.",
  },
  {
    title: "Incremental steps only",
    detail:
      "One granular, testable step at a time. A 30-step implementation plan outperforms a single giant request every time.",
  },
  {
    title: "External quality gates",
    detail:
      "AI cannot reliably self-correct. You review against spec. You run the tests. The gate is external or it doesn't exist.",
  },
  {
    title: "Artifacts-first",
    detail:
      "Decisions live in files — PRD, TechDesign, AGENTS.md — not in chat history. Context resets; files don't.",
  },
  {
    title: "Git-first",
    detail:
      "Commit after every verified step. Rollback is always safe. Without this, a bad AI pass can take down an hour of work.",
  },
  {
    title: "Context resets between tasks",
    detail:
      "Use /clear between features. Long context degrades quality. A fresh session with loaded artifacts beats a stale 200k-token thread.",
  },
  {
    title: "Right-size complexity",
    detail:
      "Simplest stack that solves the real problem. Overengineering is the most common vibe coding failure mode after skipping planning.",
  },
] as const;

const ARTIFACTS = [
  { phase: "Validate", file: "research.md" },
  { phase: "Specify", file: "PRD-[app]-MVP.md" },
  { phase: "Design", file: "TechDesign-[app].md" },
  { phase: "Context Setup", file: "AGENTS.md + agent_docs/" },
  { phase: "Build in Loops", file: "commits per verified step" },
  { phase: "Quality Gates", file: "REVIEW-CHECKLIST.md" },
  { phase: "Ship", file: "deploy + metrics baseline" },
  { phase: "Iterate", file: "updated PRD / backlog" },
] as const;

const TROUBLESHOOTING = [
  {
    issue: "AI ignores your docs",
    fix: 'Say: "Read AGENTS.md, PRD, and TechDesign. Summarize the requirements before writing any code."',
  },
  {
    issue: "Code doesn't match PRD",
    fix: 'Say: "Re-read the PRD section for this feature, list the acceptance criteria, then refactor to match."',
  },
  {
    issue: "Solution is overcomplicated",
    fix: 'Add to AGENTS.md: "Prioritize MVP scope and the simplest working implementation. No premature abstraction."',
  },
  {
    issue: "Quality drifts across sessions",
    fix: "Reset context. Reload AGENTS.md and PRD at the start of each new session. Artifacts beat memory.",
  },
  {
    issue: "Deployment is failing",
    fix: 'Say: "Run the deployment checklist step by step, verify all env vars, then execute health checks."',
  },
  {
    issue: "AI keeps adding unwanted changes",
    fix: 'Say: "Only implement what is explicitly requested. Do not refactor, rename, or improve anything outside the task scope."',
  },
] as const;

const PLATFORM_TOOLS: Record<"web" | "app", { label: string; focus: string; tools: readonly string[] }> = {
  web: {
    label: "🌐 Web / SaaS",
    focus: "Lovable and v0 for rapid prototyping. Cursor or Claude Code for production feature work.",
    tools: ["Lovable", "v0", "Cursor", "Claude Code", "aider"],
  },
  app: {
    label: "📱 Mobile App",
    focus: "Cursor or Claude Code for native logic. Use Lovable for companion web flows.",
    tools: ["Cursor", "Claude Code", "React Native stacks", "Windsurf"],
  },
};

export default function WorkflowPage() {
  const [track, setTrack] = useState<"web" | "app">("web");
  const guide = useMemo(() => PLATFORM_TOOLS[track], [track]);

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="border-b border-border px-6 py-16">
          <p className="hero-kicker mb-4">Workflow</p>
          <h1 className="hero-display">
            The vibe coding
            <br />
            workflow.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            8 phases. 8 principles. Synthesized from the most-referenced vibe coding repos.
            Designed to go from raw idea to shippable product without losing your codebase.
          </p>
        </div>

        {/* Track filter */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="mr-2 text-[10px] uppercase tracking-widest text-muted-foreground">Track</span>
            {(["web", "app"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={`border px-3 py-1.5 text-xs transition-colors ${
                  track === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {PLATFORM_TOOLS[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Phase overview */}
        <div className="border-b border-border px-6 py-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">8 Phases</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {PHASES.map((phase, i) => (
              <div key={phase} className="inline-flex items-center gap-2">
                <span className="border border-border px-2 py-1 text-xs text-muted-foreground">{phase}</span>
                {i < PHASES.length - 1 && <span className="text-xs text-muted-foreground/40">→</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{guide.focus}</p>
        </div>

        {/* Step by step */}
        <div className="border-b border-border">
          <div className="border-b border-border px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Step by Step</p>
          </div>
          <div className="divide-y divide-border">
            {QUICK_START.map((item) => (
              <div key={item.step} className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
                <div className="border-r border-border px-6 py-8">
                  <span className="text-[10px] tabular-nums text-muted-foreground/40">{item.step}</span>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{item.duration}</p>
                  <p className="mt-3 text-xs font-medium text-foreground">{item.title}</p>
                </div>
                <div className="px-6 py-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.action}</p>
                  <p className="mt-3 text-xs text-muted-foreground/60">Output: {item.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8 Principles */}
        <div className="border-b border-border">
          <div className="border-b border-border px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">8 Principles</p>
          </div>
          <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="border-b border-r border-border px-6 py-6">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Artifacts per phase */}
        <div className="border-b border-border">
          <div className="border-b border-border px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Artifacts per Phase</p>
          </div>
          <div className="divide-y divide-border">
            {ARTIFACTS.map((item, i) => (
              <div key={item.phase} className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
                <div className="border-r border-border px-6 py-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Phase {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-medium">{item.phase}</p>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <code className="text-xs text-muted-foreground">{item.file}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="border-b border-border">
          <div className="border-b border-border px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Troubleshooting</p>
          </div>
          <div className="divide-y divide-border">
            {TROUBLESHOOTING.map((item, i) => (
              <div key={item.issue} className="grid grid-cols-1 sm:grid-cols-[240px_1fr]">
                <div className="border-r border-border px-6 py-6">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Issue {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{item.issue}</p>
                </div>
                <div className="px-6 py-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform tools */}
        <div className="border-b border-border px-6 py-8">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Recommended Tools — {guide.label}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {guide.tools.map((tool) => (
              <span key={tool} className="border border-border px-3 py-1.5 text-xs text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to build?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Browse prompts for every phase of this workflow.</p>
          <Link
            href="/browse"
            className="mt-6 inline-flex bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Browse all prompts →
          </Link>
          <div className="mt-4">
            <Link href="/articles" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Read the prompting guide →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
