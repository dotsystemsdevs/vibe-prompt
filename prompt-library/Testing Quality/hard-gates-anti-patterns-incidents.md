# Hard Gates Anti Patterns Incidents

## Purpose
Harden the quality of the agent with explicit gates, anti-monsters and concrete incident examples.

## Input
- Bygg/test/lint-kommandon
- Kanda haverityper
- Projektets riskzoner

## Instructions
Copy the prompt below:

```text
Convert vague agent instructions into enforceable quality controls.

Create:
1) Hard Gates (must pass before done)
2) Anti-Patterns (explicitly forbidden)
3) Incident Examples (real failure -> prevention rule)

Requirements:
- Gates must be binary and machine-checkable.
- Anti-patterns must be concrete, not philosophical.
- Incidents must include trigger and future guard.

Output format:
[Hard Gates]
- Gate:
  - Pass condition:
  - Fail action:

[Anti-Patterns]
- Never do:
  - Why harmful:
  - Safer alternative:

[Incident Library]
- Incident:
  - What happened:
  - Prevention rule:
  - Detection check:
```

## Output Format
- Binary hard gates
- Anti-monster list
- Incident library with prevention

## Quality Criteria
- Farre fake "done"
- Less risk of regression
- Higher predictability in delivery

## Variants
- Variant A: Web App Team.
- Variant B: API/backend system with higher operational risk.
