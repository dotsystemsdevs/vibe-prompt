import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { BUILT_WITH_PROJECTS, SURFACE_LABEL, faviconUrl, builtWithSlug } from "@/lib/built-with-data";

export const metadata: Metadata = {
  title: "Built with vibeprompt: apps shipped using the 10-step workflow",
  description:
    "Five indie apps shipped using vibeprompt's workflow + prompts. iOS, Android, and web. Live URLs, what stack, what we learned, what broke. Not aspirational, actually shipped.",
  alternates: { canonical: "/built-with" },
  keywords: "built with vibeprompt, vibe coding case study, indie app showcase, ai coded app examples, claude code shipped apps",
  openGraph: {
    title: "Built with vibeprompt: the apps, the URLs, what broke",
    description: "Five indie apps shipped end-to-end using vibeprompt's 10-step workflow.",
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
          accent="blue"
          title="Built with vibeprompt"
          lede="Five indie apps shipped end-to-end using the 10-step workflow. iOS, Android, web. Live URLs, the stacks, and what broke on each. Not aspirational, actually shipped."
        />

        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-body-lg text-[color:var(--ink)]">
              Most &ldquo;built with X&rdquo; pages are marketing. This one is a postmortem. Every project below
              shipped to a live URL or store listing using vibeprompt&rsquo;s workflow, and every one of
              them broke in some specific way that became a fix recipe on this site.
            </p>
            <p className="text-body mt-4">
              All five were built by the same solo dev (the maintainer of this site). The workflow
              didn&rsquo;t come from a book. It came from the patterns that survived across these
              projects.
            </p>

            {/* Submit-your-own — a quiet line, not a box */}
            <p className="text-meta mt-5">
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
        </Reveal>

        {/* Projects — a clean list, not a stack of cards */}
        <div className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
          {BUILT_WITH_PROJECTS.map((p) => {
            const slug = builtWithSlug(p.name);
            return (
              <Reveal key={p.name}>
                <article className="py-7">
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
                        <h2 className="text-headline">
                          <Link href={`/built-with/${slug}`} className="transition-colors hover:text-[color:var(--accent)]">
                            {p.name}
                          </Link>
                        </h2>
                        <div className="text-meta mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          {p.surfaces.map((s) => (
                            <span key={s}>{SURFACE_LABEL[s]}</span>
                          ))}
                          <span>·</span>
                          <span className="font-mono text-[11px]">{p.stack}</span>
                        </div>
                      </div>
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
                      Visit ↗
                    </a>
                  </div>

                  <p className="text-body-lg mt-4 text-[color:var(--ink)]">{p.oneLine}</p>
                  <p className="text-meta mt-2 line-clamp-1">
                    <span className="font-medium text-[color:var(--ink-soft)]">What broke:</span> {p.whatBroke}
                  </p>
                  <Link href={`/built-with/${slug}`} className="btn-ghost mt-3">
                    Read the full postmortem →
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export const revalidate = 3600;
