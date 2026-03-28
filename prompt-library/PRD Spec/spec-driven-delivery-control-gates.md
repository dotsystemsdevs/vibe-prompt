# Spec-Driven Delivery Control Gates

## Purpose

Produce a reusable prompt that enforces spec-driven delivery instead of unstructured “vibe coding” loops, with explicit quality gates and traceability from requirements to verification.

## Input

- Feature description
- Requirements and scope
- Acceptance criteria

## Instructions

1. Write a mini-spec covering problem, solution approach, and explicit non-goals.
2. Decompose the spec into tasks with dependencies and execution order.
3. For each task, state implementation requirements with a short rationale.
4. After each task: verify outcomes against the acceptance criteria.
5. When deviations occur: log them and update the plan in writing.
6. Close with a final control gate: requirement coverage, risks, and next steps.

## Output Format

- `Mini Spec`
- `Task Graph`
- `Execution Notes`
- `Acceptance Verification`
- `Deviation Log`
- `Final Control Gate`

## Quality Criteria

- Fully traceable chain from requirements to code to verification
- Minimal scope drift
- Clear documentation of deviations
- Ready for team review and continued planning

## Variants

- **Variant A:** Lightweight spec for a fast sprint.
- **Variant B:** Full spec with strict governance for high-risk or regulated work.
