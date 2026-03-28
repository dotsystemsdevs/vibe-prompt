---
title: Structured Code Task Requirement
category: Feature Shipping
tags: [instruction, chain-of-thought, planning, slow-down]
source: r/vibecoding
upvotes: 44
---

# Structured Code Task Requirement

Forces the AI (and you) to **think before coding**. Stops the model from jumping straight to code without understanding the task.

## Prompt

```
Before you generate any code, always:
(1) Restate your understanding of the task
(2) Identify any ambiguities or missing info and ask for clarification if needed
(3) Break down the task into clear steps — requirements, plan, and code generation
(4) For complex tasks, use chain-of-thought reasoning and explain your plan briefly

Only generate code after this process is complete.
```

## When to use

- Before any non-trivial feature or bug fix
- When you've been burned by the AI misunderstanding the task
- Combine with the Role prompt for best results

## Why it works

Activates chain-of-thought reasoning. Catches ambiguities before they become bugs. The clarification step alone saves hours of rework.
