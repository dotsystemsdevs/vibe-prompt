# Code Guardrails Tests Style Performance

## Purpose
Set built-in quality gates directly in the prompt to reduce regression risk.

## Input
- Task
- Language version
- Style rules
- Performance target

## Instructions
Copy the prompt below:

```text
Generate code with strict guardrails.

Task:
[insert task]

Guardrails:
1) Include unit tests for 3 edge cases.
2) Follow style guide: [insert style guide]
3) List external dependencies and why needed.
4) Ensure compatibility with: [runtime/version]
5) Keep algorithmic complexity at or below: [target]

Output format:
[Implementation]
...

[Tests]
...

[Dependency Notes]
- ...

[Complexity Note]
- ...
```

## Output Format
- Implementation with built-in requirements
- Tests
- Dependencies + complexity note

## Quality Criteria
- Quality is built in from the start
- Fewer hidden regressions
- Better deployment readiness

## Variants
- Variant A: Conservative guardrails.
- Variant B: High-performance guardrails.
