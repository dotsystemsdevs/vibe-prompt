import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import {
  BUILT_WITH_PROJECTS,
  SURFACE_LABEL,
  faviconUrl,
  builtWithSlug,
  getBuiltWithProject,
} from "@/lib/built-with-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUILT_WITH_PROJECTS.map((p) => ({ slug: builtWithSlug(p.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getBuiltWithProject(slug);
  if (!p) return { title: "Project not found | vibeprompt" };
  const desc = `${p.oneLine} Stack: ${p.stack}. What worked, what broke, and the workflow steps used to ship it.`;
  return {
    title: `${p.name} — built with vibeprompt`,
    description: desc.length > 160 ? `${desc.slice(0, 157)}...` : desc,
    alternates: { canonical: `/built-with/${slug}` },
    openGraph: {
      title: `${p.name} — built with vibeprompt`,
      description: p.oneLine,
      url: `https://vibeprompt.tech/built-with/${slug}`,
      type: "article",
    },
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-label mb-2">{label}</h2>
      <p className="text-body-lg">{children}</p>
    </section>
  );
}

export default async function ProjectPostmortem({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBuiltWithProject(slug);
  if (!p) notFound();

  const others = BUILT_WITH_PROJECTS.filter((x) => x.name !== p.name).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.oneLine,
    url: p.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: p.surfaces.join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: { "@type": "WebSite", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-shell">
        <Link href="/built-with" className="btn-ghost">
          ← All projects
        </Link>

        <PageHeader kicker="Built with vibeprompt" title={p.name}>
          <div className="mt-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconUrl(p.iconDomain)}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-md"
            />
            <div className="text-meta flex flex-wrap items-center gap-x-2 gap-y-0.5">
              {p.surfaces.map((s) => (
                <span key={s}>{SURFACE_LABEL[s]}</span>
              ))}
            </div>
          </div>
        </PageHeader>

        <p className="text-body-lg">{p.oneLine}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visit it live
            <span aria-hidden>↗</span>
          </a>
          <span className="vp-badge-outline vp-badge">{p.result ?? p.status}</span>
        </div>

        {/* Receipts */}
        <Section label="Tech stack">{p.stack}</Section>
        {p.timeToBuild && <Section label="Time to build">{p.timeToBuild}</Section>}
        <Section label="What worked">{p.whatWorked}</Section>
        <Section label="What broke, and how it was fixed">{p.whatBroke}</Section>
        <Section label="Workflow steps used">
          {p.workflowSteps}
        </Section>
        {p.promptsUsed && <Section label="Prompts used">{p.promptsUsed}</Section>}
        <Section label="Result">{p.result ?? p.status}</Section>

        <p className="text-body mt-6 flex items-center gap-2">
          <span aria-hidden>🍳</span>
          <span>
            Want the same process?{" "}
            <Link href="/workflow" className="vp-link">
              Open the 10-step cookbook →
            </Link>
          </span>
        </p>

        {/* More projects */}
        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="section-title mb-3">More shipped with vibeprompt</h2>
            <ul className="divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
              {others.map((o) => (
                <li key={o.name}>
                  <Link href={`/built-with/${builtWithSlug(o.name)}`} className="group block py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-body font-medium text-[color:var(--ink-soft)] transition-colors group-hover:text-[color:var(--accent)]">
                        {o.name}
                      </span>
                      <span className="text-meta hidden truncate sm:block">{o.oneLine}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Submit yours */}
        <p className="text-meta mt-10">
          Shipped something with vibeprompt?{" "}
          <a
            href="https://github.com/dotsystemsdevs/vibe-prompt/issues/new?title=%5BBuilt-with%5D+My+project"
            target="_blank"
            rel="noopener noreferrer"
            className="vp-link"
          >
            Add your project →
          </a>
        </p>
      </div>
    </main>
  );
}

export const revalidate = 3600;
