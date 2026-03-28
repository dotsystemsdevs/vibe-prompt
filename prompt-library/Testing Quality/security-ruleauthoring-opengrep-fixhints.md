# Security Ruleauthoring Opengrep Fixhints

## Purpose
Extend scanner protection with new rules and matching AI-fix hints for quick remediation.

## Input
- New vulnerability type
- Target language
- Detection pattern
- Fix strategy

## Instructions
Copy the prompt below:

```text
Create a new scanner rule + AI fix hint pair.

Inputs:
- vulnerability class:
- language:
- vulnerable pattern examples:
- safe replacement pattern:

Tasks:
1) Draft an Opengrep rule for detection.
2) Add validation checklist for rule quality.
3) Write corresponding AI fix hint template:
   - what is wrong
   - why it matters
   - exact fix pattern
   - verification step
4) Add test cases:
   - should match
   - should not match

Output format:
[Rule Draft]
...

[Fix Hint Template]
...

[Validation Plan]
...

[Test Cases]
...
```

## Output Format
- Rule draft
- AI fix hint
- Validering + testfall

## Quality Criteria
- Fewer false positives/negatives
- High remediation quality
- Fast onboarding of new vuln classes

## Variants
- Variant A: Web app vulns.
- Variant B: Smart contract/web3 vulns.
