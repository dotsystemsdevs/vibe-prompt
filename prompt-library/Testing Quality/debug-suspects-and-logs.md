---
title: Debug Suspects + Logs Pattern
source: r/ClaudeAI — The Ultimate Vibe Coding Guide (910 upvotes)
---

# Debug Suspects + Logs Pattern

When an AI has failed 3+ times to fix a bug and is going in circles, use this to reset and go systematic.

## Prompt

```
Stop trying to fix this. Instead:
1. Take an overview of all components related to this error
2. List your top 3-5 suspects for what is causing it, with reasoning
3. Add strategic console.log / debug statements to confirm which suspect is right
Do NOT make any fixes yet. Just diagnose.
```

## Follow-up (after you run the code and get log output)

```
Here is the log output: [paste logs]
Based on this, what is the root cause? Now fix only that.
```

## Why it works

Forces the model out of "fix and guess" mode into "diagnose first" mode. The log output gives it real evidence instead of assumptions. Works 80%+ of the time when repeated guessing has failed.
