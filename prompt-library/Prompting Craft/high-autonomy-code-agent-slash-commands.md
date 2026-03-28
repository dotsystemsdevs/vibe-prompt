# High Autonomy Code Agent Slash Commands

## Purpose
Use super short prompts that direct action without overriding the implementation.

## Input
- Task or bug report
- Code context
- Quality requirements

## Instructions
Copy the prompt below:

```text
Use terse command prompts with strict completion standards.

Examples:
- "Fix." [paste bug report]
- "Grill me on these changes; no PR until I pass."
- "Knowing what you know now, scrap this and implement the elegant solution."

Execution rules:
1) Clarify scope in one line.
2) Execute independently.
3) Show evidence before claiming done.
4) If blocked, ask one focused question only.

Output format:
[Scope]
...

[Actions Taken]
...

[Proof]
- tests/checks
- before/after behavior

[Next Risk]
...
```

## Output Format
- Minimal control
- Clear action + evidence
- Risk line at the end

## Quality Criteria
- High autonomy without chaos
- Less prompt overhead
- Strong done definition

## Variants
- Variant A: Debug incident.
- Variant B: Refactor/architecture reset.
