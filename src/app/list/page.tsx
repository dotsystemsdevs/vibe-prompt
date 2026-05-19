import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";
import { ProblemsList } from "@/components/list/problems-list";
import {
  LIST_PROBLEMS,
  LIST_CATEGORIES,
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
  const initialCategory = parseCategory(cat);

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"What goes wrong\n(and how to fix it)."}
          description={`${LIST_PROBLEMS.length} field-tested problems solo builders hit, with the tactical fix for each. Search by error or topic.`}
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-6">
        <ProblemsList problems={LIST_PROBLEMS} initialCategory={initialCategory} />

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
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}
