import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Privacy | vibeprompt",
  description:
    "What vibeprompt collects, where it is stored, how long, and how to delete it. Minimal data, no tracking cookies, never sold.",
  alternates: { canonical: "/privacy" },
};

const CONTACT = "dot.systems@proton.me";

export default function PrivacyPage() {
  return (
    <main>
      <div className="page-shell">
        <PageHeader
          icon="lock"
          title="Privacy"
          lede="Plain English, no legal padding. vibeprompt has no accounts and no tracking cookies. The only personal data it touches is the email you give the newsletter, and what you choose to put in the Submit a Fix form."
        >
          <p className="text-meta mt-2">Last updated June 2026. This is a plain-language summary, not legal advice.</p>
        </PageHeader>

        <div className="mt-10 space-y-9">
          <section>
            <h2 className="section-title">What we collect, and why</h2>
            <p className="text-body-lg mt-3">There are exactly two places you can hand us personal data, both opt-in:</p>
            <ul className="mt-3 space-y-3">
              <li className="text-body-lg">
                <span className="font-semibold text-[color:var(--ink)]">Newsletter.</span> If you subscribe to the
                Weekly Fix, we store your email address so we can send it. That is the only thing we ask for, and the
                only thing we do with it.
              </li>
              <li className="text-body-lg">
                <span className="font-semibold text-[color:var(--ink)]">Submit a Fix.</span> If you submit a fix, we
                store what you type: the problem and fix, optional tools and error text, your name, your email, and an
                optional link (site/GitHub/Twitter). We use the email to review the submission and follow up. With your
                consent (the checkbox on the form) we may publish the fix with your name and link as attribution. Your
                email is never published.
              </li>
            </ul>
            <p className="text-body mt-4">
              We also count page views with privacy-friendly, cookieless analytics (Vercel Analytics and a self-hosted
              counter). These measure traffic, not people, and build no cross-site or personal profile.
            </p>
          </section>

          <section>
            <h2 className="section-title">Where it is stored, and for how long</h2>
            <ul className="mt-3 space-y-3">
              <li className="text-body-lg">
                Newsletter emails and fix submissions are stored in Vercel KV (our hosting provider&rsquo;s key-value
                store). We keep them until you ask us to delete them, or, for the newsletter, until you unsubscribe.
              </li>
              <li className="text-body-lg">
                If we connect an email provider (Buttondown) to send the newsletter, your email is also stored there for
                that purpose.
              </li>
              <li className="text-body-lg">
                If automatic GitHub review is enabled, a fix submission may be opened as a public GitHub issue for
                review. That issue includes the fix and your name and optional link (your attribution), but{" "}
                <span className="font-semibold text-[color:var(--ink)]">not your email</span>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="section-title">On your device</h2>
            <p className="text-body-lg mt-3">
              The site saves a few things in your browser&rsquo;s local storage so features work: your workflow
              progress, saved items, votes, and any Cookbook PRD draft. This data stays on your device and is never sent
              to us. You can clear it anytime, see the{" "}
              <Link href="/cookie-policy" className="vp-link">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="section-title">Who it is shared with</h2>
            <p className="text-body-lg mt-3">
              We don&rsquo;t sell data or run ads. Data is only handled by the services that run the site: Vercel
              (hosting and analytics), and, where enabled, Buttondown (newsletter email) and GitHub (public fix review).
              Some tool icons are loaded from DuckDuckGo, which means your browser&rsquo;s IP reaches them to fetch the
              image, the same as loading any image on the web.
            </p>
          </section>

          <section>
            <h2 className="section-title">Delete your data</h2>
            <p className="text-body-lg mt-3">
              Email{" "}
              <a href={`mailto:${CONTACT}`} className="vp-link">
                {CONTACT}
              </a>{" "}
              and we will, within a reasonable time:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="text-body-lg">unsubscribe you from the newsletter (every email also has an unsubscribe link);</li>
              <li className="text-body-lg">delete your email address;</li>
              <li className="text-body-lg">delete a fix you submitted;</li>
              <li className="text-body-lg">remove your name or link from a published fix.</li>
            </ul>
          </section>

          <section>
            <h2 className="section-title">Contact</h2>
            <p className="text-body-lg mt-3">
              Questions about any of this:{" "}
              <a href={`mailto:${CONTACT}`} className="vp-link">
                {CONTACT}
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
