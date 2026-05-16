import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/next";

const getMetadataBase = () => {
  const fallback = "https://vibeprompt.tech";
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
};

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  title: "vibeprompt — The vibe coding playbook",
  description:
    "A 9-step methodology and 55 battle-tested prompts for shipping with Claude Code, Cursor, and AI coding agents. Free, open source, no login.",
  keywords:
    "vibe coding, vibe coding playbook, AI coding workflow, Claude Code prompts, Cursor prompts, prompt library, AI development methodology",
  metadataBase: getMetadataBase(),
  alternates: { canonical: "https://vibeprompt.tech" },
  openGraph: {
    title: "vibeprompt — The vibe coding playbook",
    description:
      "A 9-step methodology and 55 battle-tested prompts for shipping with AI coding agents. Free and open source.",
    siteName: "vibeprompt",
    type: "website",
    url: "https://vibeprompt.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibeprompt — The vibe coding playbook",
    description:
      "9-step methodology + 55 prompts for shipping with Claude Code, Cursor & AI agents. Free, open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <script defer src="https://tracker-mauve-sigma.vercel.app/t.js" data-project="vibeprompt" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
