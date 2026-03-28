# Ui Ux Tooling Fidelity Pipeline

## Purpose
Create a prompt that selects the right AI-UX/UI tool depending on whether you start from text, wireframe, screenshot or figma.

## Input
- Starting material (text/sketch/screenshot/design file)
- Desired fidelity (low, mid, high)
- Requirements for code export and editability

## Instructions
1. Identify the quality and limitations of the starting material.
2. Choose tool chain for fastest way to editable design.
3. Define transitions between fidelity levels.
4. Add quality gates for usability and consistency.
5. If the template is code: specify handoff requirements to the frontend.
6. Provide an iterative loop for feedback -> design fix -> new export.

## Output Format
- ``Input Diagnostics''
- `Toolchain Recommendation`
- ``Fidelity Transition Plan''
- ``Quality Gates''
- ``Design-to-Code Handoff''
- `Iteration Loop`

## Quality Criteria
- Steering tool to steering starting point
- Clear handoff without information loss
- Focus on usability, not just aesthetics
- Easy to iterate with team feedback

## Variants
- Variant A: Quick prototype demo
- Variant B: Production-oriented design system flow
