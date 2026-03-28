# Living Project Instructions Maintenance

## Purpose

Treat `CLAUDE.md` as a living control file updated systematically from incidents and proven patterns.

## Input

- Current `CLAUDE.md`
- Recent mistakes, errors, or loops
- Patterns that worked well

## Instructions

Copy the prompt below:

```text
Maintain CLAUDE.md as a living document, not static rules.

Update policy:
1) When the model fails, add a prevention rule.
2) When a pattern succeeds repeatedly, codify it.
3) Keep rules concrete and testable.
4) Remove stale or conflicting rules monthly.

For each proposed CLAUDE.md change include:
- Trigger event
- Rule text
- Expected behavior change
- Verification signal

Output format:
[Proposed CLAUDE.md Updates]
- Trigger:
- Rule:
- Expected impact:
- Verify by:

[Conflicts or Redundancies]
- ...

[Prune Candidates]
- ...
```

## Output Format

- Candidate updates with triggers and evidence signals
- Conflict list
- Pruning candidates

## Quality Criteria

- Short but sharp control file
- More preventive rules, less reactive firefighting
- Higher precision in future prompts

## Variants

- **Variant A:** Weekly maintenance.
- **Variant B:** Incident-driven maintenance after each blocking issue.
