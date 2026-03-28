# Waitlist Data Exposure Incident Response

## Purpose
Create a rapid response and hardening plan when sensitive user data (e.g., waitlist entries) is accidentally exposed in frontend code.

## Input
- What data was exposed
- Exposure surface (URL, API response, client bundle, logs)
- Current auth and access model

## Instructions
1. Triage incident severity and estimate exposure scope.
2. Contain immediately: patch frontend, disable vulnerable endpoint, rotate keys if needed.
3. Define user impact and disclosure policy.
4. Add backend-side authorization and data-minimization controls.
5. Build regression tests preventing similar leaks.
6. Produce a postmortem with corrective actions and ownership.

## Output Format
- `Incident Severity Assessment`
- `Immediate Containment Steps`
- `User Impact and Communication Plan`
- `Permanent Fix Plan`
- `Regression Test Plan`
- `Postmortem Template`

## Quality Criteria
- Fast containment first
- Honest and compliant communication
- Root-cause correction, not just symptom patching
- Prevents recurrence through tests and policy

## Variants
- Variant A: Early-stage app with small user base
- Variant B: Public product with legal/compliance exposure
