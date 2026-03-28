import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">vibeprompt — open source prompt library</span>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
            <Link href="/library" className="hover:text-foreground transition-colors">Library</Link>
            <a href="https://github.com/dotsystemsdevs/VibePrompt" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
