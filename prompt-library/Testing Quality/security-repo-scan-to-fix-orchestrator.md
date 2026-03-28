# Security Repo Scan To Fix Orchestrator

## Purpose
Run a complete security flood: scan -> triage -> fix -> verify -> summary.

## Input
- Repo URL
- Criticality threshold (which severities must be fixed)
- Tech stack

## Instructions
Copy the prompt below:

```text
Run a full security remediation workflow for this repository.

Repository:
[insert GitHub repo URL]

Goals:
- Find vulnerabilities
- Prioritize by severity
- Fix systematically
- Verify no regressions

Workflow:
1) Run security scan(s)
2) Summarize findings by severity (critical/high/medium/low)
3) Build a task list grouped by vulnerability class
4) Fix issues one by one, highest severity first
5) Verify each fix with tests/checks
6) Produce final remediation report

Output format:
[Scan Summary]
- ...

[Task List]
- ...

[Fix Log]
- issue:
  - fix:
  - verification:

[Final Report]
- resolved:
- remaining risks:
- next actions:
```

## Output Format
- Scan summary
- Priority fix list
- Verified fix log + final report

## Quality Criteria
- Severity-driven work
- Trackable fix history
- Proven improvement before termination

## Variants
- Variant A: Fixed triage (critical/high only).
- Variant B: Full hardening (all severities).
