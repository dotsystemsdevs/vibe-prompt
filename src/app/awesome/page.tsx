import { AwesomeClient } from "@/components/awesome/awesome-client";
import { PageHeader } from "@/components/layout/page-header";
import { AWESOME_CATEGORIES } from "@/lib/awesome-data";

const HOUSE_RULES = [
  { label: "Actually used", body: "Every tool here was used to ship something in the cookbook." },
  { label: "Free first", body: "Free or open-source ranks first. Paid tools earn a slot when no free option fills it." },
  { label: "No deals", body: "No affiliate links, no paid placement, no SEO trades." },
];

export const metadata = {
  title: "Awesome Vibe Coding · 149 tools the cookbook actually uses | vibeprompt",
  description:
    "A list of tools, AI coding platforms, and resources for vibe coders. No bloat, no affiliates, no paid placement. Grouped by where you use them in the workflow.",
  alternates: { canonical: "/awesome" },
  openGraph: {
    title: "Awesome Vibe Coding · 149 tools the cookbook actually uses",
    description: "Tools, platforms, and resources for vibe coders. No bloat, no affiliates.",
    url: "https://vibeprompt.tech/awesome",
  },
};

export default async function AwesomePage() {
  const totalItems = AWESOME_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div id="top">
      <div className="page-shell">
        <PageHeader
          emoji="🧰"
          accent="green"
          title="Awesome list"
          lede={
            <>
              {totalItems} tools, grouped by where you reach for them in the cookbook.
              No bloat, no affiliates.
            </>
          }
        >
          {/* House rules — quiet intro line per rule */}
          <ul className="mt-6 space-y-2">
            {HOUSE_RULES.map((rule) => (
              <li key={rule.label} className="text-body flex gap-2.5">
                <span aria-hidden className="select-none text-[color:var(--ink-faded)]">·</span>
                <span>
                  <span className="font-semibold text-[color:var(--ink)]">{rule.label}.</span>{" "}
                  <span className="text-[color:var(--ink-soft)]">{rule.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </PageHeader>

        {/* Tools, as home-page-style sections */}
        <AwesomeClient categories={AWESOME_CATEGORIES} />
      </div>
    </div>
  );
}

export const revalidate = 3600;
