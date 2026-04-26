# vibeprompt

Open-source prompt library, workflow hub, and site audit tool for vibe coders. Browse 52 battle-tested prompts, follow a 9-step shipping playbook, and scan any landing page for issues in one click.

[![CI](https://github.com/dotsystemsdevs/vibeprompt/actions/workflows/ci.yml/badge.svg)](https://github.com/dotsystemsdevs/vibeprompt/actions/workflows/ci.yml)
![License](https://img.shields.io/github/license/dotsystemsdevs/vibeprompt)
![Stars](https://img.shields.io/github/stars/dotsystemsdevs/vibeprompt?style=flat)
![Issues](https://img.shields.io/github/issues/dotsystemsdevs/vibeprompt?style=flat)
![PRs](https://img.shields.io/github/issues-pr/dotsystemsdevs/vibeprompt?style=flat)

**Live**: https://vibeprompt.tech

---

## What This Is

vibeprompt is a free, open-source tool for developers shipping with AI.

- **Browse** 52 prompts organized by workflow stage, copy in one click
- **Follow** a 9-step vibe coding playbook from idea to shipped product
- **Scan** any site with PageLens, an instant SEO, conversion, security, and AI-readiness audit
- **Explore** a curated list of AI coding tools and resources
- No login required. No paywall.

---

## Routes

| Route | What it does |
|---|---|
| `/` | Homepage with workflow preview and FAQ |
| `/browse` | Browse all 52 prompts by category, with copy count tracking |
| `/prompts/[slug]` | Prompt detail with copy count and contributor badge |
| `/workflow` | 9-step vibe coding playbook |
| `/scan` | PageLens site audit (SEO, conversion, trust, security, AEO) |
| `/articles` | Articles on vibe coding |
| `/awesome` | Curated list of AI/vibe coding tools |
| `/learn` | Learning resources |
| `/privacy` | Privacy policy |
| `/about` | About the project |

---

## Project Structure

```text
vibeprompt/
├─ src/
│  ├─ app/                  # Next.js App Router pages
│  │  ├─ api/audit/         # PageLens audit API (40+ rules)
│  │  ├─ api/copy-counts/   # Prompt copy count API (Vercel KV)
│  │  └─ scan/              # PageLens scan UI
│  ├─ components/           # UI and feature components
│  │  ├─ prompts/           # Browse, cards, copy actions
│  │  ├─ layout/            # Navbar, footer
│  │  └─ ...
│  └─ lib/
│     ├─ actions/copies.ts  # Copy count server actions (Vercel KV)
│     ├─ categories.ts      # Slug to folder mappings (protected)
│     ├─ prompt-library.ts  # Loads prompts from markdown
│     ├─ workflow-steps.ts  # 9-step workflow metadata
│     └─ types.ts           # Shared types (protected)
├─ content/
│  └─ prompts/              # 52 markdown prompt files
├─ prompt-library/          # Standalone prompt playbook
│  ├─ Agent Setup/
│  ├─ Architecture Stack/
│  ├─ Build Ship/
│  ├─ Launch Growth/
│  ├─ Ops Maintenance/
│  ├─ PRD Spec/
│  ├─ Prompting Craft/
│  ├─ Research Validate/
│  └─ Testing Quality/
├─ public/
│  ├─ llms.txt              # AI crawler context file
│  └─ robots.txt            # Explicit AI bot permissions
├─ AGENTS.md                # Contributor and agent guide
└─ CLAUDE.md                # Claude Code project instructions
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Auth | Clerk |
| KV Storage | Vercel KV (copy counts, scan count) |
| Database | Supabase (optional, for saves) |
| Animations | GSAP |
| Analytics | Vercel Analytics |
| Language | TypeScript (strict) |

---

## Getting Started

```bash
npm install
npm run dev      # localhost:3000
npm run build
npm run lint
```

Environment variables needed in `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
KV_REST_API_URL=
KV_REST_API_TOKEN=
# Optional (for saves feature):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Prompt Library

52 prompts in `content/prompts/`, organized by stage:

| Folder | Site label | What it covers |
|---|---|---|
| `Agent Setup/` | Context | AGENTS.md, CLAUDE.md, memory banks |
| `Research Validate/` | Research | Validation, kill criteria, competitive analysis |
| `PRD Spec/` | PRD | Requirements, acceptance criteria, scope |
| `Architecture Stack/` | Stack | Stack decisions, system design |
| `Build Ship/` | Build | Feature implementation, atomic tasks |
| `Prompting Craft/` | Prompting | Prompt chains, output control |
| `Testing Quality/` | Quality | Code review, security, testing |
| `Launch Growth/` | Ship | Distribution, positioning, launch |
| `Ops Maintenance/` | Iterate | Post-launch ops and reliability |

**Adding a prompt:**

1. Pick the right folder in `content/prompts/`
2. Create a kebab-case `.md` file
3. Use this structure:

```markdown
---
title: Prompt Title
---

## When to use
One or two sentences.

## Prompt

\```
The prompt text.
\```
```

4. Open a PR: `prompt(category): add prompt-name`

---

## PageLens Audit

`/scan` audits any public URL across 40+ rules in 7 categories:

- **SEO**: title, meta description, canonical, headings
- **Conversion**: CTA presence, social proof, pricing, FAQ, email capture
- **Trust**: OG tags, structured data, privacy link, accessibility
- **Structure**: semantic HTML, viewport, nav/main/footer landmarks
- **Performance**: render-blocking scripts, lazy loading, resource hints
- **Security**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **AI/AEO**: llms.txt, FAQ schema, robots.txt AI crawler permissions

Audit API: `GET /api/audit?url=https://example.com`

---

## Roadmap

**Done:**
- 52 prompts across 9 categories
- 9-step vibe coding workflow
- PageLens site audit (40+ rules, 7 categories)
- Copy count tracking per prompt via Vercel KV
- AI crawler support (llms.txt, robots.txt, FAQ schema)
- Security headers (CSP, HSTS, X-Frame-Options)
- Articles section
- Privacy policy
- 100/100 on our own PageLens audit

**Next:**
- Prompt submissions via GitHub Issues
- Saved prompts (Clerk + Supabase)
- More prompts, more categories
- Search improvements

---

## Contributing

Read `AGENTS.md` before writing any code.

- **Quick contribution**: copy fix, UI spacing, mobile, add a prompt, add a tool
- **Issues**: https://github.com/dotsystemsdevs/vibeprompt/issues
- **PRs**: https://github.com/dotsystemsdevs/vibeprompt/pulls

---

## License

MIT, see [LICENSE](./LICENSE)
