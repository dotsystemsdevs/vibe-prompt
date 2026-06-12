import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SubmitFixForm } from "@/components/fixes/submit-fix-form";

export const metadata: Metadata = {
  title: "Submit a Fix | vibeprompt",
  description:
    "Hit an AI build failure and found the fix? Submit it to the AI Build Failure Database so the next builder does not lose three hours.",
  alternates: { canonical: "/submit-fix" },
};

export default function SubmitFixPage() {
  return (
    <main>
      <div className="page-shell">
        <PageHeader
          emoji="🛠️"
          kicker="Contribute"
          title="Submit the fix that saved your build."
          lede="Failures are the moat. If AI broke your build and you found the fix, submit it so the next builder does not lose three hours."
        />

        <div className="mt-10">
          <SubmitFixForm />
        </div>
      </div>
    </main>
  );
}
