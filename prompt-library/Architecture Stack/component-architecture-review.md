---
title: Component Architecture Review
---

## When to use
Before starting a new feature or refactoring a large module. Use this to get AI feedback on whether your component boundaries, data flow, and separation of concerns are solid.

## Prompt

```
Review the component architecture for: [FEATURE OR MODULE NAME].

For each component that would be created or changed:
1. What is its single responsibility? (If it has more than one, flag it)
2. Which other components does it depend on, and are those dependencies reasonable?
3. Where does its data come from — props, context, query, or local state — and is that the right choice?
4. Is it testable in isolation, or does it need a parent/context to function?

Then, summarize:
- Any circular or unnecessarily deep dependency chains
- Components that could be split (doing two jobs)
- Components that could be merged (thin wrappers with no logic)
- Data that crosses too many component boundaries (prop drilling)

Do not suggest code changes. This is an architecture review, not a refactoring session.
```
