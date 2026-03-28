# Spoken-to-Task Prompt Normalizer

## Purpose

Convert voice transcripts into sharp, executable coding prompts with correct scope and constraints.

## Input

- Raw transcript (from Whisper or similar)
- Project context
- Goal (feature / bug / refactor / review)

## Instructions

Copy the prompt below:

```text
Transform this spoken transcript into an execution-ready coding prompt.

Transcript:
[paste transcript]

Project context:
[insert context]

Task type:
[feature|bug|refactor|review|explain]

Tasks:
1) Remove filler words and ambiguity.
2) Extract explicit objective, constraints, and acceptance criteria.
3) Add missing technical context questions only if critical.
4) Output one short prompt and one detailed prompt.

Output format:
[Normalized Intent]
...

[Short Prompt]
...

[Detailed Prompt]
...

[Critical Clarifications]
- ...
```

## Output Format

- Normalized intent
- Short and detailed prompt variants
- Critical follow-up questions

## Quality Criteria

- Minimizes “voice noise”
- Maintains technical focus
- Fast path from speech to implementation

## Variants

- **Variant A:** Fast mode (minimal questions).
- **Variant B:** Safe mode (extra validation questions).
