# Github Issuefixer Plan Create Test Pr

## Purpose
Resolve GitHub issues systematically via PLAN -> CREATE -> TEST -> PR.

## Input
- Issue-nummer
- Repository context
- Testkommandon

## Instructions
Copy the prompt below:

```text
Resolve GitHub issue # [number] with a structured workflow.

Workflow:
1) PLAN
 - read issue details
 - gather context
 - break into tasks
 - document approach

2) CREATE
 - create feature branch
 - implement in small commits
 - follow project conventions

3) TEST
 - run targeted tests
 - run full suite
 - report pass/fail evidence

4) OPEN PR
 - create PR with clear title/body
 - link issue (Fixes #...)
 - include test evidence

Output format:
[Plan]
...

[Implementation Log]
...

[Test Evidence]
...

[PR Draft]
...
```

## Output Format
- Plan for PR draft
- Test evidence
- Traceable implementation log

## Quality Criteria
- Minskar slarviga fixes
- Stark testdisciplin
- Clear reviewer context in the PR

## Variants
- Variant A: Bug fix.
- Variant B: Enhancement issue.
