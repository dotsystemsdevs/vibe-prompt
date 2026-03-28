# Senior Dev Handoff Hardening Checklist

## Purpose
Prepare an AI-built codebase for senior engineer review and hardening before production deployment.

## Input
- Repository link or code snapshot
- Current architecture summary
- Known concerns (security, scalability, maintainability)

## Instructions
1. Create a pre-handoff audit list covering architecture, security, tests, and deployment.
2. Identify AI-generated code smell patterns and prioritize cleanup.
3. Define what "good enough to ship" means with explicit gate criteria.
4. Structure review findings into block/major/minor categories.
5. Convert findings into a sequenced remediation plan.
6. Output a final readiness verdict and next approval step.

## Output Format
- `Pre-Handoff Audit Checklist`
- `AI Code Smell Findings`
- `Ship Readiness Gates`
- `Review Severity Matrix`
- `Remediation Sequence`
- `Final Verdict`

## Quality Criteria
- Senior-review friendly
- Actionable remediation, not vague critique
- Covers both code and operational risk
- Enables confident hardening handoff

## Variants
- Variant A: Solo founder handing off to one senior dev
- Variant B: Team handoff to full QA/security review cycle
