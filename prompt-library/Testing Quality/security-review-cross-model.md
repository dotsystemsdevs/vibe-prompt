---
title: Cross-Model Security + Performance Review
source: r/ClaudeAI — The Ultimate Vibe Coding Guide (910 upvotes)
---

# Cross-Model Security + Performance Review

Use a second AI (e.g. Gemini 2.5 Pro) to review your code, then feed the findings back into Claude to fix. Leverages large context windows for whole-feature review.

## Security Review Prompt (paste into Gemini with your code)

```
You are a senior security engineer. Review the following code and identify:
- Any security vulnerabilities (OWASP Top 10, injection, auth issues, exposed secrets, IDOR, missing RLS)
- Severity level for each issue (critical / high / medium / low)
- Concrete fix recommendation for each

Be blunt. Do not sugarcoat. I want the real issues.

[PASTE CODE HERE]
```

## Performance Review Prompt (paste into Gemini with your code)

```
You are an expert [Next.js / React / Node.js — pick your stack] engineer.
Review the following code for:
- Performance bottlenecks
- Bad patterns or anti-patterns for this stack
- Unnecessary re-renders, N+1 queries, blocking operations, memory leaks

List each issue with a fix recommendation.

[PASTE CODE HERE]
```

## Fix Prompt (paste findings into Claude)

```
A security/performance review flagged these issues in our code:
[PASTE REVIEW FINDINGS]

Fix each one. Do not change anything unrelated.
```

## Why it works

Different models catch different things. Gemini's huge context window handles full-feature code dumps. Claude is better at applying targeted fixes. Using both is a force multiplier.
