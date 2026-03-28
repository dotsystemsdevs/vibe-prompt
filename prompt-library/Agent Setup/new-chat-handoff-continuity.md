# New-Chat Handoff Continuity

## Purpose

Preserve velocity and quality when you must start a new chat or session in the middle of development.

## Input

- What already works
- What is broken or still open
- Relevant files and modules

## Instructions

Copy the prompt below:

```text
We are continuing work from a previous session.

Project status:
- What is done:
- What works:
- What is broken:
- Next target:
- Relevant files:

Your tasks:
1) Restate current state in 5 bullets max.
2) Confirm the next smallest shippable change.
3) Implement only that change.
4) Return verification steps and remaining risks.

Output format:
[State Recap]
- ...

[Next Change]
- ...

[Verification]
- ...

[Remaining Risks]
- ...
```

## Output Format

- Short state recap
- Next smallest shippable increment
- Verification steps and risk list

## Quality Criteria

- Reduced context loss between sessions
- Sustained focus on small, shippable increments
- Faster restart without re-explaining the entire codebase

## Variants

- **Variant A:** Solo rapid mode.
- **Variant B:** Team handoff mode with explicit ownership and checkpoints.
