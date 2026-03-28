---
title: Agent Troubleshooting Prompts
source: github.com/KhazP/vibe-coding-prompt-template — README.md
---

# Agent Troubleshooting Prompts

Copy-paste fixes for when your AI agent goes wrong. Use these when the AI is ignoring your docs, drifting from your PRD, or over-engineering.

## AI ignores your docs / AGENTS.md

```
First read AGENTS.md, PRD, and TechDesign. Summarize what you understand about the project before writing any code.
```

## Code doesn't match the PRD

```
Re-read PRD section on [feature name]. List all acceptance criteria for this feature. Then refactor the code to match them exactly.
```

## AI over-engineering / building too much

```
Prioritize MVP scope only. Offer the simplest working implementation that satisfies the acceptance criteria. No extra features.
```

## Deployment failing

```
Walk through the deployment checklist step by step. Verify all environment variables are set. Run a health check. Report what you find before trying any fixes.
```

## AI going in circles / rabbit hole (3+ failed attempts)

```
Stop. Do not attempt another fix yet.
1. List every file involved in this error
2. List your top 5 suspects with reasoning
3. Add strategic logs to confirm which suspect is causing it
Run the code and show me the log output. Do not fix anything yet.
```

## AI modified files you didn't ask it to

```
You modified [file/component] which was not part of this task. Revert those changes and only keep changes to [specific files]. Show me the diff before committing.
```

## Context degraded in long session

```
Summarize: what feature were we building, what files did we touch, what's the current state, and what's the next step. Write this to MEMORY.md. Then we'll start a fresh session.
```
