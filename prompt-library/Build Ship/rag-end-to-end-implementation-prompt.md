# Rag End To End Implementation Prompt

## Purpose
Build a complete RAG service from ingestion to API serving, with clear technical decisions and verification.

## Input
- Domain context (support, finance, legal, etc.)
- Data calls (pdf, html, docs, db)
- Stack preferences (FastAPI, pgvector, Pinecone, etc.)
- Quality benchmark (latency, precision, cost)

## Instructions
Copy the prompt below:

```text
You are a RAG systems engineer.
Design and implement an end-to-end RAG service.

Scope:
1) Ingestion pipeline
2) Chunking strategy
3) Embedding generation
4) Vector index setup
5) Retrieval + reranking
6) LLM answer generation with citations
7) API serving layer

Requirements:
- Explain trade-offs for chunk size, overlap, and index design.
- Include fallback strategy when retrieval confidence is low.
- Add hallucination controls and refusal behavior.
- Include basic eval harness with test queries.

Output format:
<Architecture>
- Components
- Data flow
- Storage choices
</Architecture>

<ImplementationPlan>
Step 1 ...
Step N ...
</ImplementationPlan>

<Guardrails>
- Hallucination control:
- Fallback behavior:
- Security/PII:
</Guardrails>

<EvalStarter>
- Golden queries
- Expected answer traits
- Pass/fail thresholds
</EvalStarter>
```

## Output Format
- Architecture + phased implementation
- Guardrails for quality and risk
- Ready-to-start eval-setup

## Quality Criteria
- End-to-end tank
- Trade-offs explained
- Clear fallback in case of uneventful retrieval
- Verifiable quality

## Variants
- Variant A: Local MVP with pgvector.
- Variant B: Cloud variant with managed vector DB and CI integration.
