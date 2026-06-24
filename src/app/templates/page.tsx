import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TEMPLATE_FOLDERS, TEMPLATE_COUNT } from "@/lib/templates-catalog";
import { getDownloadCounts } from "@/lib/actions/downloads";
import { TemplatesClient } from "@/components/templates/templates-client";

export const metadata: Metadata = {
  title: "Templates | vibeprompt",
  description:
    "Drop-in files for your repo and your vibe-coding workflow: AGENTS.md, PRD, changelog, architecture, and more. Download in one click.",
  alternates: { canonical: "/templates" },
};

export const revalidate = 60;

export default async function TemplatesPage() {
  const counts = await getDownloadCounts();
  return (
    <main>
      <div className="page-shell-wide">
        <PageHeader
          emoji="🗂️"
          title="Templates"
          lede={`${TEMPLATE_COUNT} drop-in files for your repo and your AI sessions. Download, then fill in the blanks.`}
        />
        <TemplatesClient folders={TEMPLATE_FOLDERS} counts={counts} />
      </div>
    </main>
  );
}
