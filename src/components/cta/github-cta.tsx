import Link from "next/link";

type GithubCtaProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  borderTop?: boolean;
  accent?: string;
  className?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function GithubCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  borderTop = true,
  className,
}: GithubCtaProps) {
  const primaryClass =
    "inline-flex items-center gap-1.5 rounded-md bg-[color:var(--accent)] px-3.5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[color:var(--accent-hover)]";
  const secondaryClass =
    "inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--accent)]";

  return (
    <section
      className={`${borderTop ? "border-t border-[color:var(--ink-rule)]" : ""} px-6 py-10 sm:py-12 ${className ?? ""}`}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <h2 className="text-[22px] sm:text-[26px] font-bold leading-tight tracking-[-0.015em] text-[color:var(--ink)]">
            {title.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="mt-2.5 text-[14px] leading-[1.55] text-[color:var(--ink-soft)]">{description}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {isExternalHref(primaryHref) ? (
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className={primaryClass}>
              {primaryLabel} →
            </a>
          ) : (
            <Link href={primaryHref} className={primaryClass}>
              {primaryLabel} →
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            isExternalHref(secondaryHref) ? (
              <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className={secondaryClass}>
                {secondaryLabel} →
              </a>
            ) : (
              <Link href={secondaryHref} className={secondaryClass}>
                {secondaryLabel} →
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
