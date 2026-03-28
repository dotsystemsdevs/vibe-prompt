# Draft To Final Prompt Iterative Enhancer

## Purpose
Build a prompt that takes a simple description and delivers a strong final prompt via the generate + enhance loop.

## Input
- Brief natural description of the need
- Template model or agent type
- Unwanted tone and constraints

## Instructions
1. Generate a first prompt version from the description.
2. Review weaknesses: ambiguity, scope gaps, missing gates.
3. Enhance the prompt in at least one enhance pass.
4. Compare before/after and justify why the new version is better.
5. Deliver a final copy-paste version plus short version.

## Output Format
- `Draft Prompt`
- `Weakness Scan`
- `Enhanced Prompt`
- `Before/After Diff`
- `Final Copy Prompt`

## Quality Criteria
- Ready for immediate use
- Clear goal, clear output, clear limitations
- Minimal hallucination risk through precision
- Short and long version for different situations

## Variants
- Variant A: Fast generate-only for simple tasks
- Variant B: Full generate+enhance+contrast for critical tasks
