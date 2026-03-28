# Compiler Prompt Format Strict Io

## Purpose
Standardize prompt files with strict `Context`/`Output` contracts so the generator doesn't hallucinate files.

## Input
- Promptuppgift
- Kontextfiler
- Exakta outputfiler

## Instructions
Copy the prompt below:

```text
Create a strict prompt-stack file for code generation.

Task:
[insert task]

Use this exact structure:
# [Stage Title]
[clear task details]

## Context: [file1, file2, ...]
## Output: [path/to/fileA]
## Output: [path/to/fileB]

Rules:
1) Generate ONLY files listed in Output directives.
2) Assume ONLY Context and Output files exist.
3) Keep changes minimal and elegant.
4) Preserve syntax safety (escaped quotes, closed objects, valid strings).

Output format:
[Prompt File Draft]
...
```

## Output Format
- Strict prompt stage draft

## Quality Criteria
- Fewer junk files
- Minor syntax violations in generation
- Higher determinism in build steps

## Variants
- Variant A: Feature stage.
- Variant B: Test stage.
