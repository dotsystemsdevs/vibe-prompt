# Resume With Ground Truth (Not “Clear”)

## Purpose

Rebuild project context from ground-truth artifacts after an interruption, instead of wiping state and starting over.

## Input

- Available project artifacts (state doc, roadmap, plans, summaries)
- Last known step before the interruption
- Errors or incomplete areas, if any

## Instructions

1. Read artifacts in order: state → roadmap → plans → summaries.
2. Identify what is actually complete versus what was only planned.
3. Flag mismatches between execution state and real outcomes.
4. Recommend a precise resume point with the lowest risk.
5. Write a short continuation prompt that can be run immediately.
6. Avoid a full reset unless artifacts are corrupted or untrustworthy.

## Output Format

- `Recovered Context`
- `Completed vs Pending`
- `State Mismatches`
- `Recommended Resume Point`
- `Continuation Prompt`

## Quality Criteria

- No guessing about true state
- Clear separation of facts versus assumptions
- Fast restart without losing history
- Robust to interrupted or partial sessions

## Variants

- **Variant A:** Minimal recovery for short sessions.
- **Variant B:** Deep recovery with mismatch analysis and risk classification.
