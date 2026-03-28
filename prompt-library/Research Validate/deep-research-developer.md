---
title: Deep Research Prompt — Developer
source: github.com/KhazP/vibe-coding-prompt-template — part1-deepresearch.md
---

# Deep Research Prompt — Developer

For developers who want structured technical research before architecting a new project.

## Prompt

```markdown
## Deep Research Request: [Project Name]

<context>
I need comprehensive technical research on [topic] for [context].
Technical Context:
- Constraints: [your constraints]
- Preferred Stack: [if specified]
- Compliance: [any requirements]
</context>

<instructions>
Research Objectives: [based on your goals]
Specific Questions: [list 3-5 questions this research must answer]

Scope Definition:
- Include: [what to research]
- Exclude: [what to skip]

Required Analysis:
- Technical architecture patterns (current best practices, 2025+)
- Performance benchmarks with latest frameworks
- Security considerations for AI-integrated apps
- Scalability approaches with modern infrastructure
- AI tool/API integration strategies (include sources and current pricing)
- Cost optimization with current cloud pricing
- Development velocity estimates with AI assistance

Agent Architecture Research (if applicable):
- Planner-Executor-Reviewer (PER) loop patterns
- MCP (Model Context Protocol) integration options
- Self-healing code and test strategies

Premium UI/Design Research (if applicable):
- Design system generators and component libraries
- Figma-to-code tools
- Design token standardization patterns
</instructions>

<output_format>
- Detailed technical findings with code examples
- Architecture diagrams in Mermaid.js
- Cite sources with URLs and access dates
- Explicitly note where sources disagree or data is uncertain
- Pros/cons for each major recommendation
</output_format>
```

## Best platforms for this prompt

| Platform | Best for |
|---|---|
| Claude (with web search) | Technical accuracy |
| Gemini 2.5 Pro | Large context, big codebase dumps |
| Perplexity Deep Research | Up-to-date sources with citations |
| ChatGPT Deep Research | Cross-validation |
