import Link from "next/link";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  descriptionSlot?: React.ReactNode;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  rightSlot?: React.ReactNode;
  className?: string;
  accent?: string;
};

function splitLines(text: string) {
  return text.split("\n").map((t) => t.trim()).filter(Boolean);
}

function renderLine(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <span key={i} style={{ color: "var(--accent-blue)" }}>{part.slice(2, -2)}</span>;
    }
    return part;
  });
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function Action({ action }: { action: HeroAction; accent: string }) {
  const variant = action.variant ?? "primary";
  const classes =
    variant === "primary"
      ? "inline-flex items-center gap-1.5 rounded-md bg-[color:var(--accent)] px-3.5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[color:var(--accent-hover)]"
      : "inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--accent)]";

  if (isExternalHref(action.href)) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {action.label} →
      </a>
    );
  }

  return (
    <Link href={action.href} className={classes}>
      {action.label} →
    </Link>
  );
}


export function Hero({
  eyebrow,
  title,
  description,
  descriptionSlot,
  primaryAction,
  secondaryAction,
  rightSlot,
  className,
  accent,
}: HeroProps) {
  const resolvedAccent = accent ?? "var(--lilac)";
  return (
    <section
      className={`relative px-6 py-8 sm:py-10 ${className ?? ""}`}
      style={{ ["--hero-accent" as never]: resolvedAccent } as React.CSSProperties}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className={rightSlot ? "max-w-2xl" : "max-w-2xl"}>
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.10em] text-[color:var(--ink-faded)] mb-3">
                {eyebrow}
              </p>
            )}

            <h1 className="text-[36px] sm:text-[42px] font-bold tracking-[-0.025em] leading-[1.1] text-[color:var(--ink)]">
              {splitLines(title).map((line, i, arr) => (
                <span key={i}>
                  {renderLine(line)}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>

            {description && (
              <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[color:var(--ink-soft)]">
                {description}
              </p>
            )}
            {descriptionSlot && (
              <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[color:var(--ink-soft)]">
                {descriptionSlot}
              </p>
            )}

            {(primaryAction || secondaryAction) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {primaryAction && <Action action={primaryAction} accent={resolvedAccent} />}
                {secondaryAction && <Action action={secondaryAction} accent={resolvedAccent} />}
              </div>
            )}
          </div>

          {rightSlot ? <div className="hidden lg:block">{rightSlot}</div> : null}
        </div>
      </div>
    </section>
  );
}
