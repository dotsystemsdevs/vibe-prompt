import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TEMPLATE_FOLDERS, TEMPLATE_COUNT } from "@/lib/templates-catalog";
import { TemplatesClient } from "@/components/templates/templates-client";

export const metadata: Metadata = {
  title: "Templates | vibeprompt",
  description:
    "Drop-in files for your repo and your vibe-coding workflow: AGENTS.md, PRD, changelog, architecture, and more. Copy or download.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <main className="page-shell">
      <PageHeader
        icon="templates"
        title="Templates"
        lede={`${TEMPLATE_COUNT} drop-in files for your repo and your AI sessions. Copy or download, then fill in the blanks.`}
      />
      <TemplatesClient folders={TEMPLATE_FOLDERS} />
    </main>
  );
}
