# Roadmap

This file is a high-level view. [GitHub Issues](https://github.com/dotsystemsdevs/vibeprompt/issues) stay the source of truth for work items.

## Shipped (recent)

- 52 prompts across 9 categories in `prompt-library/`
- 9-step workflow at `/workflow`
- PageLens audit at `/scan` (40+ rules)
- Copy counts (Vercel KV) and anonymous analytics
- 11 long-form articles at `/articles`
- `CONTRIBUTING.md` for first-time human contributors
- Public site, no sign-in required

## In focus (open issues)

| Theme | GitHub | Notes |
|---|---|---|
| Copy counts triage | [#9](https://github.com/dotsystemsdevs/vibeprompt/issues/9) | The app already uses Vercel KV. Close or update the issue so it matches the current design (counters are real, not mock) |
| www redirect | [#4](https://github.com/dotsystemsdevs/vibeprompt/issues/4) | Redirect `www` to apex |
| Community content | [#2](https://github.com/dotsystemsdevs/vibeprompt/issues/2) [#8](https://github.com/dotsystemsdevs/vibeprompt/issues/8) [#10](https://github.com/dotsystemsdevs/vibeprompt/issues/10) | More prompts, awesome list, pain-point prompts |
| Product polish | search UX, more categories as needed | Track as issues when scoped |

## How to pick work

1. Check [open issues](https://github.com/dotsystemsdevs/vibeprompt/issues?q=is%3Aopen)
2. Read `CONTRIBUTING.md` and `AGENTS.md` for format and stack rules
3. Open a small PR, conventional commits, `npm run lint` and `npm run build` before submit
