"use client";

import { useState } from "react";
import type { TemplateFolder } from "@/lib/templates-catalog";

export function TemplatesClient({ folders }: { folders: TemplateFolder[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(filename: string) {
    try {
      const res = await fetch(`/templates/${filename}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(filename);
      setTimeout(() => setCopied((c) => (c === filename ? null : c)), 1800);
    } catch {
      // Clipboard can be blocked; the Download link is the fallback.
    }
  }

  return (
    <div className="space-y-10">
      {folders.map((folder) => (
        <section key={folder.name}>
          <div className="mb-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[color:var(--ink)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-[color:var(--ink-faded)]">
                <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />
              </svg>
              {folder.name}
            </h2>
            <span className="text-meta">{folder.blurb}</span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {folder.templates.map((t) => (
              <li key={t.filename}>
                <div className="vp-card-bordered flex h-full flex-col p-5">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--paper-soft)] text-[color:var(--ink-soft)]">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M14 3v5h5" />
                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      </svg>
                    </span>
                    <span className="truncate font-mono text-[13px] font-medium text-[color:var(--ink)]">{t.filename}</span>
                  </div>

                  <p className="mt-3 flex-1 text-[13px] leading-snug text-[color:var(--ink-soft)]">{t.description}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copy(t.filename)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--ink)] px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--paper)] transition-opacity hover:opacity-90"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {copied === t.filename ? (
                          <path d="M20 6 9 17l-5-5" />
                        ) : (
                          <>
                            <rect x="9" y="9" width="11" height="11" rx="1.5" />
                            <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
                          </>
                        )}
                      </svg>
                      {copied === t.filename ? "Copied" : "Copy"}
                    </button>
                    <a
                      href={`/templates/${t.filename}`}
                      download
                      className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--ink-rule)] px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 3v12" />
                        <path d="m7 11 5 5 5-5" />
                        <path d="M5 21h14" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
