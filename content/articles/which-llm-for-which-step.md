---
title: "Which LLM for Which Step: A Model Strategy Matrix for Vibe Coders"
description: "Opus for planning, Sonnet for building, Haiku for chores. Stop paying Opus prices for git commits â€” a model-per-step playbook with current 2026 pricing."
date: "2026-05-20"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
imageAlt: "Circuit board with neural network paths"
author: "dot.systems"
category: models
---

Most vibe coders pick one model and use it for everything. Opus for the rename, Opus for the commit message, Opus for the typo fix. It works, but you're paying Opus prices for Haiku work â€” and worse, you're using a slow model when you want fast feedback.

The better setup is a **model strategy matrix**: a default model for each step of the workflow. Plan with the smart one, build with the workhorse, fix typos with the cheap one. You ship the same code at a third of the cost, with snappier iteration where it matters.

This article maps every step of the [10-step vibe coding workflow](/workflow) to a recommended model â€” across Claude, GPT-5, and Gemini 3 â€” and explains the reasoning behind each pick.

## The three model tiers (and what they actually do well)

Every major lab now ships three tiers. The names differ, the shape doesn't:

| Tier | Claude | OpenAI | Google |
|---|---|---|---|
| **Heavy reasoning** | Opus 4.7 | GPT-5 Pro | Gemini 3 Pro |
| **Workhorse** | Sonnet 4.6 | GPT-5 | Gemini 3 |
| **Fast & cheap** | Haiku 4.5 | GPT-5 mini | Gemini 3 Flash |

The split is roughly: heavy tier costs **5-10Ã— the workhorse**, runs **2-4Ã— slower**, and beats it on multi-hop reasoning, long-context synthesis, and architecture decisions. Workhorse handles 80% of real coding work just fine. Fast tier is for batch tasks where latency and cost matter more than nuance.

The mistake is treating these like a single dial. They're three separate tools.

## Step-by-step model picks

### Step 00 â€” Deep Research / market validation

**Use:** Heavy tier (Opus 4.7 / GPT-5 Pro / Gemini 3 Pro)

Market validation is a synthesis task. You're asking: *does this problem actually exist, who has it, what do they currently do about it, how big is the wedge.* The model needs to read a lot, hold competing claims in mind, and surface a confident take.

Heavy-tier models are dramatically better at this. Workhorse models tend to give you a pleasant-sounding summary that doesn't actually push back on weak ideas.

Worth the cost: you do this once per project.

### Step 01 â€” Plan

**Use:** Heavy tier with extended thinking enabled

Planning is the single best place to spend Opus tokens. A bad plan compounds across every later step. A good plan saves hours of "wait, we should have done X" later.

Specifically, planning needs:
- Multi-hop reasoning ("if we pick Supabase, the auth flow looks like X, which means the onboarding screen needs Y")
- Trade-off analysis (heavy models are noticeably less agreeable â€” they push back on flawed assumptions)
- Long-context synthesis (you're feeding it your PRD, your architecture notes, and asking for an ordered implementation plan)

Pro tip: ask for *three* plans with different trade-offs (fastest to MVP, lowest infrastructure cost, most robust). Heavy tier produces meaningfully different alternatives. Workhorse tends to produce three variations of the same plan.

### Step 02 â€” Set up context (AGENTS.md, PRD)

**Use:** Workhorse (Sonnet 4.6 / GPT-5 / Gemini 3)

This is structured drafting from a known shape. You're not reasoning about anything new â€” you're filling in a template. Workhorse-tier models are perfectly capable, and you save ~70% on cost vs heavy.

### Step 03 â€” Build (core features)

**Use:** Workhorse â€” escalate to heavy only when stuck

Real coding work is where workhorse models shine. Sonnet 4.6 ships ~90% of production code in the field, and the [community consensus](https://www.anthropic.com/engineering/claude-code-best-practices) is that defaulting to Opus for everyday building is wasteful.

The escalation rule: if Sonnet has produced two failed attempts at the same problem, switch to Opus. Don't sit on the same model hoping the third try works â€” it's almost always the model that's the bottleneck, not the prompt.

### Step 04 â€” Test

**Use:** Workhorse for writing tests, fast tier for running batches

Writing tests is workhorse work. Running a long suite of generated tests, summarizing failures, or batch-generating fixtures is fast-tier work â€” you want throughput, not nuance.

### Step 05 â€” Ship

**Use:** Fast tier (Haiku 4.5 / GPT-5 mini / Gemini 3 Flash)

Commit messages. Changelog drafts. README updates. Renaming variables. Bumping versions. All chores. None require reasoning beyond "follow the existing style." Fast tier does these in under a second and costs roughly nothing.

If you're using Claude Code or Codex CLI for git operations, run them on Haiku. You'll save 80% on a category of calls that runs constantly.

### Step 06 â€” Audit / security review

**Use:** Heavy tier

Security review is the other place heavy reasoning pays off. You want the model to catch the *non-obvious* issue: the SQL injection that only triggers on a specific Unicode normalization, the race condition between two endpoints, the auth bypass that requires three steps of misuse.

Workhorse models will catch the obvious stuff. Heavy models catch the obvious stuff *and* the rest.

### Step 07 â€” Polish / UX

**Use:** Workhorse with vision

UX polish is iterative and visual. Take a screenshot, paste it in, ask for the fix. Workhorse-tier vision models (Sonnet, GPT-5, Gemini 3) are all strong here and the latency matters â€” you're iterating in seconds, not minutes.

### Step 08 â€” Launch (first 100 users)

**Use:** Workhorse for content drafts, fast tier for variants

Drafting your Show HN post, your Product Hunt copy, your launch tweet â€” workhorse work. Generating 30 variants of the same tweet to A/B test? Fast tier, in parallel.

### Step 09 â€” Iterate

**Use:** Default to workhorse, escalate by signal

Post-launch you're juggling bug reports, feature requests, and small improvements. Default to workhorse for everything. Escalate to heavy when:
- A bug has resisted two workhorse attempts
- You're making an architectural change (not a feature change)
- The decision affects more than one screen / route / model

## Pricing reality check (2026)

Approximate output token costs as of May 2026:

| Provider | Heavy | Workhorse | Fast |
|---|---|---|---|
| Anthropic | $75 / Mtok | $15 / Mtok | $1.25 / Mtok |
| OpenAI | $60 / Mtok | $10 / Mtok | $1 / Mtok |
| Google | $40 / Mtok | $7 / Mtok | $0.50 / Mtok |

Heavy tier is roughly **5Ã— workhorse, 50Ã— fast**. If 80% of your work is on workhorse and 15% on fast, swapping that for "Opus everywhere" makes your monthly bill 5-10Ã—.

(Specific pricing changes monthly. The *ratio* between tiers is what to plan around.)

## How to actually set this up

The model strategy matrix is useless if you have to manually switch every prompt. The setup that works:

1. **Default to workhorse globally.** In Claude Code: `/model sonnet`. In Codex CLI: `/model gpt-5-medium`. In Cursor: set "Auto" to Sonnet, leave Opus available on shortcut.

2. **One-tap escalation.** Bind a hotkey or alias to switch to heavy tier. In Claude Code: `/model opus`. Use it intentionally â€” for planning, security review, or when stuck.

3. **Fast tier on infrastructure.** Configure your git tooling, commit hooks, or shell wrappers to call fast tier explicitly. Example: if you use [an AI commit message tool](https://github.com/Nutlope/aicommits), point it at `haiku-4-5` not `claude-opus-4-7`.

4. **Cost dashboard, always on.** Look at your monthly spend by model. If your Opus % is over 30, you're overpaying. If your Haiku % is under 20, you're leaving savings on the table.

## When to break the rules

Three cases where the matrix above is wrong:

- **You're learning.** If a new tool/library/concept is the bottleneck, run heavy tier for everything for a week. The extra context-awareness from a smarter model accelerates the learning, even if it's expensive.
- **You're on a deadline.** Heavy tier's slower per-token, but it's faster *per task* because it gets to a correct answer in fewer turns. Under pressure, "Opus for everything" can actually be the right call.
- **You're shipping production.** For the final audit pass before launch, run heavy tier on the diff. Cheap insurance.

## TL;DR

| Step | Model tier |
|---|---|
| 00 Deep Research | Heavy |
| 01 Plan | Heavy + thinking |
| 02 Context setup | Workhorse |
| 03 Build | Workhorse, escalate when stuck |
| 04 Test | Workhorse + fast |
| 05 Ship (commits, changelog) | Fast |
| 06 Audit | Heavy |
| 07 Polish (UX) | Workhorse + vision |
| 08 Launch content | Workhorse + fast for variants |
| 09 Iterate | Workhorse by default |

The pattern: heavy tier for thinking, workhorse for building, fast tier for chores. Set defaults once, escalate by signal. Your bill drops 60-70% and you ship the same code.
