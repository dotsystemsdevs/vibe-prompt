"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibe-prompt";
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const pathname = usePathname();

  // Home is a one-screen no-scroll layout, and the cookbook (/workflow) owns its
  // own full-height app layout with a sticky right rail, so neither gets a footer.
  if (pathname === "/" || pathname === "/workflow") return null;

  return (
    <footer className="shrink-0 border-t border-[color:var(--ink-rule)] bg-[color:var(--page)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-6 sm:px-8">
        {/* One clean row: copyright, links, and the coffee CTA pushed to the end */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[color:var(--ink-faded)]">
          <span>© {CURRENT_YEAR} dot.systems</span>
          <Link href="/faq" className="transition-colors hover:text-[color:var(--ink)]">FAQ</Link>
          <Link href="/about" className="transition-colors hover:text-[color:var(--ink)]">About</Link>
          <Link href="/privacy" className="transition-colors hover:text-[color:var(--ink)]">Privacy</Link>
          <Link href="/cookie-policy" className="transition-colors hover:text-[color:var(--ink)]">Cookies</Link>
          <Link href="/compare" className="transition-colors hover:text-[color:var(--ink)]">Compare</Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--ink)]"
          >
            GitHub ↗
          </a>
          <a
            href={`${GITHUB_URL}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--ink)]"
          >
            Suggest a change ↗
          </a>
          <a
            href="https://buymeacoffee.com/dotdevs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[color:var(--accent)] transition-colors hover:text-[color:var(--accent-hover)] sm:ml-auto"
          >
            Buy me a coffee ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
