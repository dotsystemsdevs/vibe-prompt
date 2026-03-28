# Llm Evaluation Regression Ci

## Purpose
Set up a robust eval and regression tank for LLM/RAG systems so quality can be protected over time.

## Input
- The product's use cases
- Sample conversations/questions
- Risk types (hallucination, policy error, latency, cost)
- CI environment

## Instructions
Copy the prompt below:

```text
You are an LLM quality engineer.
Create an evaluation and regression testing framework for my LLM/RAG application.

Tasks:
1) Define evaluation dimensions:
   - correctness
   - groundedness/citations
   - safety/policy
   - latency
   - cost
2) Build a golden test set strategy:
   - seed cases
   - edge cases
   - adversarial cases
3) Propose quality gates for CI/CD.
4) Define fail conditions and rollback triggers.

Output format:
<EvalDimensions>
- Metric:
  - Why it matters:
  - How to measure:
</EvalDimensions>

<GoldenSetPlan>
- Category:
  - Example test:
  - Expected behavior:
</GoldenSetPlan>

<CIGates>
- Gate name:
  - Threshold:
  - Block release when:
</CIGates>

<RegressionWorkflow>
1. Pre-merge checks
2. Nightly runs
3. Alerting + triage
</RegressionWorkflow>
```

## Output Format
- Eval dimensions with food methods
- Golden set plan
- CI-gates with clear thresholds

## Quality Criteria
- Mattable quality
- Clear release blockers
- Thanks to both precision and operating cost
- Easy to connect automation

## Variants
- Variant A: Lean setup for small team.
- Variant B: Enterprise setup with more risk classifications and formalized triage.
