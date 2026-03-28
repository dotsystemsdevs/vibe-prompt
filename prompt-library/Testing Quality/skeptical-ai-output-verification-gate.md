# Skeptical Ai Output Verification Gate

## Purpose
Countering overconfidence in AI output by requiring proof of verification before proposals are accepted.

## Input
- AI suggestions/answers
- Code or factual basis
- Risk level of the decision

## Instructions
Copy the prompt below:

```text
Treat the previous AI output as a hypothesis, not truth.

Tasks:
1) Extract all major claims.
2) Classify each as:
   - Verified by evidence
   - Plausible
   - Unverified/high-risk
3) For unverified claims, provide the fastest validation test.
4) Block final recommendation until critical claims are validated.

Output format:
[Claim Register]
- Claim:
  - Status:
  - Evidence:
  - Validation test:

[Release Gate]
- Can proceed? yes/no
- Blocking reasons:

[Next Actions]
1) ...
2) ...
```

## Output Format
- Claim register with status
- Release gate
- Next verification step

## Quality Criteria
- No blind trust
- Snabb riskreducering
- Clear go/no-go signal

## Variants
- Variant A: Code decision.
- Variant B: Product/strategy decision.
