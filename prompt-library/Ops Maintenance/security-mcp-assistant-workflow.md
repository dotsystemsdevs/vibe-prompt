# Security MCP Assistant Workflow

## Purpose

Use the MCP-compatible assistant to scan, fix, and track security issues in a coordinated flow.

## Input

- Repository URL or path
- Available MCP tools
- Triage policy

## Instructions

Copy the prompt below:

```text
Use MCP security tools to run this workflow end-to-end.

Repository:
[insert repo]

Tool flow:
1) Start scan
2) Poll status until complete
3) Fetch findings
4) Generate fix plan/task list
5) Execute fixes in severity order
6) Re-scan and compare delta

Assistant behavior:
- Report progress transparently
- Ask confirmation before risky operations
- Keep a live task checklist

Output format:
[MCP Tool Calls Plan]
...

[Progress Updates]
...

[Fix Execution Summary]
...

[Re-scan Delta]
- before:
- after:
```

## Output Format

- MCP tool-call plan
- Progress log
- Re-scan delta

## Quality Criteria

- Full traceability in the assistant flow
- Less manual coordination overhead
- Verified improvement after fixes

## Variants

- **Variant A:** Read-only audit mode.
- **Variant B:** Active remediation mode.
