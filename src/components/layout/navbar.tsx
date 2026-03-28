"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          vibeprompt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "/browse", label: "Browse" },
            { href: "/workflow", label: "Workflow" },
            { href: "/articles", label: "Articles" },
            { href: "/library", label: "Library" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dotsystemsdevs/VibePrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-4 py-1.5 text-xs font-medium transition-all hover:bg-foreground hover:text-background"
          >
            Submit to GitHub
          </a>
          <button className="md:hidden text-muted-foreground" onClick={() => setOpen(!open)}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-4 text-xs text-muted-foreground">
            <Link href="/browse" className="hover:text-foreground">Browse</Link>
            <Link href="/workflow" className="hover:text-foreground">Workflow</Link>
            <Link href="/articles" className="hover:text-foreground">Articles</Link>
            <Link href="/library" className="hover:text-foreground">Library</Link>
            <a href="https://github.com/dotsystemsdevs/VibePrompt" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub ↗</a>
          </div>
        </div>
      )}
    </header>
  );
}
