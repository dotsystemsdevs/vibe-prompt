# Security Master Fix Prompt Generator (Severity Order)

## Purpose

Generate a single master prompt that fixes multiple vulnerabilities systematically in severity order.

## Input

- Findings list (file, line, CWE/CVE, severity)
- Project context
- Test commands

## Instructions

Copy the prompt below:

```text
Generate a single master fix prompt for all security findings.

Input findings:
[paste findings]

Requirements:
1) Deduplicate overlapping findings.
2) Group by vulnerability type.
3) Order by severity: critical -> high -> medium -> low.
4) For each finding include:
   - vulnerable pattern
   - exact fix pattern
   - verification step
5) Add final checklist for regression and security re-scan.

Output format:
[Master Fix Prompt]
...

[Deduplicated Findings Table]
- ...

[Verification Checklist]
- ...
```

## Output Format

- Master fix prompt
- Deduplication overview
- Final verification checklist

## Quality Criteria

- Fewer duplicate fix passes
- Clear ordering when finding volume is large
- Higher chance of first-pass correct fixes

## Variants

- **Variant A:** API and backend security issues.
- **Variant B:** Full-stack security issues.
