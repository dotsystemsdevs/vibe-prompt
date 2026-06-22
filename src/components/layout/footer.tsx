"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibe-prompt";
const CURRENT_YEAR = new Date().getFullYear();

type FooterContributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
};

type ApiContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export function Footer() {
  const pathname = usePathname();
  const [contributors, setContributors] = useState<FooterContributor[] | null>(null);

  useEffect(() => {
    const cacheKey = "vp_repo_contrib_v2";
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { at: number; items: FooterContributor[] };
        if (Date.now() - parsed.at < 60 * 60 * 1000 && Array.isArray(parsed.items)) {
          setContributors(parsed.items);
          return;
        }
      }
    } catch {}

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://api.github.com/repos/dotsystemsdevs/vibe-prompt/contributors?per_page=30");
        if (!res.ok) throw new Error("bad_status");
        const data = (await res.json()) as ApiContributor[];
        const items: FooterContributor[] = (Array.isArray(data) ? data : [])
          .filter((c) => typeof c?.login === "string" && c.login.length > 0 && !c.login.endsWith("[bot]"))
          .slice(0, 18)
          .map((c) => ({ login: c.login, avatarUrl: c.avatar_url, profileUrl: c.html_url }));
        if (cancelled) return;
        setContributors(items);
        try { sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), items })); } catch {}
      } catch {
        if (!cancelled) setContributors(null);
      }
    })();
    return () => { cancelled = true; };
  }, [pathname]);

  // Home is a one-screen no-scroll layout, and the cookbook (/workflow) owns its
  // own full-height app layout with a sticky right rail, so neither gets a footer.
  if (pathname === "/" || pathname === "/workflow") return null;

  return (
    <footer className="shrink-0 border-t border-[color:var(--ink-rule)] bg-[color:var(--page)] text-[color:var(--ink)]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-12">

        {/* Bottom strip, copyright + contributors + small links */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[color:var(--ink-faded)]">
            <span>© {CURRENT_YEAR} dot.systems</span>
            <Link href="/faq" className="hover:text-[color:var(--ink)] transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-[color:var(--ink)] transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-[color:var(--ink)] transition-colors">Privacy</Link>
            <Link href="/cookie-policy" className="hover:text-[color:var(--ink)] transition-colors">Cookies</Link>
            <Link href="/compare" className="hover:text-[color:var(--ink)] transition-colors">Compare</Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--ink)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={`${GITHUB_URL}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--ink)] transition-colors"
            >
              Suggest a change ↗
            </a>
            <a
              href="https://buymeacoffee.com/dotdevs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] transition-colors"
            >
              Buy me a coffee ↗
            </a>
          </div>

          {contributors && contributors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[color:var(--ink-faded)]">Contributors</span>
              <div className="flex items-center">
                {contributors.slice(0, 6).map((c, i) => (
                  <a
                    key={c.login}
                    href={c.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={c.login}
                    className="relative block transition-transform hover:z-10 hover:scale-110"
                    style={{ marginLeft: i === 0 ? 0 : "-6px" }}
                  >
                    <Image
                      src={c.avatarUrl}
                      alt={c.login}
                      width={20}
                      height={20}
                      className="rounded-full border border-[color:var(--page)]"
                    />
                  </a>
                ))}
              </div>
              <a
                href={`${GITHUB_URL}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
              >
                +{Math.max(0, contributors.length - 6)} →
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
