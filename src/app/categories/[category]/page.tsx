import { notFound } from "next/navigation";
import Link from "next/link";
import { PromptCard } from "@/components/prompts/prompt-card";
import { getCategoryBySlug, getPromptsByCategory, CATEGORIES } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const prompts = getPromptsByCategory(categorySlug);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="mt-1 text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{category.count} prompts</span>
          <span>·</span>
          <a
            href="https://github.com/vibeprompt/vibeprompt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            Contribute a prompt →
          </a>
        </div>
      </div>

      {/* Prompts grid */}
      {prompts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/60 py-20 text-center">
          <p className="text-muted-foreground">No prompts yet in this category.</p>
          <a
            href="https://github.com/vibeprompt/vibeprompt"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-violet-400 hover:underline"
          >
            Be the first to contribute →
          </a>
        </div>
      )}
    </div>
  );
}
