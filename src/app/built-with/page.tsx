import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { BUILT_WITH_PROJECTS, SURFACE_LABEL, faviconUrl } from "@/lib/built-with-data";

export const metadata: Metadata = {
  title: "Built with vibeprompt — real apps shipped using the 10-step workflow",
  description:
    "Six indie apps shipped using vibeprompt's workflow + prompts. iOS, Android, and web. Live URLs, what stack, what we learned, what broke. Not aspirational — actually shipped.",
  alternates: { canonical: "/built-with" },
  keywords: "built with vibeprompt, vibe coding case study, indie app showcase, ai coded app examples, claude code shipped apps",
  openGraph: {
    title: "Built with vibeprompt — real apps, real URLs",
    description: "Six indie apps shipped end-to-end using vibeprompt's 10-step workflow.",
    url: "https://vibeprompt.tech/built-with",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function BuiltWithPage() {
  return (
    <div>
      <div className="page-shell-wide">
        <PageHeader
          emoji="🚀"
          title="Built with vibeprompt"
          lede="Six indie apps shipped end-to-end using the 10-step workflow. iOS, Android, web. Live URLs, real stacks, honest what-broke notes. Not aspirational, actually shipped."
        />

        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-body-lg text-[color:var(--ink)]">
              Most &ldquo;built with X&rdquo; pages are marketing. This one is a postmortem. Every project below
              shipped to a real URL or store listing using vibeprompt&rsquo;s workflow, and every one of
              them broke in some specific way that became a fix recipe on this site.
            </p>
            <p className="text-body mt-4">
              All six were built by the same solo dev (the maintainer of this site). The workflow
              didn&rsquo;t come from a book. It came from the patterns that survived across these
              projects.
            </p>

            {/* Submit-your-own callout — Notion callout block */}
            <div className="mt-6 flex items-start gap-3 vp-card-bordered vp-card-tight">
              <span aria-hidden className="mt-px text-[16px] leading-none">📮</span>
              <p className="text-body">
                Shipped something with vibeprompt?{" "}
                <a
                  href="https://github.com/dotsystemsdevs/vibe-prompt/issues/new?title=%5BBuilt-with%5D+My+project&body=%2A%2AProject+name%3A%2A%2A%0A%2A%2AURL%3A%2A%2A%0A%2A%2AOne-liner%3A%2A%2A%0A%2A%2AStack%3A%2A%2A%0A%2A%2AStatus%3A%2A%2A%0A%2A%2AWhat+worked%3A%2A%2A%0A%2A%2AWhat+broke%3A%2A%2A%0A%2A%2AWhich+steps+you+used%3A%2A%2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vp-link"
                >
                  Add it to the list →
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Project cards — Notion soft-block style */}
        <div className="space-y-4">
          {BUILT_WITH_PROJECTS.map((p) => (
            <Reveal key={p.name}>
              <article className="vp-card-bordered vp-card-lg">
                {/* Card head */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={faviconUrl(p.iconDomain)}
                      alt=""
                      width={32}
                      height={32}
                      className="shrink-0 mt-0.5 h-8 w-8 rounded-md"
                    />
                    <div className="min-w-0">
                      <h2 className="text-headline">{p.name}</h2>
                      <div className="text-meta mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        {p.surfaces.map((s) => (
                          <span key={s}>{SURFACE_LABEL[s]}</span>
                        ))}
                        <span>·</span>
                        <span className="font-mono text-[11px]">{p.stack}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost shrink-0"
                  >
                    Visit ↗
                  </a>
                </div>

                {/* One-liner + status */}
                <p className="text-body-lg mt-4 text-[color:var(--ink)]">{p.oneLine}</p>
                <p className="text-meta mt-2">{p.status}</p>

                {/* Postmortem — faint divider, Notion property labels */}
                <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-3 border-t border-[color:var(--ink-rule)] pt-6">
                  <div>
                    <dt className="text-label mb-2">What worked</dt>
                    <dd className="text-body">{p.whatWorked}</dd>
                  </div>
                  <div>
                    <dt className="text-label mb-2">What broke</dt>
                    <dd className="text-body">{p.whatBroke}</dd>
                  </div>
                  <div>
                    <dt className="text-label mb-2">Which steps</dt>
                    <dd className="text-body">{p.workflowSteps}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
}

export const revalidate = 3600;
