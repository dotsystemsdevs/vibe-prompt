import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy | vibeprompt",
  description: "vibeprompt privacy policy. We collect minimal data and never sell it.",
};

const SECTIONS = [
  {
    emoji: "📊",
    heading: "What we collect",
    body: "vibeprompt collects anonymous usage analytics via Vercel Analytics (page views, no personal data). The site has no user accounts, so we do not collect sign-in or profile data from this app.",
  },
  {
    emoji: "🚫",
    heading: "What we don't do",
    body: "We do not sell data, run ads, or share your information with third parties beyond what is required to operate the service (Vercel and, if configured, our Supabase project for optional features).",
  },
  {
    emoji: "🍪",
    heading: "Cookies",
    body: "We do not use ad or social tracking cookies. Analytics is first-party and counts page views, not a cross-site profile. There is no login cookie for this app.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="">
      <div className="page-shell">
        <PageHeader
          emoji="🔒"
          title="Privacy Policy"
          lede={
            <>
              What vibeprompt collects, what it doesn&rsquo;t, and how to reach us. Short version: minimal
              data, never sold.
            </>
          }
        >
          <p className="text-meta mt-2">Last updated April 2026</p>
        </PageHeader>

        <div className="mt-10 space-y-9">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="section-title flex items-center gap-2.5">
                <span aria-hidden className="text-[22px] leading-none">{s.emoji}</span>
                {s.heading}
              </h2>
              <p className="mt-3 text-body-lg">{s.body}</p>
            </section>
          ))}
          <section>
            <h2 className="section-title flex items-center gap-2.5">
              <span aria-hidden className="text-[22px] leading-none">✉️</span>
              Contact
            </h2>
            <p className="mt-3 text-body-lg">
              Questions? Reach us at{" "}
              <a href="mailto:dot.systems@proton.me" className="vp-link">
                dot.systems@proton.me
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
