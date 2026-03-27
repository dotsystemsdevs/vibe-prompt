import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompts/prompt-card";
import { TRENDING_PROMPTS } from "@/lib/mock-data";

// Mock: user is NOT logged in
const IS_LOGGED_IN = false;

// Mock saved prompts (shown when logged in)
const SAVED_PROMPTS = TRENDING_PROMPTS.slice(0, 3);

export default function LibraryPage() {
  if (!IS_LOGGED_IN) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <div className="mb-6 text-5xl">🔒</div>
        <h1 className="mb-3 text-2xl font-bold">Your prompt library</h1>
        <p className="mb-8 text-muted-foreground">
          Sign in to save prompts, build collections, and never lose a good
          prompt again.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button className="bg-violet-600 text-white hover:bg-violet-700">
            Sign in
          </Button>
          <Button variant="outline">Create free account</Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/browse" className="text-violet-400 hover:underline">
            Browse prompts →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Library</h1>
          <p className="mt-1 text-muted-foreground">
            {SAVED_PROMPTS.length} saved prompts
          </p>
        </div>
        <Link href="/browse">
          <Button variant="outline" size="sm">
            Browse more
          </Button>
        </Link>
      </div>

      {SAVED_PROMPTS.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 py-20 text-center">
          <p className="text-muted-foreground">No saved prompts yet.</p>
          <Link href="/browse" className="mt-3 inline-block text-sm text-violet-400 hover:underline">
            Browse prompts →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAVED_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
