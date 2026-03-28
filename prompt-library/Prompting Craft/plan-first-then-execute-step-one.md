# Plan First Then Execute Step One

## Purpose
For complex changes: analyze dependencies, propose plan, execute only step 1.

## Input
- Big task
- Manage system parts
- Risk requirements

## Instructions
Copy the prompt below:

```text
Handle this in plan-first mode.

Task:
[insert task]

Process:
1) Analyze dependencies and impact.
2) Propose a phased plan.
3) Execute ONLY phase 1.
4) Return evidence and gate to continue.

Output format:
[Dependency Analysis]
- ...

[Phased Plan]
Phase 1:
Phase 2:
Phase 3:

[Phase 1 Execution]
...

[Gate for Phase 2]
- pass criteria:
- remaining risks:
```

## Output Format
- Beroendeanalys
- Fasplan
- Exekverat steg 1 + gate

## Quality Criteria
- Reduces big mistakes
- Better control of complex migrations
- Clear stop point between steps

## Variants
- Variant A: Server component migration.
- Variant B: Database/architecture change.
