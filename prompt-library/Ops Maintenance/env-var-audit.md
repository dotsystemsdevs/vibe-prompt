---
title: Environment Variable Audit
---

## When to use
Before deploying to staging or production, or when you've been adding features across multiple branches and suspect environment variables may be out of sync.

## Prompt

```
Audit my environment variables for consistency across environments:

1. Scan the codebase for every `process.env`, `import.meta.env`, and env-access pattern. List every variable name found.
2. For each variable, check if it appears in:
   - `.env.example`
   - `.env.local` (if accessible)
   - `vercel.json`, `fly.toml`, `Dockerfile`, `.github/workflows/*.yml`, or any deployment config
3. Flag any variable that:
   - Exists in code but not in `.env.example`
   - Exists in code but not in the deployment config you're about to push to
   - Has a different value or type expectation between environments
4. Generate the missing `.env.example` entries and deployment config additions as code blocks I can copy-paste

Do not read or print the actual secret values. Use `[SET]`, `[MISSING]`, or `[DIFFERS]`.
```
