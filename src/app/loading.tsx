/**
 * Root loading boundary — shown instantly when navigating between routes
 * while the next server component is being rendered. Keeps the sidebar +
 * topbar in place (those live in layout) so only the main area shows the
 * skeleton.
 */
export default function Loading() {
  return (
    <div className="page-shell">
      {/* Emoji placeholder */}
      <div className="vp-skeleton h-[44px] w-[44px]" />

      {/* Title placeholder */}
      <div className="vp-skeleton mt-4 h-[40px] w-2/5" />

      {/* Lede placeholder */}
      <div className="mt-3 space-y-2">
        <div className="vp-skeleton h-[15px] w-full max-w-[36rem]" />
        <div className="vp-skeleton h-[15px] w-4/5 max-w-[28rem]" />
      </div>

      {/* Content row placeholders */}
      <div className="mt-12 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="vp-skeleton h-[28px] w-full"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}
