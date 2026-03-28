# Stepwise Reasoning Structured Response

## Purpose
Get better answers to complex tasks by having the model work methodically before delivering a clear final answer.

## Input
- Problem or question
- Context and limitations
- Desired decision criterion

## Instructions
Copy the prompt below:

```text
Solve this carefully before answering.

Task:
[insert task]

Constraints:
[insert constraints]

Instructions:
1) Analyze the problem methodically.
2) Evaluate at least two plausible approaches.
3) Select the best approach based on constraints.
4) Return only:
   - Final answer
   - Brief rationale (3 bullets max)
   - Risks/unknowns

Output format:
[Final Answer]
...

[Brief Rationale]
- ...
- ...
- ...

[Risks or Unknowns]
- ...
```

## Output Format
- Slutsvar
- Kort motivering
- Risker/osakerheter

## Quality Criteria
- Less impulsive responses
- Clear decision line
- Short and usable report

## Variants
- Variant A: Decision mode (for 2-3 alternatives with trade-offs).
- Variant B: Debug mode (show most likely root cause + verification).
