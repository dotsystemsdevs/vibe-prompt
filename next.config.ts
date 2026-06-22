import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  // Images can come from anywhere over HTTPS. Loosened from a strict allowlist
  // because /built-with references favicons from many partner domains and the
  // attack surface for images is low (no script execution).
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://vitals.vercel-insights.com https://*.supabase.co wss://*.supabase.co",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder. A stray package-lock.json in a parent
  // directory was making Next infer the wrong root, which broke module resolution
  // (tailwindcss) and styling. See node_modules/next/.../next-config-js/turbopack.md.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/vs-tools", destination: "/compare", permanent: true },
      { source: "/vs-books", destination: "/compare", permanent: true },
      // Articles folded into Fixes (content lives there now). Preserve link equity.
      { source: "/articles/after-launch-troubleshooting", destination: "/fixes", permanent: true },
      { source: "/articles/taking-payment-as-an-indie-dev", destination: "/fixes", permanent: true },
      { source: "/articles/context-is-everything", destination: "/fixes", permanent: true },
      { source: "/articles/instagram-for-indie-apps", destination: "/fixes", permanent: true },
      { source: "/articles/testflight-and-app-store-publishing", destination: "/fixes", permanent: true },
      { source: "/articles/store-listing-anatomy", destination: "/fixes", permanent: true },
      { source: "/articles/launching-on-google-play", destination: "/fixes", permanent: true },
      { source: "/articles/aso-keywords-that-actually-move-installs", destination: "/fixes", permanent: true },
      { source: "/articles/onboarding-that-actually-converts", destination: "/fixes", permanent: true },
      { source: "/articles/getting-your-first-app-reviews", destination: "/fixes", permanent: true },
      { source: "/articles/closed-testing-on-google-play", destination: "/fixes", permanent: true },
      { source: "/articles/app-store-conversion-rate-deep-dive", destination: "/fixes", permanent: true },
      { source: "/articles/one-shot-myth", destination: "/fixes", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-XSS-Protection", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
