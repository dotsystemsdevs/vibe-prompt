// The drop-in templates library: ready-made files for your repo and your
// vibe-coding workflow. The actual content lives in public/templates/<filename>
// so it can be copied or downloaded directly, no duplication here.

export type Template = { filename: string; description: string };
export type TemplateFolder = { name: string; blurb: string; templates: Template[] };

export const TEMPLATE_FOLDERS: TemplateFolder[] = [
  {
    name: "Context & memory",
    blurb: "What every AI session reads to stay on the rails.",
    templates: [
      { filename: "AGENTS.md", description: "Project rules and hard limits. The first thing every AI session reads." },
      { filename: "architecture.md", description: "File map: where state lives, server vs client boundaries." },
      { filename: "implementation-plan.md", description: "Ordered task list with acceptance criteria. The agent's punch list." },
      { filename: "MEMORY.md", description: "Append-only log of decisions, gotchas, and in-progress threads." },
    ],
  },
  {
    name: "Spec",
    blurb: "Pin down what you're building before the AI guesses.",
    templates: [
      { filename: "PRD.md", description: "What you're building, for whom, and what 'done' looks like." },
    ],
  },
  {
    name: "Repo hygiene",
    blurb: "The housekeeping files a clean repo wants from day one.",
    templates: [
      { filename: "TASK.md", description: "Your living task list: do next, in progress, discovered during work." },
      { filename: "CHANGELOG.md", description: "A human-readable record of what shipped, version by version." },
      { filename: "README.md", description: "The front door: what it is, how to run it, how to contribute." },
    ],
  },
];

export const TEMPLATE_COUNT = TEMPLATE_FOLDERS.reduce((n, f) => n + f.templates.length, 0);
