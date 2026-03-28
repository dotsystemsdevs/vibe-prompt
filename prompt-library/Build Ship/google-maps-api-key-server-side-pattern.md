# Google Maps Api Key Server Side Pattern

## Purpose
Create a security prompt that protects Google Maps API keys via server-side injection instead of hardcoding in the client.

## Input
- Server environment (Node/Express)
- Frontend file with API placeholder
- Key environment in `.env`

## Instructions
1. Load API key from environment variable on the server side.
2. Inject the key into HTML at request-time via placeholder replacement.
3. Block start if the key is missing and give a clear error message.
4. Clear separation between static file server and root-route injection.
5. Make recommendations for key restrictions in Google Cloud.
6. Conclude with a short security checklist for deployment.

## Output Format
- `Threat Model`
- `Secure Injection Flow`
- `Failure Modes`
- `Cloud Key Restrictions`
- `Deployment Checklist`

## Quality Criteria
- The key is not exposed in the repo
- Fail-fast in case of misconfiguration
- Simple local development without any workarounds
- Production-level security level

## Variants
- Variant A: Local dev with simple env management
- Variant B: Production with strict domain and API restriction
