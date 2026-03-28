# Precise File Reference Context

## Purpose
Reduce misunderstanding by forcing explicit file context in every code statement.

## Input
- Bug or feature
- Exact files/modules
- Reproduction or acceptance requirements

## Instructions
Copy the prompt below:

```text
Use explicit file context for this task.

Task:
[insert task]

Relevant files:
[@fileA @fileB @fileC]

Requirements:
1) Explain how each referenced file is involved.
2) Make changes only where justified by context.
3) If another file is needed, state why before editing.

Output format:
[Context Map]
- file -> role

[Planned Changes]
- file -> change

[Execution]
...

[Verification]
- ...
```

## Output Format
- Context map
- File specific change plan
- Execution + verification

## Quality Criteria
- Precise scope control
- Dangerous side tracks are reduced
- Better precision in changes

## Variants
- Variant A: Bugfix.
- Variant B: Feature implementation.
