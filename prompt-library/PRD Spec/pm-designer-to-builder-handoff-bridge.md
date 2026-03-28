# Pm Designer To Builder Handoff Bridge

## Purpose
Create a prompt that helps PMs and designers go from product idea to technical execution with AI without losing the business model.

## Input
- Product template
- User problems
- Progress mat (KPI or success criteria)

## Instructions
1. Translated product template into technical sub-templates in clear steps.
2. Define what must be built now vs. later (MVP scope).
3. Specify how the AI ​​assistant should work: plan, build, verify.
4. Requirements for traceability between business requirements and code output.
5. Raise risks where AI can optimize the wrong thing (local optimization).
6. End with a short backlog in priority order.

## Output Format
- `Product Goal -> Technical Goal Map`
- `MVP Boundary`
- `Execution Steps`
- `Risk Notes`
- `Prioritized Backlog`

## Quality Criteria
- Product benefit drives implementation
- Clear scope control
- Actionable for non-technical customers
- Ready to give directly to code agent

## Variants
- Variant A: PM-focused prototype plane
- Variant B: Designer-focused UX-to-code plan
