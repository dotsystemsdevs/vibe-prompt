"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/layout/sidebar-icons";

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
const MENU: NavGroup[] = [
  { href: "/workflow", icon: "cookbook", label: "Cookbook", match: (p) => p === "/workflow" },
  // Fixes and Weekly Fix are the same thing, merged into one entry that stays
  // active on either route.
  { href: "/fixes", icon: "fixes", label: "Fixes", match: (p) => p === "/fixes" || p.startsWith("/fixes/") || p === "/weekly" || p.startsWith("/weekly/") },
  { href: "/articles", icon: "article", label: "Articles", match: (p) => p.startsWith("/articles") },
  { href: "/awesome", icon: "star", label: "Awesome", match: (p) => p.startsWith("/awesome") },
  { href: "/built-with", icon: "box", label: "Built with", match: (p) => p.startsWith("/built-with") },
];

export function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col sticky top-0 h-screen bg-[color:var(--sidebar-bg)] border-r border-[color:var(--ink-rule)] overflow-y-auto">

      {/* Brand — also the Home link, so there's no separate Home row. */}
      <div className="px-3 pt-4 pb-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper)] text-[17px] leading-none">🍳</span>
          <span className="truncate text-[15px] font-semibold tracking-tight text-[color:var(--ink)]">vibeprompt</span>
        </Link>
      </div>

      {/* Search — opens the command palette. */}
      <div className="px-3 pb-1">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          className="flex w-full items-center gap-2 rounded-lg border border-[color:var(--ink-rule)] bg-[color:var(--paper)] px-2.5 py-2 text-[13px] text-[color:var(--ink-faded)] transition-colors hover:border-[color:var(--ink-soft)] hover:text-[color:var(--ink-soft)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <span className="flex-1 text-left">Search</span>
          <kbd className="rounded border border-[color:var(--ink-rule)] px-1.5 py-0.5 text-[10px] font-mono leading-none">⌘K</kbd>
        </button>
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

      {/* Bottom utilities — plain links, no card. */}
      <div className="px-2 pb-3 pt-2 mt-2 border-t border-[color:var(--ink-rule)] space-y-0.5">
        <UtilityRow
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.688 0 3.837-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.575.688.475A10.005 10.005 0 0 0 22 12c0-5.525-4.475-10-10-10Z" />
            </svg>
          }
          label="GitHub"
          href={GITHUB_URL}
          external
        />
        <UtilityRow
          icon={<NavIcon name="lightbulb" className="h-3.5 w-3.5" />}
          label="Suggest a change"
          href={`${GITHUB_URL}/issues/new`}
          external
        />
        <UtilityRow
          icon={<NavIcon name="coffee" className="h-3.5 w-3.5" />}
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
    "w-full flex items-center gap-2.5 rounded-md pl-7 pr-2 py-2 text-[15px] text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]";
  const content = (
    <>
      <span aria-hidden className="shrink-0 w-5 flex items-center justify-center text-[color:var(--ink-faded)] group-hover:text-[color:var(--ink-soft)]">
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
        className={`group flex items-center gap-2.5 rounded-md pl-7 pr-2 py-2 text-[15px] transition-colors ${
          active
            ? "bg-[color:var(--sidebar-active)] text-[color:var(--ink)] font-semibold"
            : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
        }`}
      >
        <span aria-hidden className="flex shrink-0 w-5 items-center justify-center"><NavIcon name={item.icon} /></span>
        <span className="flex-1 truncate">{item.label}</span>
      </Link>
    </li>
  );
}

