# AGENTS.md

> The file every AI coding session reads first. Keep it short, specific, and updated.
> Template from [vibeprompt.tech](https://vibeprompt.tech) — fork and edit.

## Project

**Name:** [Your project]
**One-line:** [What it does in plain English. One sentence.]
**Stack:** [e.g. Next.js 16, TypeScript, Tailwind v4, Supabase, Vercel]

## Folder structure

```
src/
  app/          # Next.js App Router routes
  components/   # React components, grouped by domain
  lib/          # Server-only helpers, types, data
content/        # Markdown content (articles, etc.)
public/         # Static assets
```

## Conventions

- File names: `kebab-case.tsx`
- Components: `PascalCase` exports
- No file exceeds 500 lines — refactor into modules first
- Server-only code lives in `lib/` and imports `"server-only"`
- Client components are explicit with `"use client"` at the top

## Hard rules

1. **Never overwrite existing code unless explicitly asked.** Read before writing.
2. **No new state, deps, or files unless I ask.** Use what's already imported.
3. **Every new feature needs 3 tests:** 1 expected use, 1 edge case, 1 failure case.
4. **No-touch list:** `.env`, `.env.local`, `package-lock.json`, `next.config.ts`, anything in `/public`.

## Memory bank

The `memory-bank/` folder holds long-lived context. Read before any task:

- `@architecture.md` — file map, where state lives, server/client boundaries (always read)
- `@design-doc.md` — the PRD, what we're building and why (always read)
- `progress.md` — completed steps, current state
- `implementation-plan.md` — ordered task list

## Session kickoff

At the start of every chat:

> Read AGENTS.md, docs/PRD.md, and memory-bank/@architecture.md before doing
> anything. Summarize what you understand before coding.

## Build & verify

- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — production build, must pass before merge
- `npm run typecheck` — `tsc --noEmit`, zero errors required
- `npm run lint` — ESLint, zero errors required

## Debugging contract

When something breaks:

1. Don't refactor. Reproduce the bug in isolation.
2. Add logging, run `git bisect` if the bug is regression-shaped.
3. Show me the minimum diff that fixes it.
4. Only then suggest broader cleanup.
