import Link from "next/link";
import { CATEGORIES } from "@/lib/mock-data";

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="mt-1 text-muted-foreground">
          Browse prompts by what you&apos;re building
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-violet-500/40 hover:shadow-md hover:shadow-violet-500/5"
          >
            <span className="mb-3 text-3xl">{category.icon}</span>
            <h2 className="mb-1 text-lg font-semibold group-hover:text-violet-400 transition-colors">
              {category.name}
            </h2>
            <p className="flex-1 text-sm text-muted-foreground">
              {category.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{category.count} prompts</span>
              <span className="text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">
                Browse →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
