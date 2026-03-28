# Agent Teams Role Separation Permissions

## Purpose
Build a prompt that designs and manages multi-agent teams with clear role separation, tool boundaries and handoff contracts.

## Input
- Problems to solve
- List of available agent roles
- Allowed/forbidden tools per role

## Instructions
1. Define the roles clearly: research, planning, implementation, verification, docs.
2. For each role: set tool rights (allowed + disallowed) and responsibilities.
3. Requirements for structured handoff between roles (summary, blocks, next step).
4. Plan execution so that roles do not step on the same files unnecessarily.
5. Requirement for shutdown/termination: all roles must report completed status.
6. If uncertainty arises: escalate to lead role with explicit decision point.

## Output Format
- `Team Topology`
- `Role Contract Matrix`
- `Handoff Schema`
- `Conflict Avoidance Rules`
- `Shutdown Checklist`

## Quality Criteria
- Minimizes unclear responsibility
- Reduces file conflicts and duplication
- Make error calls traceable via clear handoffs
- Works in both serial and parallel execution

## Variants
- Variant A: 3 roles (Lead, Dev, QA) for smaller projects
- Variant B: 7 roles with strict governance for complex systems
