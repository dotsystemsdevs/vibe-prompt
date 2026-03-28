# Behavior Outcome Over Method Prompting

## Purpose
Describe desired behavior and experience in the stable to override implementation in the future.

## Input
- User outcome
- UX-forvantning
- Teknisk kontext

## Instructions
Copy the prompt below:

```text
Design and implement for behavior first, not implementation micromanagement.

Goal:
[insert user-facing goal]

Context:
[insert stack/module info]

Behavior requirements:
- What should happen:
- Performance feel:
- Error behavior:

Tasks:
1) Propose the simplest implementation that achieves behavior.
2) Mention one alternative approach.
3) Implement preferred approach.

Output format:
[Behavior Spec]
- ...

[Implementation Choice]
- Selected:
- Alternative:
- Why selected:

[Implementation]
...

[Behavior Verification]
- ...
```

## Output Format
- Behavior spec
- Selected implementation with options
- Verification against malicious behavior

## Quality Criteria
- Starkare produktresultat
- Mindre overdetaljerad styrning
- Utrymme for battre tekniska val

## Variants
- Variant A: UX-focused task.
- Variant B: API behavior with SLA/latency requirements.
