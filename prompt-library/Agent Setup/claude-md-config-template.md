---
title: CLAUDE.md Config Template
source: github.com/KhazP/vibe-coding-prompt-template — part4-notes-for-agent.md
---

# CLAUDE.md Config Template

Put this in your project root as `CLAUDE.md`. Claude Code reads it automatically at the start of every session — no need to repeat instructions.

## Template

```markdown
# CLAUDE.md — Claude Code Configuration for [App Name]

## Project Context
App: [App Name]
Stack: [e.g. Next.js 15, Supabase, TypeScript]
Stage: MVP Development
User Level: [Vibe Coder / Developer / In Between]

## Directives
1. Always read AGENTS.md first
2. Refer to agent_docs/ for implementation details
3. Propose a plan and wait for approval before coding
4. Build one small feature at a time
5. Run pre-commit hooks before committing; fix all failures
6. Do not act as a linter — use `npm run lint`
7. Be concise; ask ONE clarifying question when needed

## Commands
- Dev: `npm run dev`
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`

## Engineering Constraints
- `any` is FORBIDDEN — use `unknown` with type guards
- Routes handle request/response ONLY — all logic goes in services/
- Check package.json before adding libraries; prefer native APIs
- Fix errors immediately — no "I'll fix this later" comments
- pre-commit hooks must pass before any commit
```

## Pro tips

- Keep CLAUDE.md **short** — put details in `agent_docs/` files, just reference them here
- The agent reads this every session, so changes take effect immediately
- Add a `## Common Mistakes` section as you discover patterns Claude repeats
