# Fresh Condensed Context Prompt

## Purpose

Keep AI context fresh and condensed so quality does not degrade over long sessions.

## Input

- Current task
- Prior session summary
- Critical files or rules

## Instructions

Copy the prompt below:

```text
Keep context fresh and condensed.

Before answering:
1) Summarize current task in <=5 bullets.
2) List only the critical context needed now.
3) Drop stale details not needed for this step.
4) If context is too long, produce a compact handoff summary.

Output format:
[Task Snapshot]
- ...

[Critical Context Only]
- ...

[Dropped Context]
- ...

[Next Action]
- ...
```

## Output Format

- Compact task snapshot
- Critical context only
- Next steps

## Quality Criteria

- Less context bloat
- Higher precision per answer
- Better continuity between sessions

## Variants

- **Variant A:** Solo builder.
- **Variant B:** Team handoff with a short status block.
