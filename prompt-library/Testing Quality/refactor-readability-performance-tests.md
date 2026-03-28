# Refactor Readability Performance Tests

## Purpose
Improve existing code with a focus on readability, testability and performance without breaking behavior.

## Input
- Code block or file
- Bottleneck/problem
- Non-functional requirements

## Instructions
Copy the prompt below:

```text
Refine this code without changing intended behavior.

Code:
[paste code]

Tasks:
1) Improve readability and structure.
2) Increase testability (smaller units, clearer boundaries).
3) Suggest one performance improvement.
4) Provide before/after rationale.

Constraints:
- Preserve behavior unless explicitly noted.
- Keep changes incremental.

Output format:
[Refactor Plan]
- ...

[Refined Code]
...

[Behavior Safety Notes]
- ...

[Tests to Add]
- ...
```

## Output Format
- Refactorplan
- Forbattrad kod
- Safety notes + testforslag

## Quality Criteria
- Clearer code with the same behavior
- Better maintainability
- Simple verification steps

## Variants
- Variant A: Readability-first.
- Variant B: Performance-first.
