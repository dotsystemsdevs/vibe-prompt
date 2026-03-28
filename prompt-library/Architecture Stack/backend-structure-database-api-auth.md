# Backend Structure Database Api Auth

## Purpose
Define backend architecture, database schema and API contracts in detail before implementation.

## Input
- Domain models
- Eligibility requirements
- API usage

## Instructions
Copy the prompt below:

```text
Create BACKEND_STRUCTURE.md for this project.

Include:
1) Backend architecture overview
2) Database schema with exact field types and constraints
3) Relationships and indexing strategy
4) Authentication + session strategy
5) API endpoint contracts (request/response/errors)
6) Validation rules and error schema
7) Caching and versioning strategy

Rules:
- Use exact data types and constraints.
- Separate DB schema from API abstraction.
- Include security requirements for auth and sensitive data.

Output format:
[BACKEND_STRUCTURE]
...
```

## Output Format
- BACKEND_STRUCTURE.md with schema + API spec

## Quality Criteria
- Less backend hallucination
- Clear contracts between frontend and backend
- Robust auth/data integrity

## Variants
- Variant A: Monolith API.
- Variant B: Service-oriented backend.
