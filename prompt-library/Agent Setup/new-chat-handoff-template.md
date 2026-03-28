---
title: New Chat Handoff Template
source: r/ClaudeAI — The Ultimate Vibe Coding Guide (910 upvotes)
---

# New Chat Handoff Template

When a chat gets too long and context degrades, start fresh with this. Gives the new session everything it needs without re-explaining from scratch.

## Prompt Template

```
Context handoff — continuing work from a previous session.

Project: [brief 1-line description]
Tech stack: [e.g. Next.js 15, Supabase, Tailwind, TypeScript]
What I was working on: [feature/bug in 1-2 sentences]
Current state: [what's done, what's broken, what's next]
Relevant files: [list the files involved]

[Optional: paste the last working code snippet or error message]

Task: [exactly what you want done next]
```

## Why it works

Context window degradation is real — a 50-message chat makes Claude forget early instructions and patterns. Starting fresh with a tight handoff is better than continuing a dying session.
