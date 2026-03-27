import Link from "next/link";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, TRENDING_PROMPTS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">
            Open source · GitHub-powered
          </p>
          <h1 className="max-w-3xl text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight text-foreground">
            Save the prompts
            <br />
            that actually
            <br />
            work.
          </h1>
          <div className="mt-10 flex items-start gap-16">
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The open prompt library for builders. Browse, save, and contribute the prompts that ship real products.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/browse"
                className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
              >
                Browse prompts →
              </Link>
              <a
                href="https://github.com/vibeprompt/vibeprompt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Contribute on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex divide-x divide-border">
            {[
              { n: "500+", label: "Prompts" },
              { n: "8", label: "Categories" },
              { n: "100%", label: "Open source" },
            ].map((s) => (
              <div key={s.label} className="flex-1 py-6 pr-8 first:pl-0">
                <div className="text-2xl font-bold">{s.n}</div>
                <div className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="border-b border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Categories</p>
            <Link href="/categories" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex flex-col bg-background p-6 transition-colors hover:bg-muted"
              >
                <span className="mb-4 text-xl">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
                <span className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {category.description}
                </span>
                <span className="mt-4 text-xs text-muted-foreground">
                  {category.count} prompts
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="border-b border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Trending</p>
            <Link href="/browse" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Browse all →
            </Link>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING_PROMPTS.map((prompt) => (
              <PromptCard key={prompt.slug} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Have a prompt
                <br />
                that ships?
              </h2>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Everything lives on GitHub — open, transparent, and community-owned. Submit a PR and help other builders ship faster.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://github.com/vibeprompt/vibeprompt"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:bg-foreground/80 transition-colors"
              >
                Submit on GitHub →
              </a>
              <Link href="/library" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
