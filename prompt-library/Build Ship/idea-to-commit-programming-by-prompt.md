# Idea-to-Commit Programming by Prompt

## Purpose

Build a reusable prompt that drives the full programming-by-prompt chain from idea to verified code change.

## Input

- Idea / problem statement
- Codebase context
- Definition of done (DoD)

## Instructions

1. Turn the idea into a clear specification with explicit scope boundaries.
2. Break work into small executable steps with verification after each step.
3. Require code examples, test proposals, and brief implementation rationale.
4. Force edge-case review before marking work complete.
5. Produce a commit-ready summary covering what / why / risk.
6. Provide the next prompt for continued iteration or hardening.

## Output Format

- `Spec`
- `Step Plan`
- `Implementation Output`
- `Verification Notes`
- `Commit Draft`
- `Next Prompt`

## Quality Criteria

- Clear progression without scope creep
- Verification built into the flow
- Easy to translate into real commits
- Stable across multiple iterations

## Variants

- **Variant A:** Simple feature in one sprint.
- **Variant B:** Complex feature with multiple sub-steps and review gates.
