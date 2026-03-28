# Iterative Prompt Chain for Shipping

## Purpose

Build features through short, sequential prompts instead of one large one-shot.

## Input

- Feature goal
- Scope boundaries
- Definition of done

## Instructions

Copy the prompt below:

```text
Implement this feature iteratively in small prompts.

Feature:
[insert feature]

Prompt chain:
1) Scaffold minimal UI/structure.
2) Add data/API integration.
3) Apply styling/design system alignment.
4) Add tests and edge-case handling.

Rules:
- Complete one stage before next.
- Verify each stage with a short checklist.
- Stop and report if stage fails.

Output format:
[Current Stage]
- ...

[Changes]
- ...

[Stage Verify]
- ...

[Next Stage]
- ...
```

## Output Format

- Stage-based execution
- Verification per step
- A clear next step

## Quality Criteria

- Higher delivery tempo with control
- Lower regression risk
- Easy to roll back on failure

## Variants

- **Variant A:** UI feature.
- **Variant B:** API feature.
