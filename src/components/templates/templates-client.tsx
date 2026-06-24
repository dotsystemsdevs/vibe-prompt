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
      // Clipboard can be blocked; the Download action is the fallback.
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--ink-rule)] bg-[color:var(--paper)]">
      {folders.map((folder, fi) => (
        <details
          key={folder.name}
          open
          className={`group/f ${fi > 0 ? "border-t border-[color:var(--ink-rule)]" : ""}`}
        >
          {/* Folder row, click to expand / collapse */}
          <summary className="flex cursor-pointer list-none items-center gap-2.5 bg-[color:var(--paper-soft)] px-4 py-3 transition-colors hover:bg-[color:var(--sidebar-hover)] [&::-webkit-details-marker]:hidden">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-[color:var(--ink-faded)] transition-transform group-open/f:rotate-90">
              <path d="M9 6l6 6-6 6" />
            </svg>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0 text-[color:var(--accent)]">
              <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />
            </svg>
            <span className="text-[14px] font-semibold text-[color:var(--ink)]">{folder.name}</span>
            <span className="ml-auto text-[12px] tabular-nums text-[color:var(--ink-faded)]">
              {folder.templates.length} {folder.templates.length === 1 ? "file" : "files"}
            </span>
          </summary>

          {/* Files under the folder, one row each */}
          <ul>
            {folder.templates.map((t) => (
              <li
                key={t.filename}
                className="group/r flex items-center gap-3 border-t border-[color:var(--ink-rule)] px-4 py-2.5 transition-colors hover:bg-[color:var(--sidebar-hover)]"
              >
                <span aria-hidden className="shrink-0 text-[15px] leading-none">📄</span>
                <span className="w-[190px] shrink-0 truncate font-mono text-[13px] font-medium text-[color:var(--ink)]">
                  {t.filename}
                </span>
                <span className="hidden flex-1 truncate text-[12.5px] text-[color:var(--ink-soft)] sm:block">
                  {t.description}
                </span>
                <div className="ml-auto flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => copy(t.filename)}
                    aria-label={copied === t.filename ? "Copied" : `Copy ${t.filename}`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={copied === t.filename ? "text-[color:var(--accent)]" : ""}>
                      {copied === t.filename ? (
                        <path d="M20 6 9 17l-5-5" />
                      ) : (
                        <>
                          <rect x="9" y="9" width="11" height="11" rx="1.5" />
                          <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
                        </>
                      )}
                    </svg>
                  </button>
                  <a
                    href={`/templates/${t.filename}`}
                    download
                    aria-label={`Download ${t.filename}`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--ink-rule)] text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 3v12" />
                      <path d="m7 11 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
