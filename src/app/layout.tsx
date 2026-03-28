import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getMetadataBase = () => {
  const fallback = "https://vibeprompt.dev";
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
};

export const metadata: Metadata = {
  title: "VibePrompt — The open prompt library for builders",
  description:
    "Browse, save, and contribute the prompts that actually ship products. Curated by vibe coders. Powered by GitHub.",
  metadataBase: getMetadataBase(),
  openGraph: {
    title: "VibePrompt — The open prompt library for builders",
    description:
      "Browse, save, and contribute the prompts that actually ship products. Curated by vibe coders. Powered by GitHub.",
    siteName: "VibePrompt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibePrompt — The open prompt library for builders",
    description: "Prompt library and AI workflow playbooks for builders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
