# Frontend Guidelines Design Tokens Components

## Purpose
Lock design system and component rules so AI consistently builds UI according to spec.

## Input
- Fire style
- Component requirements
- A11y requirements

## Instructions
Copy the prompt below:

```text
Create FRONTEND_GUIDELINES.md as a strict design system spec.

Must include:
1) Design principles
2) Design tokens (colors, typography, spacing, radius)
3) Usage rules for tokens
4) Component specs (button/input/card/modal etc.)
5) Variant/state rules (default/hover/focus/error/disabled/loading)
6) Accessibility standards (WCAG level + keyboard behavior)
7) Code examples for each core component

Rules:
- Use explicit token values.
- Define when to use each component variant.
- Keep classes and naming conventions consistent.

Output format:
[FRONTEND_GUIDELINES]
...
```

## Output Format
- FRONTEND_GUIDELINES.md with tokens + component rules

## Quality Criteria
- Visual consistency
- Fewer AI-generated UI anomalies
- Strong a11y base

## Variants
- Variant A: Tailwind-based system.
- Variant B: CSS variables + component library system.
