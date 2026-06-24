---
title: "Vibe Coding's Security Bill Comes Due"
description: "A scam crew vibe-coded a credit-card-checking server and leaked 345,000 card details. Meanwhile CISOs are scrambling to contain AI code sprawl. The security cost of shipping fast is getting concrete."
date: "2026-06-17"
image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&q=80"
imageAlt: "Digital padlock and circuitry"
author: "dot.systems"
category: news
---

The convenience of vibe coding has a bill attached, and it is coming due in security. Two recent stories make the cost concrete, one criminal, one corporate.

## The carding server that leaked itself

According to Cybernews, a stolen-card marketplace called Jerry's Store used AI-assisted coding to stand up a server that verified stolen credit cards, then leaked the details of roughly 345,000 cards because the AI-generated server was insecure. Even the criminals got burned by the same failure mode that bites legitimate builders: AI produces code that runs, looks fine, and quietly leaves the door open.

## Code sprawl no one is watching

The corporate version is quieter. BleepingComputer reports that CISOs are increasingly fighting "code sprawl", employees building automations, agents, and apps with AI tools outside any security review. Each one is shipped by someone who never had to clear it with anyone, and who may not know what a vulnerability even looks like.

## Why AI code is risky by default

By one 2025 report, nearly half of AI-generated code contains security flaws. The model optimizes for "does it work in the demo", not "is it safe under attack". The usual holes: secrets hard-coded or logged, missing authorization checks, SQL built by string concatenation, and inputs trusted that never should be.

## What it means for you

You don't need a security team, you need a few habits:

- Never let AI handle secrets or auth without reviewing it line by line.
- Run a scanner (Semgrep, Snyk) and `npm audit` before you ship. Both are in the [Awesome list](/awesome).
- Ask a second AI to audit the first one's code specifically for security. It catches what the author missed.

The full playbook for the most common holes lives in [Fixes](/fixes), starting with "AI-generated code has hidden security holes". Shipping fast and shipping safe are not opposites, but safe does not happen by default.

## Sources

- [Scammers vibecode server to verify stolen cards, leak 345K cards, Cybernews](https://cybernews.com/)
- [Vibe coders are gonna vibe code: how CISOs are tackling code sprawl, BleepingComputer](https://www.bleepingcomputer.com/)
- [State of AI-generated code security, Veracode 2025](https://www.veracode.com/)
