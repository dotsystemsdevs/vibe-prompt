"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/articles";

export type TocProblem = { id: string; title: string };

interface ArticleTocProps {
  items: TocItem[];
  problems?: TocProblem[];
}

export function ArticleToc({ items, problems = [] }: ArticleTocProps) {
  const allIds = [...items.map((i) => i.id), ...problems.map((p) => p.id)];
  const [activeId, setActiveId] = useState<string | null>(allIds[0] ?? null);

  useEffect(() => {
    if (allIds.length === 0) return;

    const headingEls = allIds
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
  }, [allIds.join(",")]);

  if (items.length === 0 && problems.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-[11px]">
      {items.length > 0 && (
        <>
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
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
                        ? "text-foreground font-medium"
                        : "text-foreground/45 hover:text-foreground/80"
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
          <p className={`${items.length > 0 ? "mt-6" : ""} mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40`}>
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
                        ? "text-foreground font-medium"
                        : "text-foreground/45 hover:text-foreground/80"
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
