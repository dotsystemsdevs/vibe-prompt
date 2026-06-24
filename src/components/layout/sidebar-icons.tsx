import type { ReactNode } from "react";

// Monoline nav icons, drawn to match the clean outline set in the reference.
// Keyed by a short id; the sidebar nav data references these instead of emojis.
const PATHS: Record<string, ReactNode> = {
  home: (
    <>
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5 9.5V20h14V9.5" />
    </>
  ),
  cookbook: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19" />
      <path d="M9 7.5h6" />
    </>
  ),
  fixes: (
    <>
      <rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" transform="rotate(-45 12 12)" />
      <path d="M10.5 10.5h.01M13.5 13.5h.01M13.5 10.5h.01M10.5 13.5h.01" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1.4 1.4-1.8 4.8-1.8 4.8s3.4-.4 4.8-1.8" />
      <path d="M9.5 14.5 8 13c.6-4 3.2-7.5 8-9 .5 4.8-2 7.4-6 8z" />
      <path d="M14 10a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  article: (
    <>
      <path d="M14 3v5h5" />
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M8.5 13h7M8.5 16.5h7" />
    </>
  ),
  templates: (
    <>
      <rect x="8.5" y="8.5" width="11" height="12" rx="1.5" />
      <path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v11A1.5 1.5 0 0 0 6 18.5h2.5" />
    </>
  ),
  tools: (
    <>
      <path d="M4 7h9M19 7h1M4 12h1M11 12h9M4 17h7M17 17h3" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="14" cy="17" r="2" />
    </>
  ),
  compare: (
    <>
      <path d="M12 3.5v17M5 20.5h14M6 7.5h12" />
      <path d="M6 7.5 3.2 13a2.8 2.8 0 0 0 5.6 0z" />
      <path d="m18 7.5 2.8 5.5a2.8 2.8 0 0 1-5.6 0z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.5 2-2.5 2.3" />
      <path d="M12 16.5h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.6h.01" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  cookie: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z" />
      <path d="M9 11h.01M13.5 15h.01M15 10h.01" />
    </>
  ),
  dot: <circle cx="12" cy="12" r="2" />,
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  ),
  // Brand mark, a line-icon skillet, the monoline take on the 🍳 logo.
  pan: (
    <>
      <circle cx="10" cy="14" r="6.5" />
      <path d="m15 9 6-5" />
    </>
  ),
  // Built-with, a shipped product / package.
  box: (
    <>
      <path d="M21 7.5 12 2.5 3 7.5v9L12 21.5l9-5z" />
      <path d="M3 7.5 12 12.5l9-5" />
      <path d="M12 12.5v9" />
    </>
  ),
  // Suggest a change, an idea / lightbulb.
  lightbulb: (
    <>
      <path d="M9.5 18h5" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5 1 1.3 1 2.1v.3h5.6v-.3c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </>
  ),
  // Buy me a coffee, a cup.
  coffee: (
    <>
      <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M16 9h2.4a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7.5 3.5v1.6M11 3.5v1.6M14.5 3.5v1.6" />
    </>
  ),
};

export function NavIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name] ?? PATHS.dot}
    </svg>
  );
}
