---
title: No Unwanted Changes Guard
source: r/ClaudeAI — The Ultimate Vibe Coding Guide (910 upvotes)
---

# No Unwanted Changes Guard

Paste this at the bottom of ANY prompt when you want the AI to stay in its lane. Claude has a habit of "improving" things you didn't ask it to touch.

## Prompt

```
IMPORTANT: Do not change ANYTHING I did not explicitly ask for. Do not add, remove, or modify any code outside the specific task above. Only do exactly what I told you.
```

## Variations

**Softer:**
```
Only make the changes I described. Leave everything else exactly as is.
```

**Nuclear:**
```
I will only accept changes to [specific file/function]. Reject any output that touches anything else.
```

## Why it works

Claude optimizes for "helpful" — which sometimes means it refactors things you didn't ask. This constraint overrides that behavior.
