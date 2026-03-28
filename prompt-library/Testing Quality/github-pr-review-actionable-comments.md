# Github Pr Review Actionable Comments

## Purpose
Do sharp PR reviews with only actionable, line-specific improvements.

## Input
- PR-nummer
- Repo-kontext
- Kodstandard

## Instructions
Copy the prompt below:

```text
Review PR # [number] with an actionable-only policy.

Focus areas:
1) correctness
2) security
3) regressions
4) performance
5) test coverage
6) maintainability

Rules:
- No summary fluff.
- Provide concrete line-level suggestions.
- Prioritize critical findings first.

Output format:
[Critical Issues]
- file:
  - line:
  - issue:
  - fix suggestion:

[Important Suggestions]
- ...

[Minor Improvements]
- ...
```

## Output Format
- Severity-sorterade, actionabla findings

## Quality Criteria
- High signal in review
- Less noise
- Faster merge quality

## Variants
- Variant A: Security-heavy PR.
- Variant B: Performance-heavy PR.
