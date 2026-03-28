# Large Request to Small Tasks Plan

## Purpose

Break down oversized one-shot prompts into a sequence of shippable steps.

## Input

- Large request (for example: “build the full stack app with everything”)
- Time frame
- Priorities

## Instructions

Copy the prompt below:

```text
This request is too large for one shot.
Decompose it into a staged implementation plan.

Request:
[insert big request]

Constraints:
- Time:
- Stack:
- Must-have features:
- Nice-to-have features:

Tasks:
1) Split into phases with clear boundaries.
2) Define deliverable and done criteria for each phase.
3) Identify dependencies and risks.
4) Start with the smallest shippable phase.

Output format:
[Phase Plan]
Phase 1 ...
Phase 2 ...

[Dependencies]
- ...

[Risks]
- ...

[Start Now]
- first smallest shippable change
```

## Output Format

- Phased plan
- Dependencies and risks
- Concrete starting point

## Quality Criteria

- No one-shot overload
- Early shippable output
- Better control of scope

## Variants

- **Variant A:** MVP application build.
- **Variant B:** Refactor or migration project.
