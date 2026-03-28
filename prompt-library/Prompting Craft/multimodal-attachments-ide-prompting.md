# Multimodal Attachments (IDE Prompting)

## Purpose

Produce a reusable prompt that standardizes how files and images are attached in the IDE workflow for higher precision and fewer misunderstandings.

## Input

- User task
- Attached files (code, documents, images, data files)
- Error text or logs, if any

## Instructions

1. Identify each attachment and its role in the task.
2. Prioritize files that actually drive the problem (signal over noise).
3. Require the model to reference the correct attachment in its answer.
4. If attachments are missing: ask for the smallest necessary follow-up, not everything.
5. Separate image interpretation, text interpretation, and code interpretation in the analysis.
6. Provide a clear next step based on the provided materials.

## Output Format

- `Attachment Inventory`
- `Relevance Ranking`
- `Analysis by Modality` (image / text / code / data)
- `Action Proposal`
- `Missing Inputs` (if any)

## Quality Criteria

- Attachments are used actively, not ignored
- Traceable link between inputs and conclusions
- Few, precise follow-up questions
- High precision in debugging and code changes

## Variants

- **Variant A:** Bug triage with logs and screenshots.
- **Variant B:** Feature implementation with docs and existing code files.
