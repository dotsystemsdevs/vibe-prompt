import type { CSSProperties, ReactNode } from "react";
import { NavIcon } from "@/components/layout/sidebar-icons";

/**
 * The single page-opener used by every secondary page (/fixes, /built-with,
 * /weekly, /awesome, /compare, /about, /faq, /privacy…).
 *
 * Renders the shared .page-header pattern from globals.css so the icon,
 * kicker, title and lede line up identically site-wide. Keep page-specific
 * markup OUT of here, pass it as `children` to sit below the lede.
 *
 * Prefer `icon` (a monoline NavIcon name) over `emoji`, the site is moving
 * to line icons. `emoji` stays supported as a fallback.
 *
 * `accent` gives the page one muted colour landmark (the icon tile + kicker).
 * Leave it off for neutral utility pages.
 */
type Accent = "red" | "amber" | "blue" | "purple" | "green" | "orange";

const ACCENTS: Record<Accent, { color: string; soft: string }> = {
  red: { color: "var(--page-red)", soft: "var(--page-red-soft)" },
  amber: { color: "var(--page-amber)", soft: "var(--page-amber-soft)" },
  blue: { color: "var(--page-blue)", soft: "var(--page-blue-soft)" },
  purple: { color: "var(--page-purple)", soft: "var(--page-purple-soft)" },
  green: { color: "var(--page-green)", soft: "var(--page-green-soft)" },
  orange: { color: "var(--page-orange)", soft: "var(--page-orange-soft)" },
};

export function PageHeader({
  emoji,
  icon,
  kicker,
  title,
  lede,
  accent,
  children,
}: {
  emoji?: string;
  icon?: string;
  kicker?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  accent?: Accent;
  children?: ReactNode;
}) {
  const style = accent
    ? ({ "--page-accent": ACCENTS[accent].color, "--page-accent-soft": ACCENTS[accent].soft } as CSSProperties)
    : undefined;

  return (
    <header className="page-header" style={style}>
      {icon ? (
        <div aria-hidden className="page-emoji page-emoji--icon">
          <NavIcon name={icon} className="h-6 w-6" />
        </div>
      ) : emoji ? (
        <div aria-hidden className="page-emoji">
          {emoji}
        </div>
      ) : null}
      {kicker && <p className="page-kicker">{kicker}</p>}
      <h1 className="page-title">{title}</h1>
      {lede && <p className="page-lede">{lede}</p>}
      {children}
    </header>
  );
}
