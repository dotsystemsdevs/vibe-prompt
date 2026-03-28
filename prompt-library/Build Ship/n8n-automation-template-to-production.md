# n8n Automation Template to Production

## Purpose

Produce a reusable prompt that takes an n8n template from idea to production-ready AI automation with clear validation steps.

## Input

- Automation goal
- Trigger and data sources
- Desired outcome

## Instructions

1. Map the workflow into steps with inputs and outputs per node.
2. Define error handling and retries for critical nodes.
3. Add observability hooks: logging, alerts, failure cases.
4. Require a test-run scenario with at least three edge cases.
5. Identify cost hotspots in AI calls and propose optimizations.
6. Close with a deployment checklist.

## Output Format

- `Workflow Blueprint`
- `Failure Handling Plan`
- `Test Scenarios`
- `Cost Optimization Notes`
- `Deployment Checklist`

## Quality Criteria

- Stable execution model
- Clear debuggability
- Cost-aware AI usage
- Ready for operations handoff

## Variants

- **Variant A:** Internal team automation.
- **Variant B:** Customer-facing automation with higher reliability requirements.
