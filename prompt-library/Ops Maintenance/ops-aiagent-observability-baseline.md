# Ops Aiagent Observability Baseline

## Purpose
Create a practical baseline for operation of AI/LLM services with logging, metrics, tracing and alerting.

## Input
- Service type (RAG API, voice agent, assistant)
- SLO template (latency, uptime, error budget)
- Environment (dev/staging/prod)

## Instructions
Copy the prompt below:

```text
You are an AI service reliability engineer.
Design an observability baseline for my production LLM/RAG service.

Include:
1) Logging strategy (structured logs, correlation IDs, redaction rules)
2) Metrics (request rate, latency, error rate, token usage, retrieval hit rate)
3) Tracing (request path across retrieval -> model -> response)
4) Alerting (critical vs warning)
5) Dashboard layout for fast incident triage

Constraints:
- Include PII-safe logging guidance.
- Keep setup practical for small teams.
- Define what to monitor first vs later.

Output format:
<MonitoringSpec>
- Signals:
- Collection method:
- Owner:
</MonitoringSpec>

<Alerts>
- Alert:
  - Trigger:
  - Severity:
  - Runbook first action:
</Alerts>

<Dashboards>
- Executive dashboard
- On-call dashboard
- Model quality dashboard
</Dashboards>
```

## Output Format
- Baseline-spec for observability
- Priority alarms and runbook first steps
- Dashboard plan for different needs

## Quality Criteria
- Fast incident detection
- PII stuff logging
- Practical for smaller teams
- Clear prioritization of signals

## Variants
- Variant A: Minimal setup (logs + 5 critical metrics).
- Variant B: Full setup (metrics + traces + SLO-based alerting).
