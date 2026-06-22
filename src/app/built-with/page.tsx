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
          icon="box"
          title="Built with vibeprompt"
          lede="Five indie apps shipped end-to-end with the 10-step workflow. Live URLs, the stacks, and what broke on each. Not aspirational, actually shipped."
        />

        {/* Projects, card grid, same feel as Articles */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT_WITH_PROJECTS.map((p) => {
            const slug = builtWithSlug(p.name);
            return (
              <li key={p.name}>
                <Reveal>
                  <article className="vp-card-bordered group flex h-full flex-col overflow-hidden hover:border-[color:var(--ink-soft)]">
                    {/* Cover, project logo on a soft tinted tile */}
                    <Link
                      href={`/built-with/${slug}`}
                      aria-label={`${p.name} postmortem`}
                      className="relative flex w-full items-center justify-center bg-[color:var(--sidebar-hover)]"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={faviconUrl(p.iconDomain)}
                        alt=""
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {p.surfaces.map((s) => (
                          <span key={s} className="vp-badge">{SURFACE_LABEL[s]}</span>
                        ))}
                      </div>
                      <h2 className="text-body mt-2.5 font-medium leading-snug text-[color:var(--ink)]">
                        <Link href={`/built-with/${slug}`} className="group-hover:underline">
                          {p.name}
                        </Link>
                      </h2>
                      <p className="text-meta mt-1.5 line-clamp-2">{p.oneLine}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                        <Link href={`/built-with/${slug}`} className="btn-ghost">
                          Read postmortem →
                        </Link>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-meta text-[color:var(--ink-faded)] transition-colors hover:text-[color:var(--ink)]"
                        >
                          Visit ↗
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Submit-your-own, a quiet line below the grid */}
        <p className="text-meta mt-8">
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
  );
}

export const revalidate = 3600;
