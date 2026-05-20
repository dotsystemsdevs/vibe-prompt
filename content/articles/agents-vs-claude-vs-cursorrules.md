---
title: "AGENTS.md vs CLAUDE.md vs .cursorrules: Which One Should You Use?"
description: "Three context-file formats, one job. Why AGENTS.md is winning, what each tool actually reads, and the safest setup that works across Claude Code, Cursor, Codex, and Windsurf."
date: "2026-05-20"
image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80"
imageAlt: "Stack of paper documents"
author: "vibeprompt"
category: method
---

If you've used more than one AI coding tool in the past year, you've hit this: Claude Code wants `CLAUDE.md`. Cursor reads `.cursorrules` (or the newer `.cursor/rules`). Codex CLI looks for `AGENTS.md`. Aider has its own conventions. Now you've got four files in your repo, all saying mostly the same thing, all slightly out of sync.

This article explains what each file actually does, why **AGENTS.md is winning**, and the exact setup that lets one file drive every tool — without maintaining four copies.

## The three formats, side by side

| File | Tool that wrote it | Adopted by |
|---|---|---|
| `CLAUDE.md` | Anthropic (Claude Code) | Claude Code only |
| `.cursorrules` (legacy) / `.cursor/rules/` (current) | Cursor | Cursor, Windsurf (partial) |
| `AGENTS.md` | OpenAI (Codex), then Linux Foundation | Codex CLI, OpenCode, Aider, Cline, Windsurf, Roo, Cursor (reads it) |

The pattern is unambiguous: `AGENTS.md` has the broadest tool support and is now stewarded by the [Linux Foundation as an open standard](https://agents.md). Every major agent either reads it directly or has a config flag to point at it.

## What each file actually does

All three serve the same purpose: **give an AI coding agent the project-specific context it can't infer from the code alone.** Conventions, stack versions, what-not-to-do rules, build commands.

The differences are mostly cosmetic:

- **`CLAUDE.md`** is plain markdown. Claude Code loads it at session start and treats it as authoritative.
- **`AGENTS.md`** is the same idea, formalized. The Linux Foundation spec defines section conventions (Project, Stack, Conventions, etc.) so tools can predict structure.
- **`.cursorrules`** was Cursor's original format — single-file rules with optional path globs. The newer `.cursor/rules/` directory splits rules into files with frontmatter for scoping (`description`, `globs`, `alwaysApply`).

There's no functional difference for 95% of users. They all end up in the model's system prompt.

## Why AGENTS.md is winning

Three reasons:

1. **Vendor-neutral.** `CLAUDE.md` ties you to Anthropic. `.cursorrules` ties you to Cursor. `AGENTS.md` doesn't tie you to anything.
2. **Standardized structure.** The spec means tools can extract specific sections (e.g. "find the build command") deterministically.
3. **Tool support snowballed in late 2025.** When Codex CLI shipped AGENTS.md support, OpenCode, Cline, Roo, and Aider followed within weeks. Cursor and Claude Code both now read it.

If you're starting a project today, write `AGENTS.md` and stop there.

## The "one file, all tools" setup

If you already have `CLAUDE.md` (or `.cursorrules`), don't migrate everything to AGENTS.md — that's a recipe for drift. Use one of these three patterns:

### Pattern 1: Symlink

The cleanest option. One file, every tool reads it:

```bash
# AGENTS.md is the source of truth
ln -sf AGENTS.md CLAUDE.md
ln -sf AGENTS.md .cursorrules
```

Pros: Zero drift. Edit once, all tools see the change.
Cons: Symlinks don't always survive zip downloads / Windows / some CI checkouts.

### Pattern 2: Pointer file

If symlinks are off the table, make one canonical file and have the others point to it:

```markdown
# CLAUDE.md
READ AGENTS.md FIRST. That is the source of truth.
```

Tools that load `CLAUDE.md` will hit the pointer and read `AGENTS.md` next. Works because most agents follow `@file` references and `READ X` instructions.

### Pattern 3: @file include

In a tool that supports it (Claude Code, Cursor, Codex):

```markdown
# CLAUDE.md
@AGENTS.md
```

Claude Code expands `@AGENTS.md` to the file contents. Same effect as a symlink without filesystem trickery.

## What to put in your AGENTS.md

The Linux Foundation spec recommends these sections. Steal this skeleton:

```markdown
# AGENTS.md

## Project
**Name:** [Project]
**One-line:** [What it does]
**Stack:** [e.g. Next.js 16, TypeScript, Tailwind v4, Vercel]

## Folder structure
[Tree of relevant dirs]

## Conventions
- File names: kebab-case
- No file exceeds 500 lines
- Server-only code in lib/, imports "server-only"

## Hard rules
1. Never overwrite without asking
2. No new dependencies without explicit request
3. Every feature needs 3 tests
4. No-touch list: .env, package-lock.json, next.config.ts

## Build & verify
- npm run dev
- npm run typecheck
- npm run lint

## Session kickoff
At session start: "Read AGENTS.md, docs/PRD.md, and memory-bank/ before doing anything."
```

A full [AGENTS.md template](/templates/AGENTS.md) is on this site under templates.

## Mistakes to avoid

**Don't include the PRD in AGENTS.md.** The PRD changes constantly. AGENTS.md is *rules*, not *scope*. Keep them in separate files (`docs/PRD.md`) and reference the PRD from AGENTS.md.

**Don't write 200 lines.** Models drop attention past the first ~80 lines of a system prompt. Keep AGENTS.md under 100 lines. If you have more to say, link out to longer docs.

**Don't add things "just in case."** Every rule you write is a constraint the model has to track. Be specific about what matters, vague about what doesn't.

**Don't forget to update it.** Stale rules are worse than no rules — they tell the model to do things you no longer want. Touch AGENTS.md in the same commit as breaking convention changes.

## Tooling-specific quirks

A few footguns worth knowing:

- **Cursor** still reads `.cursorrules` for backward compatibility, but the newer `.cursor/rules/` directory is preferred. If both exist, `.cursor/rules/` wins.
- **Claude Code** has a hierarchy: `~/.claude/CLAUDE.md` (global) → `./CLAUDE.md` (project). Both get loaded. Use the global one for personal preferences, the project one for project-specific.
- **Codex CLI** supports monorepo `AGENTS.md` files — drop one in each package, Codex picks the closest one to your working directory.
- **Aider** reads `CONVENTIONS.md` by default. Symlink that to `AGENTS.md` too if you use Aider.

## TL;DR

- Write **AGENTS.md** as your source of truth.
- Symlink or pointer the others (`CLAUDE.md`, `.cursorrules`) to AGENTS.md.
- Keep it under 100 lines, rules-only — not scope.
- Update it in the same commit as breaking convention changes.

This stops the four-files-out-of-sync problem cold. Every tool reads the same content, you edit one place.
