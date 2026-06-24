"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibe-prompt";

type NavLeaf = {
  href: string;
  icon: string;
  label: string;
  match: (p: string, hash?: string) => boolean;
};

type NavGroup = {
  href: string;
  icon: string;
  label: string;
  match: (p: string) => boolean;
  children?: NavLeaf[];
};

// One flat list. The brand logo links Home, so there's no separate Home row.
// Legal/meta links (FAQ, About, Privacy, Cookies) live in the footer instead.
// Each nav icon is the same emoji as that page's header, so the rail and the
// page read as one.
const MENU: NavGroup[] = [
  { href: "/workflow", icon: "📖", label: "Cookbook", match: (p) => p === "/workflow" },
  // Fixes and Weekly Fix are the same thing, merged into one entry that stays
  // active on either route.
  { href: "/fixes", icon: "🔧", label: "Fixes", match: (p) => p === "/fixes" || p.startsWith("/fixes/") || p === "/weekly" || p.startsWith("/weekly/") },
  { href: "/articles", icon: "📰", label: "Articles", match: (p) => p.startsWith("/articles") },
  { href: "/awesome", icon: "🧰", label: "Awesome", match: (p) => p.startsWith("/awesome") },
  { href: "/templates", icon: "🗂️", label: "Templates", match: (p) => p.startsWith("/templates") },
  { href: "/built-with", icon: "🚀", label: "Built with", match: (p) => p.startsWith("/built-with") },
];

export function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col sticky top-0 h-screen bg-[color:var(--sidebar-bg)] border-r border-[color:var(--ink-rule)] overflow-y-auto">

      {/* Brand, also the Home link, so there's no separate Home row. */}
      <div className="px-3 pt-4 pb-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[20px] leading-none">🍳</span>
          <span className="truncate text-[15px] font-semibold tracking-tight text-[color:var(--ink)]">vibeprompt</span>
        </Link>
      </div>

      {/* One flat nav list. */}
      <div className="px-2 pt-3">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-faded)]">Explore</p>
        <ol className="space-y-0.5">
          {MENU.map((item) => (
            <RootLink key={item.href} item={item} active={item.match(pathname)} />
          ))}
        </ol>
      </div>

      <div className="flex-1" />

      {/* Bottom utilities, plain links, no card. */}
      <div className="px-2 pb-3 pt-2 mt-2 border-t border-[color:var(--ink-rule)] space-y-0.5">
        <UtilityRow
          icon={<span className="text-[16px] leading-none">🐙</span>}
          label="GitHub"
          href={GITHUB_URL}
          external
        />
        <UtilityRow
          icon={<span className="text-[16px] leading-none">💡</span>}
          label="Suggest a change"
          href={`${GITHUB_URL}/issues/new`}
          external
        />
        <UtilityRow
          icon={<span className="text-[16px] leading-none">☕</span>}
          label="Buy me a coffee"
          href="https://buymeacoffee.com/dotdevs"
          external
        />
      </div>
    </aside>
  );
}

function UtilityRow({
  icon,
  label,
  href,
  onClick,
  external,
  shortcut,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  shortcut?: string;
}) {
  const className =
    "w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]";
  const content = (
    <>
      <span aria-hidden className="shrink-0 w-[20px] flex items-center justify-center text-[color:var(--ink-faded)] group-hover:text-[color:var(--ink-soft)]">
        {icon}
      </span>
      <span className="flex-1 text-left truncate">{label}</span>
      {shortcut && <kbd className="text-[10px] font-mono text-[color:var(--ink-faded)]">{shortcut}</kbd>}
      {external && !shortcut && <span aria-hidden className="text-[10px] text-[color:var(--ink-faded)]">↗</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${className} group`}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${className} group`}>
      {content}
    </button>
  );
}

function RootLink({ item, active }: { item: { href: string; icon: string; label: string }; active: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] transition-colors ${
          active
            ? "bg-[color:var(--sidebar-active)] text-[color:var(--ink)] font-medium"
            : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
        }`}
      >
        <span aria-hidden className="flex shrink-0 w-[20px] items-center justify-center text-[16px] leading-none">{item.icon}</span>
        <span className="flex-1 truncate">{item.label}</span>
      </Link>
    </li>
  );
}

