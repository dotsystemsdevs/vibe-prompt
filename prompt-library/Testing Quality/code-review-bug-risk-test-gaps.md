# Code Review Bug Risk Test Gaps

## Purpose
Get high-signal code review that prioritizes bugs, regression risk and missing tests ahead of surface style commentary.

## Input
- Diff or code block
- Berord module
- Critical flows

## Instructions
Copy the prompt below:

```text
Review this code with a production-risk mindset.

Priority order:
1) correctness bugs
2) security risks
3) behavioral regressions
4) performance traps
5) maintainability issues
6) missing tests

Rules:
- Cite concrete evidence for each finding.
- Rank findings by severity.
- If no high-severity findings, say so explicitly.
- End with a focused test plan.

Output format:
[Findings]
- Severity:
  - Issue:
  - Evidence:
  - Suggested fix:

[Open Questions]
- ...

[Test Plan]
- ...
```

## Output Format
- Severity-rankade findings
- Oppna fragor
- Koncis testplan

## Quality Criteria
- Focus on real risk
- Clear evidence
- Actionable feedback

## Variants
- Variant A: PR review.
- Variant B: Incident hotfix review.
