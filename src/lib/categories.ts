export const CATEGORY_DEFINITIONS = [
  {
    slug: "research-validate",
    dirName: "Research Validate",
    name: "Research & Validate",
    description: "Validate demand, kill criteria, and competitive landscape before writing a line.",
    icon: "RES",
    color: "#06b6d4",
  },
  {
    slug: "prd-spec",
    dirName: "PRD Spec",
    name: "PRD & Spec",
    description: "Requirements, acceptance criteria, and scope before implementation.",
    icon: "PRD",
    color: "#8b5cf6",
  },
  {
    slug: "architecture-stack",
    dirName: "Architecture Stack",
    name: "Architecture Stack",
    description: "Stack decisions, system boundaries, and implementation strategy.",
    icon: "ARC",
    color: "#3b82f6",
  },
  {
    slug: "agent-setup",
    dirName: "Agent Setup",
    name: "Agent Setup",
    description: "AGENTS.md, CLAUDE.md, memory banks, and context engineering for AI coding agents.",
    icon: "AGT",
    color: "#f59e0b",
  },
  {
    slug: "build-ship",
    dirName: "Build Ship",
    name: "Build & Ship",
    description: "Feature implementation, code generation, and iterative shipping prompts.",
    icon: "BLD",
    color: "#22c55e",
  },
  {
    slug: "prompting-craft",
    dirName: "Prompting Craft",
    name: "Prompting Craft",
    description: "Prompt techniques, output control, and AI communication patterns.",
    icon: "PRM",
    color: "#ec4899",
  },
  {
    slug: "testing-quality",
    dirName: "Testing Quality",
    name: "Testing & Quality",
    description: "Code review, security audits, testing plans, and release gates.",
    icon: "TST",
    color: "#ef4444",
  },
  {
    slug: "launch-growth",
    dirName: "Launch Growth",
    name: "Launch & Growth",
    description: "Distribution, positioning, and launch execution prompts.",
    icon: "GRO",
    color: "#f97316",
  },
  {
    slug: "ops-maintenance",
    dirName: "Ops Maintenance",
    name: "Ops & Maintenance",
    description: "Operations, reliability, and post-launch maintenance workflows.",
    icon: "OPS",
    color: "#6b7280",
  },
] as const;

export const CATEGORY_COLOR_MAP: Record<string, string> = CATEGORY_DEFINITIONS.reduce(
  (acc, category) => {
    acc[category.slug] = category.color;
    return acc;
  },
  {} as Record<string, string>
);
