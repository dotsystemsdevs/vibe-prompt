import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | vibeprompt",
  description: "vibeprompt privacy policy. We collect minimal data and never sell it.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 pb-24">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-foreground/40">Last updated April 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/60">
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">What we collect</h2>
          <p>vibeprompt collects anonymous usage analytics via Vercel Analytics (page views, no personal data). The site has no user accounts, so we do not collect sign-in or profile data from this app.</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">What we don&apos;t do</h2>
          <p>We do not sell data, run ads, or share your information with third parties beyond what is required to operate the service (Vercel and, if configured, our Supabase project for optional features).</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">Cookies</h2>
          <p>We do not use ad or social tracking cookies. Analytics is first-party and counts page views, not a cross-site profile. There is no login cookie for this app.</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-foreground/80 mb-2">Contact</h2>
          <p>Questions? Reach us at <a href="mailto:dot.systems@proton.me" className="text-foreground/80 underline hover:text-foreground">dot.systems@proton.me</a></p>
        </section>
      </div>
    </div>
  );
}
