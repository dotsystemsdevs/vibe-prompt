# Codex Policy and Sandbox Guardrails

## Purpose

Produce a clear policy layer for allowed, prompted, and forbidden commands in the agent workflow.

## Input

- Risk profile
- CI/CD requirements
- Command families that must be protected

## Instructions

Copy the prompt below:

```text
Design a codex policy with command-level guardrails.

Requirements:
1) Define allow rules for safe read-only commands.
2) Define prompt-required rules for risky git/network actions.
3) Define forbidden rules for destructive operations.
4) Add rationale for each rule.
5) Include emergency override process.

Output format:
[Allow Rules]
- command pattern:
- rationale:

[Prompt Rules]
- command pattern:
- rationale:

[Forbidden Rules]
- command pattern:
- rationale:

[Override Procedure]
- ...
```

## Output Format

- Policy structure (allow / prompt / forbidden)
- Rationale per rule
- Override procedure

## Quality Criteria

- Fewer accidental destructive actions
- Clear risk boundaries
- Easy to maintain the policy over time

## Variants

- **Variant A:** Conservative policy.
- **Variant B:** High-autonomy policy with additional prompt gates.
