"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/articles";

interface ArticleTocProps {
  items: TocItem[];
}

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headingEls = items
      .map((item) => document.getElementById(item.id))
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
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-[11px]">
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
    </nav>
  );
}
