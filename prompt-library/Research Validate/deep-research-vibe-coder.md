---
title: Deep Research Prompt — Vibe Coder (Non-Technical Founder)
source: github.com/KhazP/vibe-coding-prompt-template — part1-deepresearch.md
---

# Deep Research Prompt — Vibe Coder

Use this in Claude, Gemini, or ChatGPT **before writing a single line of code**. The AI interviews you, then generates a full research prompt you can run to validate your idea.

## Step 1 — Start the Interview

Paste this to kick off:

```
I want to do deep research on my app idea before building anything.
I'm a vibe-coder — great ideas, limited coding experience.
Please ask me your discovery questions ONE AT A TIME. Wait for my answer before asking the next.
Enable web search if available. After all questions, do a Verification Echo before generating the research prompt.
```

## Step 2 — Answer These Questions (AI will ask them one by one)

1. What's your app idea? Describe it like explaining to a friend — what problem does it solve?
2. Who needs this most? Describe your ideal user.
3. What's out there already? Name similar apps or current solutions.
4. What would make someone choose YOUR app? What's the special sauce?
5. What are the 3 absolute must-have features for launch?
6. How do you imagine people using this — phone app, website, or both?
7. What's your timeline? Days, weeks, or months to launch?
8. Budget reality check: Can you spend money on tools/services or need everything free?

## Step 3 — AI Generates This Research Prompt

```markdown
## Deep Research Request: [App Name]

<context>
I'm a non-technical founder building [description]. I need beginner-friendly research with actionable insights.
</context>

<instructions>
Key Questions to Answer:
1. What similar apps exist and what features do they have?
2. What do users love/hate about existing solutions?
3. What's the simplest way to build an MVP?
4. What no-code/low-code tools are best for this?
5. How do similar apps monetize and what can I realistically charge?
6. What AI tools or APIs can accelerate development or differentiate the MVP?

Required Deliverables:
1. Competitor Table — Features, pricing, user count, reviews
2. Tech Stack — Recommended tools for beginners
3. MVP Features — Must-have vs nice-to-have prioritization
4. Development Roadmap — With AI assistance strategy
5. Budget Breakdown — Tools, services, deployment costs
</instructions>

<output_format>
- Explain in plain English with examples
- Include source URLs with access dates for each major recommendation
- Use tables for comparisons
- Highlight conflicting information between sources
</output_format>
```

## Pro tip

Run the same final research prompt on **2 different AI platforms** (e.g. Claude + Perplexity) and compare — they'll surface different insights.
