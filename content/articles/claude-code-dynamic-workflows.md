---
title: "Claude Code's Dynamic Workflows: One Script, Hundreds of Agents"
description: "Anthropic shipped dynamic workflows in Claude Code, JavaScript that orchestrates up to a thousand subagents in the background. The trick is moving the plan out of context and into code."
date: "2026-06-14"
image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=80"
imageAlt: "Code on a dark screen"
author: "dot.systems"
category: news
---

Anthropic shipped dynamic workflows in Claude Code as a research preview on May 28, 2026, alongside Opus 4.8, and has since moved it toward general availability. It is the biggest change to how Claude Code runs work since subagents, and it is aimed squarely at jobs too big for one context window.

## What it is

A dynamic workflow is a JavaScript script that Claude writes for the task you describe, and a runtime executes in the background while your session stays responsive. The script can spawn tens, hundreds, or up to a thousand subagents, each doing a slice of the work, with the orchestrator checking results before anything reaches you.

The real innovation is not the agent count. It is that the plan moves out of the model's context window and into code. Traditional subagent approaches choke as coordination eats context; pushing orchestration into a JavaScript runtime is what makes 500-agent and 1,000-agent runs viable without quality falling apart.

## The receipt

The headline example: Jarred Sumner reportedly generated roughly 750,000 lines of code in about eleven days using dynamic workflows, a Zig-to-Rust port of the Bun JavaScript runtime, while keeping around 99.8 percent of the existing test suite green. Treat the exact figures as the author's own report, but the shape of the use case, a massive mechanical migration verified continuously, is exactly what this is for.

## When you'd reach for it

Not for a feature or a bug fix. Dynamic workflows earn their keep on scale work one context can't hold: codebase-wide migrations, audits, broad refactors, large review sweeps. It needs Claude Code v2.1.154 or later and is available on paid plans and the API, plus Bedrock, Vertex AI, and Microsoft Foundry.

## Sources

- [Introducing dynamic workflows in Claude Code, Anthropic](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)
- [Orchestrate subagents at scale, Claude Code Docs](https://code.claude.com/docs/en/workflows)
- [Claude Code adds dynamic workflows for parallel agent coordination, InfoQ](https://www.infoq.com/news/2026/06/dynamic-workflows-claude-code/)
