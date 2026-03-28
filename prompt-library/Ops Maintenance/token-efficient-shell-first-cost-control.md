# Token-Efficient, Shell-First Cost Control

## Purpose

Create an operations prompt that maximizes delivery per token through shell-first automation, smart routing, and lighter coordination overhead.

## Input

- Phase or task to execute
- Cost ceiling or budget profile
- Priority: quality, balance, or budget

## Instructions

1. Push repetitive logic into shell or script steps where possible.
2. Use more expensive models only for steps with high reasoning requirements.
3. Reduce context duplication between agents through role-adapted context.
4. Summarize token risks before execution and suggest cheaper fallbacks.
5. After the run: report cost results and suggestions for the next optimization.
6. If quality is at risk from an overly aggressive budget: say so explicitly.

## Output Format

- `Execution Strategy`
- `Model/Agent Routing`
- `Token Risk Forecast`
- `Cost Guardrails`
- `Post-Run Optimization Notes`

## Quality Criteria

- Explicit cost awareness
- No hidden trade-offs
- Balanced quality and budget
- Reusable shell-first patterns

## Variants

- **Variant A:** API cost minimization for high-volume phases.
- **Variant B:** Quality-first with cost reporting as a secondary goal.
