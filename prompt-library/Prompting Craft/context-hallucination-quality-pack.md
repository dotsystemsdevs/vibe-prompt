# Context and Hallucination Quality Pack

## Purpose

Establish a robust process for context control, hallucination handling, and code quality when shipping with AI assistance.

## Input

- Project context
- Current issues (hallucinations, broken answers, inconsistent code)
- Quality bar

## Instructions

Copy the prompt below:

```text
Design a quality control workflow for AI-assisted coding.

Focus areas:
1) Context management
2) Hallucination detection
3) Code quality gates
4) Verification before merge/deploy

Tasks:
1) Define context layers (global/project/task).
2) Add hallucination checks (claim/evidence/verification).
3) Define hard gates (tests, lint, type checks, security scan).
4) Create a session closeout checklist.

Output format:
[Context Protocol]
...

[Hallucination Control]
...

[Quality Gates]
...

[Session Closeout]
...
```

## Output Format

- Context protocol
- Hallucination control
- Quality gates and session closeout

## Quality Criteria

- Less incorrect learning from bad context
- Fewer false “done” signals
- More stable codebase over time

## Variants

- **Variant A:** Lightweight solo process.
- **Variant B:** Team CI/CD process.
