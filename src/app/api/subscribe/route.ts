import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Weekly Fix newsletter signup.
 *
 * Capture strategy, in priority order:
 *   1. Buttondown , if BUTTONDOWN_API_KEY is set. Buttondown both collects AND
 *      sends the newsletter, so this is the recommended setup.
 *   2. Vercel KV  , if KV is provisioned. A safety net so addresses are never
 *      lost before Buttondown is wired up. Export later with `SMEMBERS`.
 *   3. Not configured, return 503 so the UI shows a graceful "not live yet".
 *
 * Setup (one of):
 *   Vercel → Project → Settings → Environment Variables
 *     BUTTONDOWN_API_KEY = <your Buttondown API key>      (recommended)
 *   …or create a Vercel KV store (auto-injects KV_REST_API_URL + _TOKEN).
 */
export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // 1) Buttondown
  const buttondownKey = process.env.BUTTONDOWN_API_KEY;
  if (buttondownKey) {
    try {
      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${buttondownKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, tags: ["weekly-fix"] }),
      });

      if (res.ok) return NextResponse.json({ ok: true });

      // Already subscribed → treat as success so repeat signups feel fine.
      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        const msg = JSON.stringify(data ?? "").toLowerCase();
        if (msg.includes("already") || msg.includes("exist")) {
          return NextResponse.json({ ok: true });
        }
      }
      return NextResponse.json({ error: "Could not subscribe. Try again in a moment." }, { status: 502 });
    } catch {
      return NextResponse.json({ error: "Could not subscribe. Try again in a moment." }, { status: 502 });
    }
  }

  // 2) Vercel KV fallback
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import("@vercel/kv");
      await kv.sadd("vibeprompt:subscribers", email);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not subscribe. Try again in a moment." }, { status: 502 });
    }
  }

  // 3) Nothing configured yet
  return NextResponse.json(
    { error: "Subscriptions aren’t live yet, check back soon." },
    { status: 503 }
  );
}
