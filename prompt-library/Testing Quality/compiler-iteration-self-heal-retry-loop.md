# Compiler Iteration Self Heal Retry Loop

## Purpose
Self-healing code generation: catch test errors, inject feedback into the next iteration and retry in a controlled manner.

## Input
- Testkommando
- Max iterationer
- Stageprompt

## Instructions
Copy the prompt below:

```text
Add iteration-based self-healing to this generation stage.

Rules:
1) Run stage output against test command.
2) If test fails, capture stdout/stderr.
3) Re-run stage prompt with captured test output as feedback context.
4) Repeat up to [iterations].
5) If all iterations fail, exit with error and report diagnostics.

Output format:
[Iteration Policy]
...

[Feedback Injection Strategy]
...

[Failure Report Template]
- iteration:
- failing tests:
- key error lines:
- likely causes:
```

## Output Format
- Iterationspolicy
- Feedbackinjektion
- Failure report template

## Quality Criteria
- Higher first-pass stability over time
- Faster fix of test violations
- Clear error report at max-fail

## Variants
- Variant A: 2-iteration quick mode.
- Variant B: 5-iteration hardening mode.
