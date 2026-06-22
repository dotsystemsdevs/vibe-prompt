"use client";

/** Highest-res thumbnail that always exists for a public video. */
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export type Lesson = {
  /** Display title with the "Watch:/Read:" prefix already stripped. */
  title: string;
  /** 11-char YouTube id when this lesson points at a real video. */
  youtubeId?: string;
  /** Fallback link (search or watch URL) when there's no id. */
  href?: string;
  /** "4:12" style runtime, display only. */
  duration?: string;
  /** Read-only article vs. a watchable video. */
  read?: boolean;
};

/**
 * The featured poster at the top of a recipe. Clicking opens the real video on
 * YouTube in a new tab, this works regardless of a video's embed permissions
 * (some videos disable embedding, which broke the old inline iframe).
 */
/** A small pill ("Preview", "Trailer") painted over the poster, top-left. */
function PosterBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
      {label}
    </span>
  );
}

export function LessonVideo({ lesson, badge }: { lesson: Lesson | null; badge?: string }) {
  if (!lesson) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-[color:var(--ink-rule)] bg-[color:var(--paper-soft)]">
        <span className="flex flex-col items-center gap-2 text-center text-[color:var(--ink-faded)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M10 9l5 3-5 3z" />
          </svg>
          <span className="text-meta">No video for this recipe yet</span>
        </span>
      </div>
    );
  }

  const { youtubeId, href, title, duration } = lesson;
  const url = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : href ?? "https://www.youtube.com";

  return (
    <figure className="overflow-hidden rounded-2xl border border-[color:var(--ink-rule)] bg-black shadow-[0_18px_44px_-20px_rgba(0,0,0,0.35)]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch on YouTube: ${title}`}
        className="group relative block aspect-video w-full"
      >
        {badge && <PosterBadge label={badge} />}

        {youtubeId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={youtubeThumb(youtubeId)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-[color:var(--paper-soft)]" />
        )}

        <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5 text-[color:var(--ink)]">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>

        {/* Title + "watch on youtube" so it's clear where the click goes */}
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-white">{title}</span>
            <span className="text-[11px] text-white/80">Watch on YouTube ↗</span>
          </span>
          {duration && (
            <span className="shrink-0 rounded-md bg-black/75 px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-white">
              {duration}
            </span>
          )}
        </span>
      </a>
    </figure>
  );
}
