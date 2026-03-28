# Cursor + Claude Skill Stack: Plan, Build, Verify

## Purpose

Produce a reusable prompt that orchestrates a skill stack in Cursor/Claude with a clear sequence: brainstorm → plan → build → verify → finish.

## Input

- Task or feature
- Codebase stack
- Time horizon and risk level

## Instructions

1. Start with problem understanding and explicit assumptions.
2. Generate a plan as small, verifiable tasks.
3. Execute in order with a mini quality check after each step.
4. Require tests or verification evidence before marking work complete.
5. If blocked: switch to systematic debugging mode.
6. Close with a branch-ready summary.

## Output Format

- `Problem Framing`
- `Task Plan`
- `Build Log`
- `Verification Log`
- `Branch Completion Notes`

## Quality Criteria

- No skipping the planning phase
- Verification built into the workflow
- Easy to map to a Git workflow
- Clear criteria for when to stop and replan

## Variants

- **Variant A:** Fast feature with low risk.
- **Variant B:** Critical feature with strict verify-before-complete.
