import { NextRequest, NextResponse } from "next/server";
import { LIST_CATEGORIES, LIST_CATEGORY_LABEL, type ListCategory } from "@/lib/list-problems";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_TOOLS = [
  "Cursor",
  "Claude Code",
  "Windsurf",
  "Lovable",
  "Bolt",
  "Supabase",
  "Vercel",
  "Expo",
  "Stripe",
  "Other",
];

/**
 * Community "Submit a Fix" intake.
 *
 * Stores submissions in Vercel KV (list `vibeprompt:fix-submissions`) as a
 * review queue — nothing is published automatically. If a GitHub token is
 * configured it also opens an issue. No auth, no accounts.
 *
 * Env (optional):
 *   GITHUB_TOKEN  — opens an issue per submission
 *   GITHUB_REPO   — "owner/repo" (defaults to dotsystemsdevs/vibe-prompt)
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const str = (v: unknown) => String(v ?? "").trim();
  const title = str(body.title);
  const category = str(body.category) as ListCategory;
  const whatHappened = str(body.whatHappened);
  const howFixed = str(body.howFixed);
  const tools = Array.isArray(body.tools)
    ? (body.tools as unknown[]).map((t) => String(t)).filter((t) => ALLOWED_TOOLS.includes(t))
    : [];
  const errorLog = str(body.errorLog);
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const link = str(body.link);
  const consent = body.consent === true;

  // Length caps (cheap abuse guard) before field validation.
  if (
    title.length > 200 ||
    whatHappened.length > 4000 ||
    howFixed.length > 4000 ||
    errorLog.length > 4000 ||
    name.length > 120 ||
    link.length > 300
  ) {
    return NextResponse.json({ error: "One of your fields is too long." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  if (title.length < 6) fields.title = "Give the problem a clear title.";
  if (!LIST_CATEGORIES.includes(category)) fields.category = "Pick a category.";
  if (whatHappened.length < 20) fields.whatHappened = "Add a little more detail on what happened.";
  if (howFixed.length < 20) fields.howFixed = "Describe the fix in a little more detail.";
  if (!name) fields.name = "Add your name so we can credit you (or follow up).";
  if (!EMAIL_RE.test(email)) fields.email = "Enter a valid email address.";
  // Consent is optional: it only controls whether we publish your name/link.

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields }, { status: 400 });
  }

  const submission = {
    id: `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    title,
    category,
    categoryLabel: LIST_CATEGORY_LABEL[category],
    whatHappened,
    howFixed,
    tools,
    errorLog,
    name,
    email,
    link,
    consent: true,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  // 1) Persist to the KV review queue.
  let stored = false;
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import("@vercel/kv");
      await kv.rpush("vibeprompt:fix-submissions", JSON.stringify(submission));
      stored = true;
    } catch {
      /* fall through to GitHub / error */
    }
  }

  // 2) Optional GitHub issue.
  let issueOpened = false;
  const ghToken = process.env.GITHUB_TOKEN;
  const ghRepo = process.env.GITHUB_REPO || "dotsystemsdevs/vibe-prompt";
  if (ghToken) {
    try {
      const issueBody = [
        `**Category:** ${submission.categoryLabel}`,
        submission.tools.length ? `**Tools:** ${submission.tools.join(", ")}` : "",
        "",
        "### What happened?",
        whatHappened,
        "",
        "### How was it fixed?",
        howFixed,
        errorLog ? "\n### Error / log\n```\n" + errorLog + "\n```" : "",
        "",
        "---",
        submission.consent && name
          ? `Submitted by **${name}**${link ? ` (${link})` : ""}, consented to attribution.`
          : "Submitted without attribution consent (name and link withheld from this public issue).",
        "_The submitter's email is kept private for review only and is not included here._",
      ]
        .filter((l) => l !== "")
        .join("\n");

      const res = await fetch(`https://api.github.com/repos/${ghRepo}/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "vibeprompt-submit-fix",
        },
        body: JSON.stringify({
          title: `Fix submission: ${title}`,
          body: issueBody,
          labels: ["fix-submission"],
        }),
      });
      if (res.ok) issueOpened = true;
    } catch {
      /* non-fatal — KV is the source of truth */
    }
  }

  // Nothing persisted anywhere — don't pretend it worked.
  if (!stored && !issueOpened) {
    return NextResponse.json(
      { error: "Submissions aren’t live yet. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
