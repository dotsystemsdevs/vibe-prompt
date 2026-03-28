import { BrowseClient } from "@/components/prompts/browse-client";
import { getPromptLibrary } from "@/lib/prompt-library";
import { Suspense } from "react";

export default async function BrowsePage() {
  const { categories, prompts } = await getPromptLibrary();

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl">
        <section className="border-b border-border px-6 py-12">
          <p className="hero-kicker mb-5">Browse</p>
          <h1 className="hero-display max-w-3xl">
            Prompts that ship
            <br />
            real products.
          </h1>
        </section>
        <Suspense fallback={<div className="px-6 py-10 text-sm text-muted-foreground">Loading prompts...</div>}>
          <BrowseClient categories={categories} prompts={prompts} />
        </Suspense>
      </div>
    </div>
  );
}
