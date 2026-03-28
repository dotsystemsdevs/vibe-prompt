# Security Release Gate Riskscore Policy

## Purpose
Define release-gate based on security score, severity distribution and risk acceptance.

## Input
- Senaste scanresultat
- Teamets riskpolicy
- Deadline-tryck

## Instructions
Copy the prompt below:

```text
Evaluate if this build can be released based on security posture.

Inputs:
- security score:
- critical/high/medium/low counts:
- fixed vs remaining findings:
- compensating controls:

Policy:
1) Critical findings block release.
2) High findings require explicit risk sign-off.
3) Medium/low can defer with documented remediation plan.

Output format:
[Release Decision]
- go/no-go:
- rationale:

[Blocking Issues]
- ...

[Required Actions Before Release]
- ...

[Deferred Risk Register]
- finding:
  - owner:
  - due date:
```

## Output Format
- Go/no-go beslut
- Blockers
- Deferred risk register

## Quality Criteria
- Consistent release decision
- Clear division of responsibilities
- Less "ship now, regret later"

## Variants
- Variant A: Startup fast release.
- Variant B: Enterprise compliance release.
