"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibe-prompt";

/**
 * Notion-style breadcrumb bar at the top of every page.
 * Stays thin (40px), uses the page path to render breadcrumbs,
 * and hosts a mobile-only menu toggle that opens the sidebar.
 */

const PAGE_TITLES: Record<string, string> = {
  "/": "vibeprompt",
  "/fixes": "Fixes",
  "/weekly": "Weekly Fix",
  "/workflow": "Cookbook",
  "/articles": "Articles",
  "/awesome": "Awesome list",
  "/built-with": "Built with",
  "/vs-tools": "Compare · Tools",
  "/vs-books": "Compare · Books",
  "/about": "About",
  "/faq": "FAQ",
  "/privacy": "Privacy",
};

const PAGE_ICONS: Record<string, string> = {
  "/": "🏠",
  "/fixes": "🚑",
  "/weekly": "📬",
  "/workflow": "🍳",
  "/articles": "📝",
  "/awesome": "🧰",
  "/built-with": "🚀",
  "/vs-tools": "⚖️",
  "/vs-books": "📚",
  "/about": "👋",
  "/faq": "❓",
  "/privacy": "🔒",
};

function dispatchOpenSearch() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vp-open-search"));
}

function pageInfo(pathname: string) {
  // Exact match
  if (PAGE_TITLES[pathname]) {
    return { title: PAGE_TITLES[pathname], icon: PAGE_ICONS[pathname] ?? "📄" };
  }
  // Article detail
  if (pathname.startsWith("/articles/")) {
    return { title: "Article", icon: "📝", parent: { href: "/articles", title: "Articles", icon: "📝" } };
  }
  // Fix detail
  if (pathname.startsWith("/fixes/")) {
    return { title: "Fix", icon: "🚑", parent: { href: "/fixes", title: "Fixes", icon: "🚑" } };
  }
  // Submit a fix
  if (pathname === "/submit-fix") {
    return { title: "Submit a fix", icon: "🛠️", parent: { href: "/fixes", title: "Fixes", icon: "🚑" } };
  }
  // Weekly Fix issue
  if (pathname.startsWith("/weekly/")) {
    return { title: "Issue", icon: "📬", parent: { href: "/weekly", title: "Weekly Fix", icon: "📬" } };
  }
  // Built-with postmortem
  if (pathname.startsWith("/built-with/")) {
    return { title: "Postmortem", icon: "🚀", parent: { href: "/built-with", title: "Built with", icon: "🚀" } };
  }
  return { title: "Page", icon: "📄" };
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname() || "/";
  const info = pageInfo(pathname);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad/i.test(navigator.platform));
    }
  }, []);

  return (
    <header className="lg:hidden sticky top-0 z-40 h-10 shrink-0 border-b border-[color:var(--ink-rule)] bg-[color:var(--page)]/85 backdrop-blur-md">
      <div className="flex h-full items-center px-3 sm:px-4 gap-2">

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--sidebar-hover)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1 text-[13px]">
          {info.parent && (
            <>
              <Link
                href={info.parent.href}
                className="flex items-center gap-1 rounded px-1.5 py-1 text-[color:var(--ink-faded)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
              >
                <span aria-hidden>{info.parent.icon}</span>
                <span className="truncate max-w-[140px]">{info.parent.title}</span>
              </Link>
              <span aria-hidden className="text-[color:var(--ink-faded)]">/</span>
            </>
          )}
          <span className="flex items-center gap-1 rounded px-1.5 py-1 text-[color:var(--ink)]">
            <span aria-hidden>{info.icon}</span>
            <span className="truncate font-medium">{info.title}</span>
          </span>
        </nav>

        {/* Right cluster — search trigger, github */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={dispatchOpenSearch}
            aria-label="Search"
            title={`Search (${isMac ? "⌘K" : "Ctrl K"})`}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="vibeprompt on GitHub (opens in new tab)"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[color:var(--ink-soft)] transition-colors hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.688 0 3.837-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.575.688.475A10.005 10.005 0 0 0 22 12c0-5.525-4.475-10-10-10Z" />
            </svg>
          </a>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[color:var(--ink-rule)] bg-[color:var(--sidebar-bg)] px-3 py-3 lg:hidden"
        >
          <nav aria-label="Mobile primary" className="grid gap-0.5 text-[14px]">
            {Object.entries(PAGE_TITLES)
              .filter(([href]) => href !== "/" && href !== "/privacy")
              .map(([href, title]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 transition-colors ${
                    pathname === href || (href !== "/" && pathname.startsWith(href + "/"))
                      ? "bg-[color:var(--sidebar-active)] text-[color:var(--ink)] font-medium"
                      : "text-[color:var(--ink-soft)] hover:bg-[color:var(--sidebar-hover)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  <span aria-hidden>{PAGE_ICONS[href]}</span>
                  <span>{title}</span>
                </Link>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}
