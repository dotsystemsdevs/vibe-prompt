---
title: AGENTS.md Master Template
source: github.com/KhazP/vibe-coding-prompt-template — templates/AGENTS.md
---

# AGENTS.md Master Template

The single source of truth for your AI agent across all sessions. Place this file in your project root. Every agent reads this first.

## Template

```markdown
# AGENTS.md — Master Plan for [App Name]

## Project Overview & Stack
App: [App Name]
Overview: [One-paragraph description]
Stack: [e.g. Next.js 15, Supabase, Tailwind CSS, TypeScript]
Critical Constraints: [e.g. Mobile-first, Strict TypeScript, No `any`]

## Setup & Commands
- Setup: `npm install`
- Development: `npm run dev`
- Testing: `npm test`
- Linting: `npm run lint`
- Build: `npm run build`

## Protected Areas
Do NOT modify without explicit human approval:
- Infrastructure files (Dockerfiles, .github/workflows/)
- Existing database migration files
- Payment gateway configs and auth setups

## Coding Conventions
- Formatting: ESLint/Prettier — zero warnings in new code
- Architecture: feature-based folders, hexagonal boundaries
- Testing: all new utilities need unit tests, core flows need integration tests
- Type Safety: strict TypeScript, no `any`, use `unknown` with type guards

## Agent Behaviors
1. Plan Before Execution — ALWAYS propose step-by-step plan before changing more than 1 file
2. Refactor Over Rewrite — prefer incremental changes over full rewrites
3. Context Compaction — write state to MEMORY.md instead of filling chat history
4. Iterative Verification — run tests/linters after each logical change, fix before proceeding
5. Ask If Unsure — one clarifying question, then proceed

## What NOT To Do
- Do NOT delete files without explicit confirmation
- Do NOT modify database schemas without a backup plan
- Do NOT add features not in the current phase
- Do NOT skip tests for "simple" changes
- Do NOT bypass failing tests or pre-commit hooks
- Do NOT use deprecated libraries or patterns
```

## How to use

1. Create this file in your project root
2. Fill in all `[bracketed]` values
3. Reference it in your CLAUDE.md / .cursorrules
4. At the start of every session: `"Read AGENTS.md. Summarize the project before doing anything."`
