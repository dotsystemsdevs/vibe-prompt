"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/articles";

export type TocProblem = { id: string; title: string };

interface ArticleTocProps {
  items: TocItem[];
  problems?: TocProblem[];
}

export function ArticleToc({ items, problems = [] }: ArticleTocProps) {
  const idsKey = useMemo(
    () => [...items.map((i) => i.id), ...problems.map((p) => p.id)].join(","),
    [items, problems],
  );
  const firstId = idsKey.split(",")[0] || null;
  const [activeId, setActiveId] = useState<string | null>(firstId);

  useEffect(() => {
    const ids = idsKey ? idsKey.split(",") : [];
    if (ids.length === 0) return;

    const headingEls = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      },
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey]);

  if (items.length === 0 && problems.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-meta">
      {items.length > 0 && (
        <>
          <p className="text-label mb-3">
            On this page
          </p>
          <ul className="space-y-1.5">
            {items.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-0.5 leading-snug transition-colors ${
                      active
                        ? "text-[color:var(--accent)] font-medium"
                        : "text-[color:var(--ink-faded)] hover:text-[color:var(--ink)]"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {problems.length > 0 && (
        <>
          <p className={`${items.length > 0 ? "mt-6" : ""} text-label mb-3`}>
            Common problems
          </p>
          <ul className="space-y-1.5">
            {problems.map((p) => {
              const active = p.id === activeId;
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className={`block py-0.5 leading-snug transition-colors ${
                      active
                        ? "text-[color:var(--accent)] font-medium"
                        : "text-[color:var(--ink-faded)] hover:text-[color:var(--ink)]"
                    }`}
                  >
                    {p.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
}
