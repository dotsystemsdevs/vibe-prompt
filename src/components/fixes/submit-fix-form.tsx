"use client";

import Link from "next/link";
import { useState } from "react";
import { LIST_CATEGORIES, LIST_CATEGORY_LABEL, type ListCategory } from "@/lib/list-problems";
import { WeeklyFixLink } from "@/components/fixes/weekly-fix-link";

const TOOLS = [
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
] as const;

type Status = "idle" | "loading" | "done" | "error";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2 text-[13px] font-semibold text-[color:var(--ink)]">
      {children}
      {optional && <span className="text-[11px] font-normal text-[color:var(--ink-faded)]">optional</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="text-meta mt-1.5 text-[color:var(--error)]">
      {msg}
    </p>
  );
}

export function SubmitFixForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ListCategory | "">("");
  const [whatHappened, setWhatHappened] = useState("");
  const [howFixed, setHowFixed] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  function toggleTool(t: string) {
    setTools((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setFields({});
    setGeneralError("");
    try {
      const res = await fetch("/api/submit-fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          whatHappened,
          howFixed,
          tools,
          errorLog,
          name,
          email,
          link,
          consent,
        }),
      });
      if (res.ok) {
        setStatus("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const data = await res.json().catch(() => null);
      setStatus("error");
      setFields(data?.fields ?? {});
      setGeneralError(data?.fields ? "" : data?.error ?? "Something went wrong. Try again.");
    } catch {
      setStatus("error");
      setGeneralError("Network error. Try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="space-y-6">
        <div className="vp-card vp-fill vp-card-lg">
          <div aria-hidden className="text-[28px] leading-none">🎉</div>
          <h2 className="section-title mt-3">Fix submitted for review.</h2>
          <p className="text-body mt-2 max-w-lg">
            Thank you. We read every submission and publish the useful ones with your attribution. The next builder
            who hits this will not lose three hours.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/fixes" className="btn-primary">
              Search more fixes
              <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                // reset for another submission
                setTitle("");
                setCategory("");
                setWhatHappened("");
                setHowFixed("");
                setTools([]);
                setErrorLog("");
                setLink("");
                setConsent(false);
                setStatus("idle");
              }}
              className="btn-ghost"
            >
              Submit another fix
            </button>
          </div>
          <div className="mt-6 border-t border-[color:var(--ink-rule)] pt-5">
            <WeeklyFixLink />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Problem title */}
      <div>
        <Label htmlFor="sf-title">Problem title</Label>
        <input
          id="sf-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Cursor loses context after a long session"
          className="vp-input"
          aria-invalid={!!fields.title}
        />
        <FieldError msg={fields.title} />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="sf-category">Category</Label>
        <div id="sf-category" className="flex flex-wrap gap-2">
          {LIST_CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                    : "border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                }`}
              >
                {LIST_CATEGORY_LABEL[c]}
              </button>
            );
          })}
        </div>
        <FieldError msg={fields.category} />
      </div>

      {/* What happened */}
      <div>
        <Label htmlFor="sf-what">What happened?</Label>
        <textarea
          id="sf-what"
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          placeholder="The symptom. What broke, when, and what it looked like."
          rows={3}
          className="vp-input"
          aria-invalid={!!fields.whatHappened}
        />
        <FieldError msg={fields.whatHappened} />
      </div>

      {/* How fixed */}
      <div>
        <Label htmlFor="sf-fix">How did you fix it?</Label>
        <textarea
          id="sf-fix"
          value={howFixed}
          onChange={(e) => setHowFixed(e.target.value)}
          placeholder="The actual fix. Steps, the prompt that worked, what to avoid."
          rows={4}
          className="vp-input"
          aria-invalid={!!fields.howFixed}
        />
        <FieldError msg={fields.howFixed} />
      </div>

      {/* Tools */}
      <div>
        <Label htmlFor="sf-tools" optional>
          Tools involved
        </Label>
        <div id="sf-tools" className="flex flex-wrap gap-2">
          {TOOLS.map((t) => {
            const active = tools.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTool(t)}
                aria-pressed={active}
                className={`rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  active
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                    : "border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error log */}
      <div>
        <Label htmlFor="sf-log" optional>
          Related error message / log
        </Label>
        <textarea
          id="sf-log"
          value={errorLog}
          onChange={(e) => setErrorLog(e.target.value)}
          placeholder="Paste the error or stack trace, if any."
          rows={3}
          className="vp-input font-mono text-[13px]"
        />
      </div>

      {/* Attribution */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="sf-name">Your name</Label>
          <input
            id="sf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="For attribution"
            className="vp-input"
            aria-invalid={!!fields.name}
          />
          <FieldError msg={fields.name} />
        </div>
        <div>
          <Label htmlFor="sf-email">Your email</Label>
          <input
            id="sf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="vp-input"
            aria-invalid={!!fields.email}
          />
          <FieldError msg={fields.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="sf-link" optional>
          Website / GitHub / Twitter
        </Label>
        <input
          id="sf-link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://github.com/you"
          className="vp-input"
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2.5 text-[13.5px] text-[color:var(--ink-soft)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--accent)]"
            aria-invalid={!!fields.consent}
          />
          <span>VibePrompt may publish this fix with attribution.</span>
        </label>
        <FieldError msg={fields.consent} />
      </div>

      {generalError && (
        <p role="alert" className="vp-alert vp-alert-error">
          {generalError}
        </p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={status === "loading"} className="btn-primary">
          {status === "loading" ? "Submitting…" : "Submit the fix"}
          {status !== "loading" && <span aria-hidden>→</span>}
        </button>
        <span className="text-meta">Reviewed before publishing. No spam.</span>
      </div>
    </form>
  );
}
