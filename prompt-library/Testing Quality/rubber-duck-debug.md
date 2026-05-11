---
title: Rubber Duck Debug
---

## When to use
When you've been stuck on a bug for more than 30 minutes and keep cycling the same attempted fixes. Forces the AI to explain the root cause before proposing a solution.

## Prompt

```
I'm stuck on a bug: [DESCRIBE THE BUG IN YOUR OWN WORDS].

Before you suggest any fix:
1. Explain what you think the code is supposed to do, line by line
2. Identify exactly where the behavior diverges from expectations
3. State the root cause in one sentence

Only after these three steps, propose a minimal fix.

Do not touch anything else -- no refactors, no style changes, no "while we're here" improvements.
```
