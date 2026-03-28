# Security Vbw Bashguard Destructive Command Firewall

## Purpose
Create a security prompt that blocks destructive commands early and forces safer options before execution.

## Input
- Bash/CLI command to execute
- Environment (dev/stage/prod)
- List of protected resources (DB, volumes, credentials)

## Instructions
1. Classify the command: safe, risk, destructive.
2. Match against destructive monsters (drop/reset/flush/prune/truncate/wipe).
3. If destructive: block default and suggest 2 safer alternatives.
4. Requirement for explicit override signal before destructive command is allowed to pass.
5. Always log decisions: command, risk level, motive, recommended next action.
6. Prioritize data integrity and recoverability over speed.

## Output Format
- ``Risk Classification''
- `Matched Pattern` (if any)
- `Decision' (Allow/Block/Require Override)
- ``Safer Alternatives''
- ``Audit Log Entry''

## Quality Criteria
- False negatives should be obvious
- Decisions must be explainable
- Safety rules should be easy to work out with local monsters
- Override must never be implicit

## Variants
- Variant A: Strict (block everything classified as risky in prod)
- Variant B: Training (show why + learning suggestions in dev)
