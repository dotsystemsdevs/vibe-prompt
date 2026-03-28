# universal-project-scope-gate

## Purpose
Ensure every build prompt is correctly scoped for the intended project type (app, SaaS, open-source, website, API, tooling, or automation) before implementation begins.

## Input
- Project idea
- Target users
- Project type
- Technical constraints
- Business goal

## Instructions
1. Classify the project into one primary type and one optional secondary type.
2. Define mandatory deliverables for that type.
3. Define mandatory non-functional requirements (security, performance, reliability).
4. Define release constraints (hosting, compliance, observability, rollback).
5. Define acceptance criteria and success metrics.
6. Block implementation if project type, deliverables, or acceptance criteria are unclear.

## Output Format
- `Project Type Classification`
- `Type-Specific Deliverables`
- `Non-Functional Requirement Baseline`
- `Release Constraints`
- `Acceptance Criteria`
- `Go / No-Go Scope Verdict`

## Quality Criteria
- Works for websites, apps, SaaS, open-source, APIs, and tools
- Removes ambiguity before coding starts
- Enforces production-aware scope discipline
- Creates reusable standards across projects

## Variants
- Variant A: Fast MVP scope gate
- Variant B: Production-grade scope gate
