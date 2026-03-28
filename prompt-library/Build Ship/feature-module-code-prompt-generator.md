# Feature Module Code Prompt Generator

## Purpose
Generate high-quality code prompts per feature module so implementation can take place systematically.

## Input
- Module name
- Context
- Requirements
- Technology stack
- Constraints

## Instructions
Copy the prompt below:

```text
Create implementation-ready coding prompts for this feature module.

Feature:
[module name]

Context:
[where it lives in the product]

Requirements:
- [req 1]
- [req 2]

Tech Stack:
- [stack]

Constraints:
- [perf/security/platform constraints]

Expected Output from the coding model:
- [code artifacts required]

Generate:
1) Primary implementation prompt
2) Debug prompt for likely failures
3) Test-generation prompt (unit/integration)
4) Refactor/performance prompt

Output format:
[Implementation Prompt]
...

[Debug Prompt]
...

[Test Prompt]
...

[Refactor Prompt]
...
```

## Output Format
- 4-prompt paket per feature

## Quality Criteria
- Hojer first-pass quality
- Thanks to the build->debug->test->refactor lifecycle

## Variants
- Variant A: Backend/API module.
- Variant B: Frontend/UI module.
