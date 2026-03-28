# Strict Output Schema Prompting

## Purpose
Reduce editing time by forcing the model to exact response template.

## Input
- Problemtyp
- Onskade sektioner
- Eventuella faltkrav

## Instructions
Copy the prompt below:

```text
Respond using this exact schema and no extra sections:

[Problem]
...

[Root Cause]
...

[Fix]
...

[Prevention]
...

Rules:
- If data is missing, write "Missing: <field>".
- Keep each section under 5 bullet points.
- Do not include intro/outro text.
```

## Output Format
- Exakt schema
- Inget extra fluff

## Quality Criteria
- Konsekvent struktur
- Snabb vidarebearbetning
- Fungerar for automation

## Variants
- Variant A: Debug schedule.
- Variant B: Strategy scheme (Goal, Constraints, Options, Decision, Next Step).
