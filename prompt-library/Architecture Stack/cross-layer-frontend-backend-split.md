# Cross-Layer Frontend and Backend Split

## Purpose

Avoid “fix everything everywhere” by breaking cross-layer work into controlled steps.

## Input

- Original broad request
- Affected layers (frontend / backend / database)
- Acceptance criteria

## Instructions

Copy the prompt below:

```text
Do not execute cross-layer changes in one pass.
Split this request into sequential layers:

Request:
[insert request]

Layers:
1) Backend/domain changes
2) API contract updates
3) Frontend integration
4) End-to-end verification

For each layer:
- scope
- exact changes
- tests/checks
- rollback note

Output format:
[Layer Plan]
Layer 1 ...
Layer 2 ...

[Current Layer Execution]
...

[Gate to Next Layer]
- pass/fail criteria
```

## Output Format

- Layer plan
- Clear gate between steps
- Lower regression risk

## Quality Criteria

- No uncontrolled cross-layer drift
- Easier debugging
- Predictable integration

## Variants

- **Variant A:** Frontend and backend only.
- **Variant B:** Frontend, backend, and database migration.
