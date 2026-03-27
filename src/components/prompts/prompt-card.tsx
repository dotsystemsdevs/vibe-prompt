import Link from "next/link";
import { Prompt } from "@/lib/types";

interface PromptCardProps {
  prompt: Prompt;
}

const difficultyConfig = {
  beginner: "text-foreground",
  intermediate: "text-foreground",
  advanced: "text-foreground",
};

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link href={`/prompts/${prompt.slug}`} className="group block bg-background">
      <div className="flex h-full flex-col p-6 transition-colors group-hover:bg-muted">
        {/* Top */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {prompt.categoryName}
          </span>
          <span className="text-xs text-muted-foreground">{prompt.difficulty}</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-sm font-semibold leading-snug">
          {prompt.title}
        </h3>

        {/* Use case */}
        <p className="mb-6 flex-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {prompt.useCase}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
              </svg>
              {prompt.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {prompt.commentCount}
            </span>
          </div>
          <div className="flex gap-1.5">
            {prompt.tools.slice(0, 2).map((tool) => (
              <span key={tool} className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
