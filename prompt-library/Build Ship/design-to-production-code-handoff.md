# Design To Production Code Handoff

## Purpose
Create a prompt that takes a UI idea, sketch or screenshot into structured, implementable front-end code via AI design tools and code assistants.

## Input
- UI reference (text, sketch or screenshot)
- Template system (web/mobile)
- Design requirements (component style, accessibility, responsiveness)

## Instructions
1. Extract layout, components and interactions from the base.
2. Translated the design into component planes (sections, states, props).
3. Set quality requirements for accessibility and responsiveness.
4. Generate code structure in clear steps: scaffold -> styling -> behavior.
5. Define review-gate before implementation is considered complete.
6. Give suggestions on how to fine-tune the design after the first render.

## Output Format
- ``Design Extraction''
- `Component Map`
- ``Implementation Plan''
- ``Quality Gates''
- ``Refinement Loop''

## Quality Criteria
- Traceability between design and code
- Good UX base and accessibility
- No overgeneric "AI slop" layout
- Ready for practical further development

## Variants
- Variant A: Fast MVP render for validation
- Variant B: Production-ready UI with strict design system discipline
