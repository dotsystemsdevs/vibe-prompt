---
title: Break Down Feature Into Phases
source: r/ClaudeAI — The Ultimate Vibe Coding Guide (910 upvotes)
---

# Break Down Feature Into Phases

Never give the AI a huge feature prompt. Use this to decompose it first, then execute phase by phase.

## Decomposition Prompt

```
I want to build: [describe the full feature]

Before writing any code:
1. Break this down into 3-6 sequential phases
2. For each phase, describe: what gets built, what files are touched, what the output/test criteria is
3. Identify dependencies between phases

Do not write any code yet. Just give me the phase breakdown so I can review it.
```

## Then execute one phase at a time:

```
Let's start Phase 1: [paste phase description]
Only build what's in this phase. Nothing from future phases.
```

## Why it works

Large prompts cause hallucination — the model tries to do too much and loses coherence. Phase-by-phase execution keeps each request focused, reviewable, and reversible.
