// Maps each workflow step to the awesome-list categories whose tools belong there.
// Used by /workflow to inline the right tools next to each step's tasks.

export const WORKFLOW_TOOLS_BY_STEP: Record<string, readonly string[]> = {
  "00": ["setup"],
  "01": ["research-validate"],
  "02": ["prd-spec"],
  "03": ["architecture-stack", "backend", "auth", "email"],
  "04": ["agent-setup"],
  "05": ["prompting-craft"],
  "06": ["testing-quality"],
  "07": ["build-ship"],
  "08": ["launch-growth", "monetization"],
  "09": ["ops-maintenance"],
};
