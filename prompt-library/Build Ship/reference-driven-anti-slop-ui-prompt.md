# Reference Driven Anti Slop Ui Prompt

## Purpose
Avoid generic "AI slop" UI by forcing reference-driven decisions and clear design constraints.

## Input
- Skarmtyp/sida
- Malgrupp
- Varumarkeston
- Referenser (screens, snippets, designsystem)

## Instructions
Copy the prompt below:

```text
Design this UI with specific references and constraints, not generic patterns.

Inputs:
- Screen/page:
- Audience:
- Brand tone:
- References (links/snippets):

Requirements:
1) Extract concrete visual cues from references.
2) Define layout, spacing, typography, and component behaviors explicitly.
3) Avoid default template aesthetics.
4) Include accessibility checks.
5) Provide "why" for each major design choice.

Output format:
[Design Spec]
- Layout:
- Typography:
- Components:
- Interaction states:

[Reference Mapping]
- Reference cue -> Applied decision

[A11y Checklist]
- ...
```

## Output Format
- Practical design spec
- Reference mapping
- A11y checklist

## Quality Criteria
- Mindre generisk UI
- Starkare visuell identitet
- Forutsagbara komponentbeslut

## Variants
- Variant A: Dashboard/internal tool.
- Variant B: Marketing landing page.
