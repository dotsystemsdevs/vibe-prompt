# Role And Effort Scenario Steering

## Purpose
Improve quality by giving the model a clear role, scenario and level of consequence.

## Input
- Role (e.g. incident lead, staff engineer, legal reviewer)
- Scenario
- Stakes (what is at risk if the wrong decision is made)
- Moth

## Instructions
Copy the prompt below:

```text
Act in this context:
- Role: [role]
- Scenario: [situation]
- Stakes: [what is at risk]
- Goal: [desired outcome]

Produce guidance that is:
1) practical under the stated constraints
2) prioritized by risk and urgency
3) explicit about assumptions

Output format:
[Priority Actions]
1) ...
2) ...
3) ...

[Assumptions]
- ...

[Failure Modes]
- ...

[Next Checkpoint]
- what to verify in 15-30 minutes
```

## Output Format
- Priority actions
- Assumptions
- Failure modes + next checkpoint

## Quality Criteria
- Scenarioanpassat svar
- Battre prioritering under press
- Clear risk handling

## Variants
- Variant A: Incident response.
- Variant B: Product strategy with business risk.
