---
title: Agent Team Lead Pattern (Claude Code)
source: github.com/KhazP/vibe-coding-prompt-template — docs/claude-agent-teams.md
---

# Agent Team Lead Pattern

Use Claude Code's agent spawning to parallelize work. One Team Lead coordinates multiple specialist agents.

## Basic Team Lead Prompt

```
Read AGENTS.md. You are the Team Lead.

Spawn a Researcher teammate to read the database schema and summarize the current data model.
Spawn a Coder teammate to write the [feature] routes.

The Coder must present a markdown plan and wait for my approval before writing any code.
```

## Plan Mode (prevent silent regressions)

```
Before any teammate modifies files in src/, they must present a markdown plan and wait for my explicit "go ahead".
No code changes without plan approval.
```

## Context Compaction Between Sessions

```
We're switching from [Frontend] to [Backend] work.
Summarize the current session state and write it to MEMORY.md.
Then trigger auto-compaction so we start fresh with only the backend context loaded.
```

## Recommended Session Loop

```
1. Start: "Read AGENTS.md and MEMORY.md. Summarize what we're building and current state."
2. Build: "Propose Phase [N] plan. Wait for approval. Build one feature at a time."
3. Verify: "Run tests and linter. Fix any failures before continuing."
4. Close: "Update MEMORY.md with what was completed. What's next?"
```

## When to use Agent Teams

- Complex features that span frontend + backend simultaneously
- When you want parallel research (DB schema) + implementation
- Large refactors where you need a reviewer agent checking the coder's work
