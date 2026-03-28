# Five Golden Rules Master Prompt

## Purpose
Gather the five golden rules of prompting into a single master prompt for consistent high quality.

## Input
- Task
- Relevant files
- Target behavior
- Limitations

## Instructions
Copy the prompt below:

```text
Use this 5-rule prompting protocol for the task below.

Task:
[insert task]

Context files:
[@file1 @file2 ...]

Desired behavior:
[insert expected behavior]

Rules:
1) Be explicit with context (reference exact files/modules).
2) Focus on behavior/outcome before implementation details.
3) For complex work: plan first, then execute step 1.
4) Use role framing only when it improves judgment.
5) Prefer iterative delivery over one giant change.

Output format:
[Task Understanding]
- ...

[Behavior Target]
- ...

[Step Plan]
1) ...
2) ...

[Execute Step 1]
...

[Verify]
- ...
```

## Output Format
- Task understanding
- Model of behavior
- Plan + first execution steps
- Verification

## Quality Criteria
- Clear context and scrutiny
- Fewer one-shot misses
- Stable iterative work set

## Variants
- Variant A: Card team (max 5 bullets in total).
- Variant B: Deep mode with risk list and rollback plan.
