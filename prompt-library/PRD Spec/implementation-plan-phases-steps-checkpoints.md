# Implementation Plan Phases Steps Checkpoints

## Purpose
Create precise build order in small testable steps (1.1, 1.2, 2.1...) for predictable delivery.

## Input
- PRD
- APP_FLOW
- TECH_STACK
- FRONTEND/BACKEND-guides

## Instructions
Copy the prompt below:

```text
Create IMPLEMENTATION_PLAN.md with numbered build sequence.

Inputs:
- PRD summary:
- Key flows:
- Stack:

Plan rules:
1) Organize by phases (foundation, design system, backend, integration, QA, release)
2) Break every phase into small steps (e.g., 1.1, 1.2, 2.1)
3) For each step include:
   - duration estimate
   - goal
   - tasks
   - success criteria
   - dependencies
   - test checkpoint
4) Include staging deploy checkpoints at milestone boundaries

Output format:
[IMPLEMENTATION_PLAN]
...
```

## Output Format
- IMPLEMENTATION_PLAN.md with sequence of steps and checkpoints

## Quality Criteria
- No unclear building order
- Continuous validation
- Fast detection of blockers

## Variants
- **Variant A:** Solo sprint plan.
- Variant B: Team parallel tracks plan.
