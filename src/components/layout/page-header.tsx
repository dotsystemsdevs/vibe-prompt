import type { ReactNode } from "react";

/**
 * The single page-opener used by every secondary page (/about, /faq,
 * /awesome, /articles, /built-with, /privacy, /compare, /contact…).
 *
 * Renders the shared .page-header pattern from globals.css so the emoji,
 * kicker, title and lede line up identically site-wide. Keep page-specific
 * markup OUT of here — pass it as `children` to sit below the lede.
 */
export function PageHeader({
  emoji,
  kicker,
  title,
  lede,
  children,
}: {
  emoji?: string;
  kicker?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-header">
      {emoji && (
        <div aria-hidden className="page-emoji">
          {emoji}
        </div>
      )}
      {kicker && <p className="page-kicker">{kicker}</p>}
      <h1 className="page-title">{title}</h1>
      {lede && <p className="page-lede">{lede}</p>}
      {children}
    </header>
  );
}
