# VibePrompt

Open-source prompt library and learning hub for vibe coding, prompt engineering, and practical AI-assisted development.

Repository: [dotsystemsdevs/VibePrompt](https://github.com/dotsystemsdevs/VibePrompt)

## What This Project Is

VibePrompt is a Next.js app that combines:

- A curated prompt browsing experience
- Long-form articles about prompting and vibe coding
- A workflow page for structured build loops
- A prompt-library directory for shipping-focused prompt packs

The goal is simple: make prompt-based building easier to start, easier to learn, and easier to ship.

## Project Structure

```text
VibePrompt/
├─ src/
│  ├─ app/                  # Next.js App Router pages/routes
│  ├─ components/           # UI and feature components
│  └─ lib/                  # Data models and app utilities
├─ content/
│  └─ prompts/              # Prompt content source files
├─ prompt-library/          # Organized prompt playbook folders
├─ public/                  # Static assets
├─ scripts/                 # Utility scripts
├─ AGENTS.md                # Agent guidance for this repo
└─ README.md
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Lint and build

```bash
npm run lint
npm run build
```

## Contributing

Contributions are welcome. Start here:

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

If you are submitting content updates (prompts/articles), include:

- Clear rationale for the change
- Any source links used
- Before/after impact summary

## Development Notes

- This repo includes `AGENTS.md` for AI-agent behavior and project constraints.
- Keep PRs focused and small when possible.
- Prefer explicit, testable prompt improvements over broad rewrites.

## Roadmap (High-Level)

- Improve prompt discoverability and tagging
- Add richer article navigation (TOC, related reads)
- Expand prompt-library quality checks and content workflows
- Add more validation and QA automation for content updates

## License

MIT - see [LICENSE](./LICENSE)
