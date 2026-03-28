# Debug Verify Sources Not Guessing

## Purpose
Stop AI loops of guesswork by forcing tool-driven verification before fix proposals.

## Input
- Felmeddelande/logg
- Relevanta filer
- Reproduceringssteg

## Instructions
Copy the prompt below:

```text
STOP guessing. Verify first.

Task:
[insert bug report]

Rules:
1) Do not propose a fix before gathering evidence.
2) Show what was checked (files, logs, commands, docs).
3) List top 2 hypotheses only after evidence review.
4) Propose minimal fix for most likely hypothesis.
5) Provide proof checks before declaring resolved.

Output format:
[Evidence Collected]
- ...

[Hypotheses]
1) ...
2) ...

[Minimal Fix]
- ...

[Proof Checklist]
- [ ] Repro no longer fails
- [ ] No regression in related flow
```

## Output Format
- Evidence log
- Hypotheses
- Minimal fix + evidence checklist

## Quality Criteria
- Mindre hallucinerad felsokning
- Snabbare verklig rotorsak
- Falska "fixed" minskar

## Variants
- Variant A: Frontend issue.
- Variant B: API/backend issue.
