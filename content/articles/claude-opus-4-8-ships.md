---
title: "Claude Opus 4.8 Ships: The Coding Default Got Stricter With Itself"
description: "Anthropic's Opus 4.8 is the new default across most paid tiers. The headline for vibe coders is self-review: Anthropic says it is far less likely to let its own code flaws slide."
date: "2026-06-15"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
imageAlt: "Circuit board with neural network paths"
author: "dot.systems"
category: models
---

Anthropic announced Claude Opus 4.8 on May 28, 2026, and made it the default model for Max, Team Premium, Enterprise pay-as-you-go, and Anthropic API accounts. If you vibe code through Claude Code, the Claude apps, or the API, this is most likely the model now answering you.

## What actually changed for coders

The number Anthropic led with is about self-review, not raw speed. According to the announcement, Opus 4.8 is roughly four times less likely than Opus 4.7 to let flaws in its own code pass unremarked. For vibe coding that matters more than a benchmark bump: the failure mode that costs you hours is not the model being slow, it is the model handing you confident, broken code and moving on. A model that catches more of its own mistakes before you do is a model that shortens the polish phase.

Opus 4.8 also keeps the 1M-token context window, so larger codebases and longer agent runs fit without as much context juggling.

## Should you switch

If you are already on a paid tier, you probably already did, it is the default. The practical advice is unchanged: let the model verify its own work. Ask "how would you check this works?" before you accept a change, and keep your AGENTS.md tight so the stricter self-review has the right constraints to check against.

## Where it sits

Opus 4.8 is the current flagship for hard, agentic coding. Fable 5 is the other recent release in the lineup. For day-to-day vibe coding, the strict-with-itself behavior of Opus 4.8 is the part worth knowing.

## Sources

- [Claude New Updates 2026: Features, Models, Pricing (Blockchain Council)](https://www.blockchain-council.org/claude-ai/claude-new-updates-2026-features-models-pricing/)
- [Every Claude Model: Complete Guide (claudefa.st)](https://claudefa.st/blog/models)
- [What's new, Claude Code Docs](https://code.claude.com/docs/en/whats-new)
