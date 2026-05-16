---
title: Context Window Compaction
---

## When to use
When your AI coding session is getting long (50+ messages), responses are slowing down, and the model is forgetting earlier decisions. Use this to hand over a clean summary before starting a fresh session.

## Prompt

```
Our session is getting long. Before we continue, compact the context:

1. List every file we touched in this session and what changed (one line each)
2. Summarize the current architecture state -- what's built, what's pending, which stack we're on
3. Capture any decisions that are still open (trade-offs not resolved, TODOs, questions for me)
4. List any hard-won knowledge: bugs we debugged, why certain approaches failed, dependencies that had issues

Format this as a single markdown block I can paste into a fresh session.

After writing the summary, I'll start a new session with it.
```
