import Link from "next/link";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, PROMPTS } from "@/lib/mock-data";

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Prompts</h1>
        <p className="mt-1 text-muted-foreground">
          {PROMPTS.length} prompts · community-curated · open source
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/browse"
          className="rounded-full border border-violet-500/50 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-400"
        >
          All
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-full border border-border/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROMPTS.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}
