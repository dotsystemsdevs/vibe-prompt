import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptBySlug } from "@/lib/prompt-library";
import { CATEGORY_COLOR_MAP } from "@/lib/categories";
import { PromptActions } from "@/components/prompts/prompt-actions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) notFound();

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
          <span>/</span>
          <Link
            href={`/browse?category=${prompt.category}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR_MAP[prompt.category] ?? "#6b7280" }} />
            {prompt.categoryName}
          </Link>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {prompt.title}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed">{prompt.useCase}</p>

        <PromptActions slug={prompt.slug} promptText={prompt.prompt} initialUpvotes={prompt.upvotes} />

        {/* When to use */}
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">When to use</p>
          <p className="text-sm leading-relaxed">{prompt.whenToUse}</p>
        </div>

        {/* Prompt */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Prompt</p>
          </div>
          <pre className="overflow-x-auto rounded border border-border bg-card p-5 text-xs leading-relaxed whitespace-pre-wrap font-mono">
            {prompt.prompt}
          </pre>
        </div>

        {/* Notes */}
        {prompt.notes && (
          <div className="mb-10 border-l border-border pl-4">
            <p className="text-xs text-muted-foreground leading-relaxed">{prompt.notes}</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground/90"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
