---
title: Pre-Merge Review Checklist for AI-Generated Code
source: github.com/KhazP/vibe-coding-prompt-template — templates/REVIEW-CHECKLIST.md
---

# Pre-Merge Review Checklist

Run this before merging any AI-generated code. Tell the agent to verify each item and provide proof (terminal output, screenshot).

## Prompt (tell the agent to self-review)

```
Before we consider this feature complete, go through this checklist and confirm each item. Provide terminal output or test results as proof — don't just say "yes".

CODE QUALITY
- [ ] No `any` types used (use `unknown` with type guards if needed)
- [ ] Protected files were NOT modified without permission
- [ ] No existing tests deleted or skipped
- [ ] Component/function doesn't break architecture boundaries

EXECUTION
- [ ] App compiles without fatal errors
- [ ] Linter passes (`npm run lint`)
- [ ] TypeScript check passes (`tsc --noEmit`)
- [ ] Related unit/integration tests pass
- [ ] UI works on both desktop and mobile (if applicable)

HANDOFF
- [ ] MEMORY.md updated with any new architectural decisions
- [ ] Obsolete spec files marked as resolved

Report which items pass and which fail. Fix failures before marking complete.
```

## Human review add-ons

Before merging, also check manually:
- No secrets or API keys in the diff
- No new dependencies added without checking package.json first
- Error states are handled (not just happy path)
- Loading states exist for async operations
