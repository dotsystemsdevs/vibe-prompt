import Link from "next/link";

export default function LibraryPage() {
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-border px-6 py-12">
          <p className="hero-kicker mb-4">Library</p>
          <h1 className="hero-display max-w-3xl">My prompt library.</h1>
          <p className="mt-3 text-sm text-muted-foreground">Save prompts you use.</p>
        </div>

        <div className="px-6 py-20 text-center">
          <p className="mb-6 text-sm text-muted-foreground">Sign in to save and organize prompts.</p>
          <Link
            href="/"
            className="inline-flex bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-80 transition-opacity"
          >
            Get started →
          </Link>
          <div className="mt-6">
            <Link href="/browse" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Browse prompts first →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
