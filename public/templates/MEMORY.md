# MEMORY.md

> Session continuity for AI coding agents. Every session writes here when it
> learns something the next session needs to know.
> Template from [vibeprompt.tech](https://vibeprompt.tech) — fork and edit.

## How to use this file

`AGENTS.md` holds **stable rules** (conventions, stack, hard rules).
`MEMORY.md` holds **changing state** (decisions made, gotchas found, where we
left off). Agents read both at session start; only `MEMORY.md` gets appended to.

When an agent finishes a task, it appends one entry under the right section
below. When you start a new chat, the new agent reads this file and picks up
where the last one stopped.

---

## Current focus

**Active task:** [What we're working on right now. One line.]
**Branch:** `[current-branch]`
**Last session ended:** [date — what was done, what's next]

---

## Decisions made (don't relitigate)

> Things we've already discussed and settled. If the agent suggests reverting one
> of these, push back and link to this list.

- **[Decision]** — [why, dated]
  - Example: *Use SQLite, not Postgres* — single-user app, no concurrency needed. (2026-05-12)
- **[Decision]** — [why, dated]

---

## Gotchas discovered

> Surprises, footguns, and "don't touch X because Y" lessons. Save the next
> agent from rediscovering them.

- **[Gotcha]** — [what happens, how to avoid]
  - Example: *Vercel's edge runtime can't `import sharp`* — use `nodejs` runtime
    on routes that touch images. (Found 2026-05-14)

---

## In-progress threads

> Work that's started but not done. Each entry: what's done, what's blocked,
> what's next.

### [Thread name]
- **Done:** [list]
- **Blocked on:** [external thing / decision / bug]
- **Next:** [the single next action]

---

## Files / directories under active change

> So the next agent doesn't accidentally refactor something the current change
> is in the middle of touching.

- `src/app/[route]/page.tsx` — being rewritten to use server actions
- `lib/auth.ts` — temporary fork, do not edit until merged back

---

## Open questions for the human

> Things only the human can answer. Don't guess — surface these next time the
> human shows up.

- [ ] [Question]
- [ ] [Question]

---

## Recent context (auto-trimmed)

> Most recent 5-10 entries. Older entries get archived to `memory-bank/archive/`.

### 2026-XX-XX — [Session label]
- Did: [what shipped]
- Learned: [gotcha or insight, if any]
- Next: [handoff]
