# Security Falsepositive Privacyreporter

## Purpose
Report false positives with minimal data sharing and a clear privacy policy.

## Input
- Rule ID
- Sprak
- Reason category
- Intern notering (lokal, ej skickas)

## Instructions
Copy the prompt below:

```text
Prepare a privacy-safe false positive report payload.

Finding:
- rule_id:
- language:
- reason_category:

Rules:
1) Include only minimal metadata required.
2) Exclude all source code, file paths, repository URLs, and line numbers.
3) Show exactly what will be sent before submission.
4) Require explicit human confirmation before sending.

Output format:
[Preview Payload]
{
  ...
}

[Excluded Data]
- code snippets
- file paths
- repo URL
- line numbers

[Confirmation Prompt]
...
```

## Output Format
- Preview payload
- Exclusion list
- Confirmation step

## Quality Criteria
- Strong privacy protection
- Transparency before reporting
- Lower risk of data exposure

## Variants
- Variant A: Strict privacy mode.
- Variant B: Team mode with audit trail.
