# Live Diff Monitoring Ai Editing

## Purpose
Building a prompt for real-time review of AI-generated code changes via diff-flow, said risks are caught early.

## Input
- Other files in the workspace
- Baseline (git or other reconciliation point)
- Current task/template

## Instructions
1. Monitor changes continuously and group by file type and risk.
2. Mark new files, modified files and potentially dangerous patterns.
3. Prioritize review of auth, config, migration and build related.
4. Give short review comments with concrete action per finding.
5. If big changes happen quickly: suggest stop point and mini-qa.
6. Give a "safe to continue?" signal after each review round.

## Output Format
- `Change Summary`
- `Risk Hotspots`
- `Review Comments`
- `Mini QA Gate`
- `Continue / Pause Decision`

## Quality Criteria
- Quick feedback without blocking momentum
- Focus on regression risk
- Clear connection to mal/scope
- Practical for manual follow-up

## Variants
- Variant A: Aggressive review level for critical branches
- Variant B: Low review level for fast prototype iteration
