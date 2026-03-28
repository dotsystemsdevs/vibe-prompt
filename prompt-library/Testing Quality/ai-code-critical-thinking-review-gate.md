# Ai Code Critical Thinking Review Gate

## Purpose
Turn AI-generated code into trustworthy output by forcing critical-thinking review gates before acceptance.

## Input
- AI-generated code diff
- Requirement or ticket
- Known constraints (security, performance, maintainability)

## Instructions
1. Map each code change to explicit requirement coverage.
2. Identify unverifiable assumptions made by the model.
3. Run edge-case review for correctness, error handling, and data integrity.
4. Check for architecture drift, hidden coupling, and unnecessary complexity.
5. Produce approve/block verdict with exact fixes required.
6. If blocked, generate a re-prompt that addresses only the failure points.

## Output Format
- `Requirement Coverage Matrix`
- `Assumption Audit`
- `Edge-Case Findings`
- `Architecture Risk Notes`
- `Gate Verdict (Approve/Block)`
- `Targeted Re-Prompt`

## Quality Criteria
- No blind trust in model output
- Decision is evidence-based
- Clear and minimal remediation path
- Reusable in PR workflows

## Variants
- Variant A: Fast gate for routine changes
- Variant B: Deep gate for critical systems
