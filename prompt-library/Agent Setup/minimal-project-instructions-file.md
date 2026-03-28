# Minimal Project Instructions File

## Purpose

Produce a short, sharp control file for the coding agent instead of long micromanagement.

## Input

- Repository context
- Team rules
- Quality bar

## Instructions

Copy the prompt below:

```text
Create a minimalist CLAUDE.md-style instruction file for this repository.

Constraints:
- Keep it under 120 lines.
- Prefer principles over long step-by-step scripts.
- Optimize for autonomy with safety.

Must include:
1) Mission and non-goals
2) Coding standards (naming, tests, linting)
3) Change protocol (small diffs, verify before done)
4) Risk controls (security, secrets, destructive actions)
5) Definition of done
6) Escalation conditions (when the agent must ask)

Output format:
[CLAUDE.md Draft]
...

[Rationale]
- Why this stays short
- What complexity was intentionally excluded
```

## Output Format

- Short control file
- Brief design rationale

## Quality Criteria

- High signal and easy to follow
- Reduces babysitting
- Preserves clear guardrails

## Variants

- **Variant A:** Solo builder.
- **Variant B:** Team setup with review requirements.
