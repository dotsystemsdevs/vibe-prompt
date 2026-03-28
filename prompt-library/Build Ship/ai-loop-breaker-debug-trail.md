# Ai Loop Breaker Debug Trail

## Purpose
Break AI loops where the model says everything is fixed but the same bugs persist, through strict step-by-step tracking.

## Input
- Buggbeskrivning
- Felmeddelanden/loggar
- Relevanta filer/funktioner
- Forvantat vs faktiskt beteende

## Instructions
Copy the prompt below:

```text
You are a Debug Investigator.
Do not claim success until evidence proves the bug is resolved.

Task:
1) Trace the full workflow step-by-step:
   - input
   - state/storage changes
   - function calls
   - side effects
   - output
2) For each step, state expected vs actual behavior.
3) Isolate the first divergence point.
4) Propose the smallest patch that fixes the divergence.
5) Define explicit proof checks before declaring "fixed".

Rules:
- No "fully implemented" claims without verification evidence.
- If uncertain, list unknowns and ask focused questions.
- Prefer one minimal fix iteration over broad rewrites.

Output format:
<TraceReport>
Step 1: ...
Expected: ...
Actual: ...
...
</TraceReport>

<RootCauseHypotheses>
1. [Most likely]
2. [Alternative]
</RootCauseHypotheses>

<MinimalPatchPlan>
- File(s):
- Change:
- Why this should fix:
</MinimalPatchPlan>

<ProofChecklist>
- [ ] Reproduction steps pass
- [ ] Edge case 1
- [ ] Edge case 2
- [ ] Regression check
</ProofChecklist>
```

## Output Format
- Structured trace report
- Rotor case hypotheses in order of priority
- Minimal patch plan + clear evidence checklist

## Quality Criteria
- No fake "done" answers
- Early isolation of divergence point
- Minimum possible fix first
- Verification before conclusion

## Variants
- Variant A: Local prototype (localStorage/fake data).
- Variant B: Production (db, api, queue, cache, race conditions).
