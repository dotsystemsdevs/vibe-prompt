"use client";

import { useState } from "react";
import { incrementDownloadCount } from "@/lib/actions/downloads";
import type { TemplateFolder } from "@/lib/templates-catalog";

function fmt(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

export function TemplatesClient({
  folders,
  counts,
}: {
  folders: TemplateFolder[];
  counts: Record<string, number>;
}) {
  // Optimistic bump on top of the server-rendered counts, so the number ticks
  // up the moment you download without waiting for a reload.
  const [bumps, setBumps] = useState<Record<string, number>>({});

  function onDownload(filename: string) {
    setBumps((b) => ({ ...b, [filename]: (b[filename] ?? 0) + 1 }));
    void incrementDownloadCount(filename);
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
            {folder.templates.map((t) => {
              const n = (counts[t.filename] ?? 0) + (bumps[t.filename] ?? 0);
              return (
                <li
                  key={t.filename}
                  className="flex items-center gap-3 border-t border-[color:var(--ink-rule)] px-4 py-2.5 transition-colors hover:bg-[color:var(--sidebar-hover)]"
                >
                  <span aria-hidden className="shrink-0 text-[15px] leading-none">📄</span>
                  <span className="w-[180px] shrink-0 truncate font-mono text-[13px] font-medium text-[color:var(--ink)]">
                    {t.filename}
                  </span>
                  <span className="hidden flex-1 truncate text-[12.5px] text-[color:var(--ink-soft)] sm:block">
                    {t.description}
                  </span>

                  {/* One light control: download arrow + shared count, click to download */}
                  <a
                    href={`/templates/${t.served ?? t.filename}`}
                    download={t.filename}
                    onClick={() => onDownload(t.filename)}
                    title="Download"
                    aria-label={`Download ${t.filename}, ${n} downloads so far`}
                    className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] tabular-nums text-[color:var(--ink-faded)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 3v12" />
                      <path d="m7 11 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                    {fmt(n)}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
}
