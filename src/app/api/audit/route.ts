import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { checkExternalFiles, checkSecurityHeaders, parseHtml } from "@/lib/audit/parser";
import { runAudit } from "@/lib/audit/scoring";
import type { ParsedPage } from "@/lib/audit/types";

export type { AuditResult, Finding } from "@/lib/audit/types";

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });

  let targetUrl: string;
  try {
    targetUrl = normalizeUrl(rawUrl);
    new URL(targetUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const origin = new URL(targetUrl).origin;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const [res, external] = await Promise.all([
      fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; vibepromptBot/1.0; +https://vibeprompt.tech/scan)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
        },
        redirect: "follow",
        cache: "no-store",
      }),
      checkExternalFiles(origin),
    ]);

    clearTimeout(timeout);

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("html")) {
      return NextResponse.json(
        { error: `URL returned non-HTML content (${contentType || "unknown type"})` },
        { status: 422 }
      );
    }

    const html = await res.text();
    const page: ParsedPage = {
      ...parseHtml(html),
      ...checkSecurityHeaders(res.headers),
      ...external,
    };
    const result = runAudit(page, targetUrl);
    try { kv.incr("scan_count").catch(() => {}); } catch {}
    return NextResponse.json(result);
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out, the site took too long to respond" }, { status: 504 });
    }
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Could not fetch the page: ${detail}` },
      { status: 502 }
    );
  }
}
