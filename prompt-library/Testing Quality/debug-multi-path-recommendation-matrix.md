# Debug Multi Path Recommendation Matrix

## Purpose
Architect-level debugging: identify bugs, suggest multiple solutions, rank and provide copy-paste implementation.

## Input
- Problem
- Kodkontext
- Felmeddelanden/loggar
- Constraints

## Instructions
Copy the prompt below:

```text
Act as a senior software architect for bug analysis.

Phase 1: Root Cause Analysis
- Identify ALL likely bugs.
- For each bug include:
  - what's broken
  - why it happens
  - likely location
  - severity

Phase 2: Solution Design
- For each bug, provide Solution A/B/C with:
  - approach
  - implementation steps
  - pros/cons
  - effort/risk

Phase 3: Recommendation
- Pick best solution and justify.
- Provide implementation priority sequence.

Phase 4: Coder-Agent Instructions
- file-by-file change guidance
- testing requirements
- patterns to use
- pitfalls to avoid
- success criteria checklist

Phase 5: Trade-off Matrix
- score A/B/C on performance, complexity, maintainability, implementation time, risk
```

## Output Format
- Bug map
- A/B/C solutions
- Recommendation + implementation script
- Trade-off matrix

## Quality Criteria
- Less trial-and-error
- Strong decision quality before code
- High chance that the fix will fall over time

## Variants
- Variant A: Quick hotfix.
- Variant B: Long-term robust fix.
