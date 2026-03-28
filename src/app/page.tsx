import Link from "next/link";
import { TopList } from "@/components/prompts/top-list";
import { HeroSearch } from "@/components/hero-search";
import { getPromptLibrary } from "@/lib/prompt-library";

export default async function HomePage() {
  const { prompts, categories } = await getPromptLibrary();

  return (
    <div className="pt-12">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 250px",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-6 text-xs text-muted-foreground tracking-widest uppercase">
            Open source · GitHub-powered
          </p>
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1] tracking-tight">
            Prompts for
            <br />
            builders who vibe.
          </h1>
          <HeroSearch />
          <div className="mt-5 flex items-center gap-6">
            <Link href="/browse" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Browse all prompts →
            </Link>
            <a
              href="https://github.com/dotsystemsdevs/VibePrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contribute on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { n: String(prompts.length), label: "Prompts" },
              { n: String(categories.length), label: "Categories" },
              { n: "100%", label: "Open source" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-8">
                <div className="text-3xl font-bold tabular-nums">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top list */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl">
          <TopList prompts={prompts} />
        </div>
      </section>

{/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Have a prompt
            <br />
            that ships?
          </h2>
          <a
            href="https://github.com/dotsystemsdevs/VibePrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 border border-foreground/20 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Submit on GitHub →
          </a>
        </div>
      </section>
    </div>
  );
}
