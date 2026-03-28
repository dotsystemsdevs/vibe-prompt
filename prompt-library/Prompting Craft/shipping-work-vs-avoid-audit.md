# Shipping Work Vs Avoid Audit

## Purpose
Assess whether a prompt is likely to work or fall flat, and rewrite it into a hogsignal version.

## Input
- Original prompt
- Desired result
- Technology stack (if known)

## Instructions
Copy the prompt below:

```text
Audit this prompt and classify it as:
- Likely to work
- Risky
- Likely to fail

Prompt:
[insert prompt]

Task:
1) Explain why the prompt falls in that class.
2) Identify missing context (language/framework, constraints, I/O examples, success criteria).
3) Rewrite it into a stronger version.
4) Provide one short variant and one detailed variant.

Output format:
[Classification]
...

[Why]
- ...

[Missing Context]
- ...

[Rewritten Prompt - Short]
...

[Rewritten Prompt - Detailed]
...
```

## Output Format
- Grading of prompt quality
- Gap analysis
- Rewritten prompt in two versions

## Quality Criteria
- Clear difference between weak/strong prompt
- Practical rewriting, not theory
- Directly usable in the next step

## Variants
- Variant A: Coding tasks.
- Variant B: Learning/explainer tasks.
