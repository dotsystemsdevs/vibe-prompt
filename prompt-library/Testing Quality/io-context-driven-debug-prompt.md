# Io Context Driven Debug Prompt

## Purpose
Improve debugging help by always including context + input/output examples for faster root cause.

## Input
- Code snippet
- Error message
- Input used
- Expected vs actual output

## Instructions
Copy the prompt below:

```text
Help me debug this issue using context and I/O evidence.

Code:
[paste code]

Error:
[paste error]

Input:
[paste input]

Expected output:
[paste expected]

Actual output:
[paste actual]

Tasks:
1) Identify the most likely root cause.
2) Show the exact problematic line/pattern.
3) Provide minimal fix first.
4) Provide one prevention tip to avoid this class of bug.

Output format:
[Diagnosis]
...

[Root Cause]
...

[Minimal Fix]
...

[Prevention Tip]
...
```

## Output Format
- Diagnosis
- Rotor case with evidence
- Minimal fix + prevention

## Quality Criteria
- Context-heavy debugging
- Reduces guesswork
- Quick validation of fixes

## Variants
- Variant A: Frontend runtime error.
- Variant B: Backend/API exception.
