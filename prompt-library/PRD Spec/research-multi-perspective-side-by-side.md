# Research: Multi-Perspective Side-by-Side

## Purpose

Improve reasoning quality by comparing several perspectives in parallel on the same question.

## Input

- Question or topic
- Perspectives (for example: role, stakeholder, technical lens)
- Decision criteria

## Instructions

Copy the prompt below:

```text
Answer the same question from multiple perspectives side by side.

Question:
[insert]

Perspectives:
- Perspective A:
- Perspective B:
- Perspective C:

Requirements:
1) Each perspective must include strongest argument, biggest concern, and recommended action.
2) Then synthesize common ground and key disagreements.
3) End with a neutral recommendation given my goal.

Output format:
[Perspective A]
- Strongest argument:
- Biggest concern:
- Recommended action:

[Perspective B]
...

[Perspective C]
...

[Synthesis]
- Common ground:
- Key disagreements:

[Neutral Recommendation]
...
```

## Output Format

- Perspective comparison side-by-side
- Synthesis of consensus and conflict
- Neutral recommendation

## Quality Criteria

- Less one-sided analysis
- Stronger decisions under uncertainty
- Clear, comparable structure

## Variants

- **Variant A:** Policy or ethics.
- **Variant B:** Product or technology choice.
