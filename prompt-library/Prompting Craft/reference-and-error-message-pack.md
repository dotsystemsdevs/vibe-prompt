# Reference And Error Message Pack

## Purpose
Get more accurate answers through reference-driven style and full error context.

## Input
- Reference snippet or style template
- Error message/log
- Code that triggers the error

## Instructions
Copy the prompt below:

```text
Use both reference and error context.

Reference style/code:
[paste reference snippet]

Error context:
- Error/log:
[paste]
- Triggering code:
[paste]

Tasks:
1) Reproduce likely failure path from provided context.
2) Propose fix aligned with reference style/patterns.
3) Explain why this fix matches both behavior and style.

Output format:
[Failure Path]
- ...

[Fix Proposal]
- ...

[Style Alignment Notes]
- ...

[Verification]
- ...
```

## Output Format
- Failure path
- Fix aligned with reference style
- Verification step

## Quality Criteria
- Minor generic fixes
- Better consistency against the style of the codebase
- Faster troubleshooting with full context

## Variants
- Variant A: Backend error context.
- Variant B: Frontend + API integration error.
