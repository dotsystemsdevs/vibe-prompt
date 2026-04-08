import Link from "next/link";
import { getPromptLibrary } from "@/lib/prompt-library";

export async function FeaturedPrompt() {
  const { prompts } = await getPromptLibrary();
  if (prompts.length === 0) return null;

  // eslint-disable-next-line react-hooks/purity
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const prompt = prompts[week % prompts.length];

  return (
    <section className="border-t border-foreground/15 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[10px] uppercase tracking-widest text-foreground/35">Prompt of the week</p>
        <Link
          href={`/prompts/${prompt.slug}`}
          className="group block border border-foreground/15 bg-foreground/[0.02] p-6 transition-colors hover:bg-foreground/[0.05] sm:p-8"
        >
          <p className="mb-2 text-[10px] uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
            {prompt.categoryName}
          </p>
          <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
            {prompt.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {prompt.useCase}
          </p>
          <p className="mt-5 text-xs text-foreground/30 transition-colors group-hover:text-foreground/60">
            Copy prompt →
          </p>
        </Link>
      </div>
    </section>
  );
}
