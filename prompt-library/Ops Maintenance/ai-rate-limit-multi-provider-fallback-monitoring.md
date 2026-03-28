# Ai Rate Limit Multi Provider Fallback Monitoring

## Purpose
Design a practical rate-limit monitoring and fallback strategy across multiple AI providers to prevent user-facing chat outages.

## Input
- Provider list (OpenAI, Anthropic, Google, etc.)
- Current request volume pattern
- Existing fallback and retry behavior

## Instructions
1. Define provider-specific limit surfaces (RPM, TPM, daily quota, concurrent calls).
2. Build an alert model with warning and critical thresholds.
3. Design automatic fallback routing rules when limits are close or exceeded.
4. Add graceful degradation behavior for frontend and API responses.
5. Define incident playbook steps for blackouts or cascading failures.
6. Output dashboards and metrics required for ongoing operations.

## Output Format
- `Rate Limit Surface Map`
- `Alert Thresholds`
- `Fallback Routing Policy`
- `Graceful Degradation Rules`
- `Incident Playbook`
- `Monitoring Dashboard Spec`

## Quality Criteria
- Prevents silent failures
- Reduces downtime during spikes
- Clear operator actions during incidents
- Works across multi-provider stacks

## Variants
- Variant A: Early-stage app with minimal ops tooling
- Variant B: Production app with strict SLA requirements
