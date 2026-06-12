"use client";

import { useState } from "react";

/**
 * "The Weekly Fix" newsletter capture.
 *
 * UI-only for now — there is no email backend wired up yet. On submit it just
 * shows a local confirmation so the flow feels real.
 *
 * TODO(email): wire to an email provider (Buttondown / ConvertKit / Fastmail).
 * POST the address to a /api/subscribe route and handle errors + double opt-in.
 */
export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    // TODO(email): replace this local-only confirmation with a real subscribe call.
    setDone(true);
  }

  return (
    <section className="vp-card vp-fill vp-card-lg">
      <p className="page-kicker">The Weekly Fix</p>
      <h2 className="section-title mt-2 flex items-center gap-2">
        <span aria-hidden className="text-[20px] leading-none">📬</span>
        Get the Weekly Fix
      </h2>
      <p className="text-body mt-2 max-w-lg">
        One real AI-building failure, the fix, and the prompt that solves it. Sent weekly. No spam, unsubscribe anytime.
      </p>

      {done ? (
        <p className="text-body mt-5 inline-flex items-center gap-2 font-medium text-[color:var(--success)]">
          <span aria-hidden>✓</span> You&rsquo;re on the list. The next fix lands in your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="vp-input sm:max-w-xs"
          />
          <button type="submit" className="btn-primary justify-center">
            Get weekly fixes
            <span aria-hidden>→</span>
          </button>
        </form>
      )}
    </section>
  );
}
