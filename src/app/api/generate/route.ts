import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 30;

type AgentsData = {
  projectName: string;
  oneLiner: string;
  stack: string;
  fileConventions: string;
  noTouch: string;
};

type PrdData = {
  projectName: string;
  targetUser: string;
  goal: string;
  why: string;
  features: string;
  outOfScope: string;
  successCriteria: string;
};

type Body = { kind: "agents"; data: AgentsData } | { kind: "prd"; data: PrdData };

const RATE_LIMIT_PER_HOUR = 5;

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "anonymous";
}

const SYSTEM_PROMPT = `You are an expert at writing AGENTS.md and PRD (Product Requirements Document) files for AI coding agents.

Your job is to take a user's project details and produce a polished, ready-to-ship markdown file. You're writing for AI coding agents like Claude Code, Cursor, Codex CLI, and Windsurf, files that the agent reads at session start.

## What makes a great AGENTS.md

A great AGENTS.md is:
- **Short**: under 100 lines. Models lose attention past that.
- **Specific**: actual file paths, actual stack versions, actual conventions in this project, never generic advice.
- **Rules, not scope**: AGENTS.md is the constraints. The PRD is the scope. Keep them separate.
- **Updated in the same commit as breaking changes**: stale rules are worse than no rules.

Structure:
1. Project (name, one-line, stack)
2. Folder structure (a tree of the relevant dirs only)
3. Conventions (file naming, server/client split, max file size, etc.)
4. Hard rules (numbered list, 4-7 items max, "never overwrite without asking", "no new deps without asking", "every feature needs N tests", "no-touch list")
5. Build & verify (the commands that actually matter)
6. Session kickoff (the one-line prompt to start every session)

## What makes a great PRD

A great PRD is:
- **Outcome-driven**: starts with the user and the problem, not the solution.
- **Scoped**: MVP features (max 5), out-of-scope features (at least 3), success criteria.
- **Specific**: real example flows, real metrics, real timelines.
- **Versioned**: dated, with a changelog at the bottom for major scope shifts.

Structure:
1. Project name + one-line description
2. Target user (one paragraph)
3. Goal (one sentence)
4. Why (the business / personal value)
5. MVP features (bulleted, max 5)
6. Out of scope (bulleted, at least 3)
7. Success criteria (measurable)
8. Open questions

## Your job

Read the user's input. Produce the markdown file. Output ONLY the markdown, no preamble, no explanation, no code fences around the whole document. The output should be directly droppable into the user's repo.

Where the user's input is sparse or generic, fill in sensible defaults that match the stack they mentioned. Don't invent product features the user didn't describe.

Where the user's input is contradictory or unclear, make a reasonable choice and add a short "Open questions" or "TODO" note at the bottom.

Quality bar: this output should be noticeably better than a fill-in-the-blank template. Use the user's stack to make stack-specific recommendations. Use their domain to make domain-specific recommendations.`;

function buildUserPrompt(body: Body): string {
  if (body.kind === "agents") {
    const d = body.data;
    return `Generate an AGENTS.md for this project. Output the full markdown file, ready to drop into the repo.

**Project name**: ${d.projectName || "(not specified)"}
**One-line description**: ${d.oneLiner || "(not specified)"}
**Stack**: ${d.stack || "(not specified)"}
**File conventions**: ${d.fileConventions || "(not specified)"}
**No-touch list**: ${d.noTouch || "(not specified)"}`;
  }

  const d = body.data;
  return `Generate a PRD.md for this project. Output the full markdown file, ready to drop into the repo.

**Project name**: ${d.projectName || "(not specified)"}
**Target user**: ${d.targetUser || "(not specified)"}
**Goal**: ${d.goal || "(not specified)"}
**Why (problem/value)**: ${d.why || "(not specified)"}
**MVP features**:
${d.features || "(not specified)"}

**Out of scope**:
${d.outOfScope || "(not specified)"}

**Success criteria**:
${d.successCriteria || "(not specified)"}`;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI generation is not configured on this deployment." },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.kind !== "agents" && body.kind !== "prd") {
    return NextResponse.json({ error: "kind must be 'agents' or 'prd'." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const hourBucket = Math.floor(Date.now() / (60 * 60 * 1000));
  const rateKey = `generate-rl:${ip}:${hourBucket}`;

  let count: number;
  try {
    count = await kv.incr(rateKey);
    if (count === 1) {
      await kv.expire(rateKey, 60 * 60);
    }
  } catch (error) {
    console.error("Rate limit kv error", error);
    return NextResponse.json({ error: "Rate limiter unavailable." }, { status: 503 });
  }

  if (count > RATE_LIMIT_PER_HOUR) {
    return NextResponse.json(
      {
        error: `Hourly limit of ${RATE_LIMIT_PER_HOUR} AI generations reached. Try again next hour, or use the template (no AI), it's free and unlimited.`,
        rateLimited: true,
      },
      { status: 429 }
    );
  }

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserPrompt(body) }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "AI returned no text." }, { status: 502 });
    }

    return NextResponse.json({
      markdown: textBlock.text,
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cacheRead: response.usage.cache_read_input_tokens ?? 0,
        cacheWrite: response.usage.cache_creation_input_tokens ?? 0,
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "AI provider is rate-limiting us. Try again in a minute." },
        { status: 503 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic API error", error.status, error.message);
      return NextResponse.json({ error: "AI generation failed." }, { status: 502 });
    }
    console.error("Unexpected /api/generate error", error);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
