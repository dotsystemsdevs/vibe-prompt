import Link from "next/link";
import { Prompt } from "@/lib/types";
import { CATEGORY_COLOR_MAP } from "@/lib/categories";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const color = CATEGORY_COLOR_MAP[prompt.category] ?? "#6b7280";

  return (
    <div className="group relative bg-background transition-colors hover:bg-card">
      <Link href={`/prompts/${prompt.slug}`} className="absolute inset-0" aria-label={prompt.title} />
      <div className="px-6 py-8">
        <div className="mb-3 flex items-center justify-between">
          <Link
            href={`/browse?category=${prompt.category}`}
            className="relative z-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest transition-colors hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {prompt.categoryName}
          </Link>
          <span className="text-xs text-muted-foreground tabular-nums">{prompt.upvotes} ↑</span>
        </div>

        <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-foreground">
          {prompt.title}
        </h3>
        <p className="mt-2 text-xs line-clamp-2 leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
          {prompt.useCase}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1.5">
            {prompt.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground/90"
              >
                #{t}
              </span>
            ))}
          </div>
          <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </div>
      </div>
    </div>
  );
}
