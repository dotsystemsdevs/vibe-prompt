# Voice / LLM Provider Fallback Routing

## Purpose

Produce robust provider routing for prompt optimization (DeepSeek / OpenAI / local) with automatic fallback.

## Input

- Primary provider
- Backup provider(s)
- API error and timeout patterns
- Cost ceiling

## Instructions

Copy the prompt below:

```text
Design provider routing and fallback for voice-to-prompt optimization.

Inputs:
- Primary provider:
- Backup providers:
- Budget ceiling:
- Reliability requirement:

Tasks:
1) Define routing order and fallback triggers.
2) Define timeout and retry strategy.
3) Define degraded mode (for example, transcription-only output if all LLMs fail).
4) Provide a provider health checklist.

Output format:
[Routing Strategy]
- ...

[Fallback Triggers]
- ...

[Retry Policy]
- ...

[Degraded Mode]
- ...

[Ops Checklist]
- ...
```

## Output Format

- Routing strategy
- Fallback triggers
- Degraded-mode plan

## Quality Criteria

- High availability
- Controlled cost
- Graceful degradation without hard stops

## Variants

- **Variant A:** Cloud-only providers.
- **Variant B:** Cloud plus local hybrid.
