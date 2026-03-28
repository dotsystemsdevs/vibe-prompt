# Tech Stack Version Pinned Decision Log

## Purpose
Lock technology choices with precise versions, compatibility and trade-offs for reproducible development.

## Input
- Product requirements
- Team competence
- Operating environment

## Instructions
Copy the prompt below:

```text
Create TECH_STACK.md with exact versions and rationale.

Include sections:
1) Architecture pattern and deployment model
2) Frontend stack (framework, state, styling, forms, types)
3) Backend stack (runtime, framework, DB, auth, caching, storage)
4) DevOps (CI/CD, hosting, version control strategy)
5) Security and observability dependencies
6) Upgrade policy and breaking change rules

Rules:
- No "latest" versions.
- Justify each key choice.
- List alternatives considered and why rejected.
- Include install/setup snippets.

Output format:
[TECH_STACK]
...
```

## Output Format
- TECH_STACK.md with version lock

## Quality Criteria
- Reproducible setup
- Less stack operation between environments
- Clear decision log for future changes

## Variants
- Variant A: Startup stack.
- Variant B: Enterprise-compliant stack.
