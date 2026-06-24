---
title: "Vibe Debugging: How to Fix AI Code That Breaks"
description: "Your app worked in the demo and breaks in production. Vibe debugging is the discipline of fixing code you didn't write: the failure patterns, a workflow that works, and when to rewrite instead."
date: "2026-06-21"
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80"
imageAlt: "Terminal window showing code"
author: "dot.systems"
category: guides
---

Vibe coding is generation. Vibe debugging is what happens next, when the thing you generated in 20 minutes meets real users. It is its own skill, because you are fixing code you didn't write, didn't architect, and may not fully understand.

## Why AI code breaks

Across analyses of AI-generated codebases, the same failures show up again and again:

- **Shallow logic** that nails the happy path and crashes on an empty string or page two.
- **Hallucinated APIs**: methods and fields that don't exist in the version you're on.
- **Error-handling theater**: try/catch blocks that swallow errors silently, so the app looks robust and is actually blind.
- **Dependency bloat**: twelve packages where three would do, some unmaintained.
- **Implicit state**: works for one user, races and corrupts under a hundred.
- **The test desert**: no tests, or tests that pass even when the code is broken.

The dangerous ones are silent. The code runs and just doesn't do what you asked. We keep a running list of these in [Fixes](/fixes), each with a paste-ready prompt.

## A workflow that works

1. **Comprehend before you fix.** Ask the agent to map the architecture and trace the bug path from the UI action to the backend response, before changing a single line.
2. **Let machines find the obvious bugs.** Run the type checker (`tsc --noEmit`, `mypy`) and a linter. This alone catches a large share of issues, especially hallucinated APIs, in minutes.
3. **Write a failing test first.** Reproduce the bug as a test, then fix it. Now you can prove it's gone and that it stays gone.
4. **Use a second agent.** The model that wrote the bug is the worst one to find it. A fresh agent, or a different model, reviewing for correctness and edge cases catches what the author missed.

## Debug or rewrite?

A useful heuristic: if you can explain the bug in one sentence, debug it. If you need a whiteboard, rewrite it.

Debug when the issue is localized and the architecture is sound. Rewrite when there are no tests, the bugs span three or more subsystems, or you have spent longer debugging than the original generation took. If you do rewrite, don't re-prompt the same way. Write a short spec with acceptance criteria and generate it in small, tested pieces.

## The takeaway

Vibe debugging isn't a failure of vibe coding, it's the half nobody demos. Budget for it, build the type-check, lint, and test net early, and treat your agents as a team that reviews each other rather than a single oracle.

## Sources

- [Vibe Debugging: How to Fix AI-Generated Code That Breaks, amux](https://amux.dev/)
- [Why Vibe Coding Fails and How to Fix It, Columbia DAPLab](https://www.cs.columbia.edu/)
