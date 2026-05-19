import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import {
  LIST_PROBLEMS,
  LIST_CATEGORIES,
  LIST_CATEGORY_LABEL,
  LIST_CATEGORY_DESCRIPTION,
  type ListCategory,
} from "@/lib/list-problems";

export const metadata: Metadata = {
  title: "What goes wrong (and how to fix it) | vibeprompt",
  description: `${LIST_PROBLEMS.length} field-tested problems solo builders hit when shipping with AI, and the tactical fix for each. Build, ship, grow, earn, stay.`,
  alternates: { canonical: "/list" },
  openGraph: {
    title: "What goes wrong (and how to fix it), vibeprompt",
    description: `${LIST_PROBLEMS.length} field-tested problems solo builders hit when shipping with AI, and the tactical fix for each.`,
    url: "https://vibeprompt.tech/list",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

interface ListPageProps {
  searchParams: Promise<{ cat?: string }>;
}

function parseCategory(raw: string | undefined): ListCategory | null {
  if (raw && (LIST_CATEGORIES as readonly string[]).includes(raw)) return raw as ListCategory;
  return null;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  const { cat } = await searchParams;
  const activeCategory = parseCategory(cat);
  const problems = activeCategory
    ? LIST_PROBLEMS.filter((p) => p.category === activeCategory)
    : LIST_PROBLEMS;

  const counts: Record<ListCategory, number> = Object.fromEntries(
    LIST_CATEGORIES.map((c) => [c, 0])
  ) as Record<ListCategory, number>;
  for (const p of LIST_PROBLEMS) counts[p.category]++;

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"What goes wrong\n(and how to fix it)."}
          description={`${LIST_PROBLEMS.length} field-tested problems solo builders hit, with the tactical fix for each.`}
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-foreground/12 pb-0">
          <CategoryTab
            href="/list"
            active={activeCategory === null}
            label="All"
            count={LIST_PROBLEMS.length}
          />
          {LIST_CATEGORIES.map((c) => (
            <CategoryTab
              key={c}
              href={`/list?cat=${c}`}
              active={activeCategory === c}
              label={LIST_CATEGORY_LABEL[c]}
              count={counts[c]}
            />
          ))}
        </div>

        {activeCategory && (
          <p className="mb-6 pt-4 text-xs leading-relaxed text-muted-foreground max-w-2xl">
            {LIST_CATEGORY_DESCRIPTION[activeCategory]}
          </p>
        )}
        {!activeCategory && <div className="h-4" />}

        <ol className="border border-foreground/20 overflow-hidden">
          {problems.map((problem, i) => (
            <li
              key={problem.id}
              id={problem.id}
              className={`relative px-5 sm:px-7 py-6 ${i > 0 ? "border-t border-foreground/[0.08]" : ""}`}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="shrink-0 text-[10px] tabular-nums uppercase tracking-widest text-foreground/30 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-sm font-semibold leading-snug text-foreground/95">
                  {problem.title}
                </h2>
              </div>

              <div className="ml-11">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                    {LIST_CATEGORY_LABEL[problem.category]}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-foreground/65">
                  {problem.answer}
                </p>

                {problem.articleSlug && (
                  <Link
                    href={`/articles/${problem.articleSlug}`}
                    className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
                  >
                    Deep dive →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>

        {problems.length === 0 && (
          <div className="border border-foreground/20 px-8 py-20 text-center">
            <p className="text-sm text-muted-foreground">No entries in this category yet.</p>
          </div>
        )}

        <Reveal>
          <GithubCta
            title={"Hit a problem\nnot on the list?"}
            description="Open an issue or PR. Real receipts beat theory — if you've solved something with a tactical answer, add it."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a problem"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}

function CategoryTab({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors ${
        active ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      <span className="ml-1.5 tabular-nums text-foreground/30">{count}</span>
      {active && <span className="absolute inset-x-2 -bottom-px h-px bg-foreground" />}
    </Link>
  );
}
