// The drop-in templates library: ready-made files for your repo and your
// vibe-coding workflow. Content lives in public/templates/<served ?? filename>.
// Dotfiles are served without the leading dot (static hosts skip dotfiles), but
// download with their real name via the `served` field.

export type Template = { filename: string; description: string; served?: string };
export type TemplateFolder = { name: string; blurb: string; templates: Template[] };

export const TEMPLATE_FOLDERS: TemplateFolder[] = [
  {
    name: "Context & memory",
    blurb: "What every AI session reads to stay on the rails.",
    templates: [
      { filename: "AGENTS.md", description: "Project rules and hard limits. The first thing every AI session reads." },
      { filename: "CLAUDE.md", description: "Claude Code's entry file. Imports AGENTS.md so the rules live in one place." },
      { filename: "architecture.md", description: "File map: where state lives, server vs client boundaries." },
      { filename: "implementation-plan.md", description: "Ordered task list with acceptance criteria. The agent's punch list." },
      { filename: "MEMORY.md", description: "Append-only log of decisions, gotchas, and in-progress threads." },
    ],
  },
  {
    name: "Spec & research",
    blurb: "Pin down what you're building before the AI guesses.",
    templates: [
      { filename: "research.md", description: "Validate the idea: problem, demand, competitors, wedge, kill criteria." },
      { filename: "PRD.md", description: "What you're building, for whom, and what 'done' looks like." },
      { filename: "TechDesign.md", description: "Every stack decision with a one-line reason. No open choices." },
    ],
  },
  {
    name: "Repo hygiene",
    blurb: "The housekeeping files a clean repo wants from day one.",
    templates: [
      { filename: ".gitignore", served: "gitignore", description: "Sensible ignores for a Node / Next.js project, secrets included." },
      { filename: ".env.example", served: "env.example", description: "A safe, committable map of the env vars your app needs." },
      { filename: "README.md", description: "The front door: what it is, how to run it, how to contribute." },
      { filename: "LICENSE", description: "MIT license, the permissive default for open source." },
      { filename: "TASK.md", description: "Your living task list: do next, in progress, discovered during work." },
      { filename: "CHANGELOG.md", description: "A human-readable record of what shipped, version by version." },
    ],
  },
];

export const TEMPLATE_COUNT = TEMPLATE_FOLDERS.reduce((n, f) => n + f.templates.length, 0);
