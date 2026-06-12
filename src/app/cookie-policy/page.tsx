import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Cookie Policy | vibeprompt",
  description:
    "vibeprompt does not use tracking cookies. Analytics is cookieless. The only browser storage is functional localStorage, listed here with how to clear it.",
  alternates: { canonical: "/cookie-policy" },
};

const LOCAL_STORAGE = [
  { key: "vibeprompt-tasks-v1", what: "Which Cookbook steps you have checked off, so your progress survives a refresh." },
];

export default function CookiePolicyPage() {
  return (
    <main>
      <div className="page-shell">
        <PageHeader
          emoji="🍪"
          title="Cookies"
          lede="This site does not use tracking cookies. No ad cookies, no social cookies, no cross-site tracking. There is nothing to consent to, so there is no cookie banner."
        >
          <p className="text-meta mt-2">Last updated June 2026.</p>
        </PageHeader>

        <div className="mt-10 space-y-9">
          <section>
            <h2 className="section-title">Analytics</h2>
            <p className="text-body-lg mt-3">
              We count page views with Vercel Analytics and a self-hosted counter. Both are cookieless: they set no
              cookies and build no profile of you. They measure how many people visit, not who you are.
            </p>
          </section>

          <section>
            <h2 className="section-title">What the site stores in your browser</h2>
            <p className="text-body-lg mt-3">
              Instead of cookies, the Cookbook uses your browser&rsquo;s local storage to remember your progress. It
              stays on your device, is never sent to us, and is only there to make the site work for you:
            </p>
            <div className="mt-5 divide-y divide-[color:var(--ink-rule)] border-y border-[color:var(--ink-rule)]">
              {LOCAL_STORAGE.map((row) => (
                <div key={row.key} className="py-3.5">
                  <p className="font-mono text-[12.5px] text-[color:var(--ink)]">{row.key}</p>
                  <p className="text-body mt-1">{row.what}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="section-title">How to clear it</h2>
            <p className="text-body-lg mt-3">
              Clear it anytime: in your browser, open developer tools, go to Application (or Storage), then Local
              Storage, and delete the entry above, or use your browser&rsquo;s &ldquo;clear site data&rdquo; option
              for this site. Clearing it just resets your Cookbook progress; nothing else happens.
            </p>
          </section>

          <section>
            <h2 className="section-title">Loading icons from elsewhere</h2>
            <p className="text-body-lg mt-3">
              Some tool and link icons are loaded from DuckDuckGo&rsquo;s icon service. Like any image on the web, your
              browser&rsquo;s IP reaches them to fetch the icon. No cookies are set by us in the process.
            </p>
          </section>

          <section>
            <h2 className="section-title">More</h2>
            <p className="text-body-lg mt-3">
              For what personal data the newsletter and Submit a Fix forms collect, see the{" "}
              <Link href="/privacy" className="vp-link">
                Privacy page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 3600;
