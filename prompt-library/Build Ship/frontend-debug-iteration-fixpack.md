# Frontend Debug Iteration Fixpack

## Purpose
Quickly fix common AI-UI problems via structured iteration instead of random re-generation.

## Input
- Trasigt beteende
- Nuvarande kod
- Forvantat resultat

## Instructions
Copy the prompt below:

```text
Fix this UI using a targeted iteration workflow.

Issue:
[insert issue]

Current behavior:
[insert behavior]

Expected behavior:
[insert expected]

Run this sequence:
1) Diagnose root cause
2) Apply minimal fix
3) Verify on breakpoints
4) Verify accessibility
5) Verify performance-sensitive animations

Common issue templates:
- breakpoint overflow
- z-index layering conflicts
- weak loading/error states
- form validation UX gaps
- missing keyboard navigation
- dark mode inconsistencies
- janky animations
- scroll lock/position bugs

Output format:
[Diagnosis]
...

[Fix Applied]
...

[Verification Matrix]
- mobile:
- tablet:
- desktop:
- keyboard:
- dark mode:
```

## Output Format
- Diagnosis
- Minimal fixes
- Verification matrix

## Quality Criteria
- Less "regenerate all"
- Faster stabilization of UI
- Clear evidence that the error is lost

## Variants
- Variant A: Component-level fix.
- Variant B: Page-level fix.
