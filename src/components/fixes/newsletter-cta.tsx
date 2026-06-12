"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

/**
 * "The Weekly Fix" newsletter capture.
 *
 * Posts to /api/subscribe, which routes to Buttondown (preferred) or Vercel KV.
 * Until one of those is configured the API returns 503 and we show a graceful
 * "not live yet" message — the form never crashes.
 */
export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
      const data = await res.json().catch(() => null);
      setStatus("error");
      setError(data?.error ?? "Something went wrong. Try again.");
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <section className="vp-card vp-fill vp-card-lg">
      <p className="page-kicker">The Weekly Fix</p>
      <h2 className="section-title mt-2 flex items-center gap-2">
        <span aria-hidden className="text-[20px] leading-none">📬</span>
        Get the Weekly Fix
      </h2>
      <p className="text-body mt-2 max-w-lg">
        One real AI-building failure, the fix, and the prompt that solves it. Sent weekly. No spam, unsubscribe anytime.{" "}
        <Link href="/weekly" className="vp-link">
          Read past issues →
        </Link>
      </p>

      {status === "done" ? (
        <p className="text-body mt-5 inline-flex items-center gap-2 font-medium text-[color:var(--success)]">
          <span aria-hidden>✓</span> You&rsquo;re on the list. The next fix lands in your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-start">
          <div className="flex-1 sm:max-w-xs">
            <label htmlFor="weekly-fix-email" className="sr-only">
              Email address
            </label>
            <input
              id="weekly-fix-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@example.com"
              aria-invalid={status === "error"}
              className="vp-input"
            />
            {status === "error" && (
              <p role="alert" className="text-meta mt-1.5 text-[color:var(--error)]">
                {error}
              </p>
            )}
          </div>
          <button type="submit" disabled={status === "loading"} className="btn-primary justify-center">
            {status === "loading" ? "Subscribing…" : "Get weekly fixes"}
            {status !== "loading" && <span aria-hidden>→</span>}
          </button>
        </form>
      )}
    </section>
  );
}
