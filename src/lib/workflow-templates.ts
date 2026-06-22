// Templates relevant per recipe, surfaces in the aside of each step.

export type TemplateRef = { filename: string; description: string };

const ALL: Record<string, TemplateRef> = {
  "AGENTS.md": {
    filename: "AGENTS.md",
    description: "Project rules and hard limits. Every AI session reads this first.",
  },
  "PRD.md": {
    filename: "PRD.md",
    description: "What you're building, for whom, with what success criteria.",
  },
  "architecture.md": {
    filename: "architecture.md",
    description: "File map, where state lives, server/client boundaries.",
  },
  "implementation-plan.md": {
    filename: "implementation-plan.md",
    description: "Ordered task list with acceptance criteria. The agent's punch list.",
  },
  "MEMORY.md": {
    filename: "MEMORY.md",
    description: "Append-only log of decisions, gotchas, in-progress threads.",
  },
};

export const WORKFLOW_TEMPLATES: Record<string, TemplateRef[]> = {
  "00": [ALL["AGENTS.md"]],
  "01": [],
  "02": [ALL["PRD.md"]],
  "03": [ALL["architecture.md"]],
  "04": [ALL["AGENTS.md"], ALL["MEMORY.md"]],
  "05": [ALL["implementation-plan.md"], ALL["MEMORY.md"]],
  "06": [ALL["implementation-plan.md"]],
  "07": [],
  "08": [],
  "09": [ALL["MEMORY.md"]],
};
