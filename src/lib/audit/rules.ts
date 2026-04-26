import type { Rule } from "./types";

const WEAK_CTA = /^(submit|click here|click|read more|more|here|go|ok|yes|send|continue|next|proceed)$/i;
const SOCIAL_PROOF = /testimonial|review|rated|stars|customers|clients|users|trusted by|loved by|featured in|as seen in|5\/5|4\.5|★/i;
const PRICING = /pricing|price|plans?|per month|\/month|\/mo|\$\d|\€\d|free tier|free plan|upgrade/i;
const PRIVACY = /privacy|terms of service|cookie policy|legal/i;

export const RULES: Rule[] = [
  // ── SPA banner ──
  // Score impact 0, just informs the user. Many other rules below skip on SPAs because
  // a static scan literally can't see content rendered by JavaScript. This finding
  // surfaces that limitation at the top of the report so the score isn't read in a vacuum.
  {
    id: "spa_detected", category: "structure", severity: "high", effort: "involved",
    title: "Page renders client-side, scan results limited",
    description: "This page returned almost no static HTML. Most content is rendered by JavaScript after the page loads. Static SEO scanners (this one and Google's first-pass crawler) see the empty shell, not the final UI. Many findings below may be inaccurate, and rules that check for client-rendered content are skipped.",
    fix: "Use server-side rendering (SSR) or static generation (SSG). Frameworks like Next.js, Remix, and Astro do this by default. Critical for SEO, AI search engines, and social link previews.",
    scoreImpact: 0, check: (p) => p.isSPA,
  },

  // ── SEO ──
  {
    id: "seo_no_h1", category: "seo", severity: "high", effort: "moderate",
    title: "Missing H1 heading",
    description: "No H1 tag found. Search engines use H1 to understand your page's main topic.",
    fix: "Add a single, descriptive H1 that clearly states what the page is about.",
    scoreImpact: 10, check: (p) => p.h1s.length === 0 && !p.isSPA,
  },
  {
    id: "seo_multiple_h1", category: "seo", severity: "medium", effort: "quick",
    title: "Multiple H1 headings",
    description: "Multiple H1 tags found. This dilutes your SEO signal and confuses page structure.",
    fix: "Keep exactly one H1 per page. Convert the rest to H2 or H3.",
    scoreImpact: 5, check: (p) => p.h1s.length > 1,
  },
  {
    id: "seo_no_meta_desc", category: "seo", severity: "high", effort: "quick",
    title: "Missing meta description",
    description: "No meta description found. Search engines use this as the snippet in search results.",
    fix: "Add a meta description of 120–160 characters that summarizes the page with a call to action.",
    scoreImpact: 8, check: (p) => p.metaDescription.length === 0,
  },
  {
    id: "seo_meta_desc_too_long", category: "seo", severity: "low", effort: "quick",
    title: "Meta description too long",
    description: "Meta description exceeds 160 characters and will be truncated in search results.",
    fix: "Shorten your meta description to under 160 characters.",
    scoreImpact: 3, check: (p) => p.metaDescription.length > 160,
  },
  {
    id: "seo_meta_desc_short", category: "seo", severity: "low", effort: "quick",
    title: "Meta description too short",
    description: "Meta description is under 50 characters, too brief to be useful in search results.",
    fix: "Expand your meta description to 120–160 characters. Include your core value proposition.",
    scoreImpact: 3, check: (p) => p.metaDescription.length > 0 && p.metaDescription.length < 50,
  },
  {
    id: "seo_no_title", category: "seo", severity: "high", effort: "quick",
    title: "Missing page title",
    description: "No <title> tag found. This is critical for SEO and browser tab display.",
    fix: "Add a descriptive <title> tag of 50–60 characters including your main keyword.",
    scoreImpact: 8, check: (p) => p.title.length === 0,
  },
  {
    id: "seo_title_too_long", category: "seo", severity: "low", effort: "quick",
    title: "Page title too long",
    description: "Title exceeds 60 characters and will be cut off in Google search results.",
    fix: "Shorten your title to under 60 characters. Put the most important keyword first.",
    scoreImpact: 3, check: (p) => p.title.length > 60,
  },
  {
    id: "seo_no_canonical", category: "seo", severity: "low", effort: "quick",
    title: "No canonical URL",
    description: "Missing canonical link. Search engines may index duplicate versions of your page.",
    fix: "Add <link rel='canonical' href='your-url'> in the <head>.",
    scoreImpact: 4, check: (p) => !p.hasCanonical,
  },
  {
    id: "seo_no_favicon", category: "seo", severity: "low", effort: "quick",
    title: "No favicon",
    description: "No favicon found. Missing favicons reduce brand recognition in browser tabs and bookmarks.",
    fix: "Add <link rel='icon' href='/favicon.ico'> (or .svg/.png) in the <head>.",
    scoreImpact: 3, check: (p) => !p.hasFavicon,
  },

  // ── Conversion ──
  {
    id: "conv_no_cta", category: "conversion", severity: "medium", effort: "involved",
    title: "No CTA buttons detected",
    description: "No buttons or action-oriented links found in the static HTML. Visitors may not know what to do next.",
    fix: "Add at least one visible CTA above the fold. Use a <button> or <a> with a btn/cta class and action verbs like 'Get started' or 'Try free'.",
    scoreImpact: 10, check: (p) => p.buttonCount === 0 && !p.isSPA,
  },
  {
    id: "conv_weak_cta", category: "conversion", severity: "medium", effort: "quick",
    title: "Weak CTA copy",
    description: "One or more buttons use generic text like 'Submit' or 'Click here' which reduces click-through rates.",
    fix: "Replace generic text with value-driven copy: 'Start for free', 'See how it works', 'Get my report'.",
    scoreImpact: 6, check: (p) => p.buttonTexts.some((b) => WEAK_CTA.test(b)),
  },
  {
    id: "conv_h1_too_long", category: "conversion", severity: "low", effort: "quick",
    title: "Hero headline too long",
    description: "Main H1 exceeds 80 characters. Long headlines reduce impact above the fold.",
    fix: "Trim your H1 to under 70 characters. Move secondary info to a subtitle.",
    scoreImpact: 4, check: (p) => p.h1s.some((h) => h.length > 80),
  },
  {
    id: "conv_no_social_proof", category: "conversion", severity: "medium", effort: "involved",
    title: "No social proof detected",
    description: "No testimonials, reviews, or trust signals found. Social proof increases conversions by 15–40%.",
    fix: "Add 2–3 customer testimonials, a star rating, or company logos near your main CTA.",
    scoreImpact: 8, check: (p) => !SOCIAL_PROOF.test(p.rawText) && !p.isSPA,
  },
  {
    id: "conv_no_pricing", category: "conversion", severity: "low", effort: "involved",
    title: "No pricing information",
    description: "No pricing or plan mentions found. Visitors who can't find pricing tend to leave.",
    fix: "Add a pricing section or at least mention 'free', 'pricing', or a starting price visibly.",
    scoreImpact: 5, check: (p) => !PRICING.test(p.rawText) && !p.isSPA,
  },
  {
    id: "conv_too_many_cta", category: "conversion", severity: "medium", effort: "moderate",
    title: "Too many competing CTAs",
    description: "More than 5 distinct action buttons detected. Too many different choices create decision paralysis. Note: the same CTA repeated in header, hero, and footer counts as one.",
    fix: "Consolidate to 1 primary CTA per section. Demote secondary actions to text links.",
    scoreImpact: 5, check: (p) => p.uniqueCtaCount > 5,
  },
  {
    id: "conv_no_form", category: "conversion", severity: "low", effort: "moderate",
    title: "No inline email capture",
    description: "No form or email input found. Capturing emails directly on the page converts better than linking to a separate signup page.",
    fix: "Add an email input in the hero, even a single field with 'Get early access' increases conversion.",
    scoreImpact: 3, check: (p) => !p.hasForm && !p.isSPA,
  },
  {
    id: "conv_no_faq", category: "conversion", severity: "low", effort: "moderate",
    title: "No FAQ section",
    description: "No FAQ section detected. FAQs reduce pre-purchase anxiety and capture long-tail SEO queries.",
    fix: "Add an FAQ section answering the top 4–6 questions visitors have before converting.",
    scoreImpact: 4, check: (p) => !p.hasFaq && !p.isSPA,
  },
  {
    id: "conv_buzzwords", category: "conversion", severity: "low", effort: "quick",
    title: "Heavy buzzword usage",
    description: "Vague words like 'powerful', 'seamless', or 'innovative' detected multiple times. They reduce credibility.",
    fix: "Replace buzzwords with specific, measurable claims. Not 'powerful tool' but 'saves 4 hours per week'.",
    scoreImpact: 4, check: (p) => p.buzzwordCount > 4,
  },

  // ── Trust ──
  {
    id: "trust_no_og", category: "trust", severity: "medium", effort: "quick",
    title: "Missing Open Graph tags",
    description: "No og:title or og:description found. Social shares will look broken or generic.",
    fix: "Add og:title, og:description, and og:image meta tags in the <head>.",
    scoreImpact: 6, check: (p) => !p.ogTitle && !p.ogDescription,
  },
  {
    id: "trust_no_og_image", category: "trust", severity: "low", effort: "quick",
    title: "Missing OG image",
    description: "No og:image tag found. Social shares will show no image, hurting click-through rates.",
    fix: "Add <meta property='og:image'> with a 1200×630px image.",
    scoreImpact: 4, check: (p) => !p.ogImage,
  },
  {
    id: "trust_images_no_alt", category: "trust", severity: "medium", effort: "quick",
    title: "Images missing alt text",
    description: "One or more images have no alt attribute. This hurts accessibility and image SEO.",
    fix: "Add descriptive alt attributes to all content images. Use alt='' for decorative ones.",
    scoreImpact: 5, check: (p) => p.totalImages > 0 && p.imagesWithoutAlt > 0,
  },
  {
    id: "trust_no_structured_data", category: "trust", severity: "low", effort: "moderate",
    title: "No structured data",
    description: "No JSON-LD found. Structured data unlocks rich results in Google Search.",
    fix: "Add JSON-LD markup using schema.org types (Organization, Product, FAQ).",
    scoreImpact: 4, check: (p) => !p.hasStructuredData,
  },
  {
    id: "trust_no_privacy", category: "trust", severity: "medium", effort: "moderate",
    title: "No privacy or terms link",
    description: "No privacy policy or terms of service link detected. This reduces trust and may violate regulations.",
    fix: "Add links to your privacy policy and terms of service in the footer.",
    scoreImpact: 5,
    check: (p) => {
      if (p.isSPA) return false;
      const footerArea = p.rawText.slice(-3000).toLowerCase();
      const allLinks = p.links.join(" ").toLowerCase();
      return !PRIVACY.test(footerArea) && !PRIVACY.test(allLinks);
    },
  },
  {
    id: "trust_blank_no_noopener", category: "trust", severity: "medium", effort: "quick",
    title: "External links missing rel=noopener",
    description: "Links with target='_blank' are missing rel='noopener noreferrer'. This exposes users to tab-napping attacks.",
    fix: "Add rel='noopener noreferrer' to all <a target='_blank'> links.",
    scoreImpact: 4, check: (p) => p.externalBlankLinks > 0,
  },

  // ── Structure ──
  {
    id: "struct_no_viewport", category: "structure", severity: "high", effort: "quick",
    title: "Missing viewport meta tag",
    description: "No viewport meta tag. Your page won't render correctly on mobile devices.",
    fix: "Add <meta name='viewport' content='width=device-width, initial-scale=1'> to the <head>.",
    scoreImpact: 7, check: (p) => !p.hasViewport,
  },
  {
    id: "struct_no_nav", category: "structure", severity: "medium", effort: "quick",
    title: "No <nav> element",
    description: "No <nav> element found. Navigation helps users and search engines understand your site.",
    fix: "Wrap your navigation links in a <nav> element with an aria-label.",
    scoreImpact: 6, check: (p) => !p.hasNav && !p.isSPA,
  },
  {
    id: "struct_no_main", category: "structure", severity: "medium", effort: "quick",
    title: "No <main> landmark",
    description: "No <main> element. Screen readers and search engines use <main> to identify primary content.",
    fix: "Wrap your page's primary content in a <main> element.",
    scoreImpact: 4, check: (p) => !p.hasMain && !p.isSPA,
  },
  {
    id: "struct_no_footer", category: "structure", severity: "low", effort: "moderate",
    title: "No <footer> element",
    description: "No <footer> element. Footers provide important navigation, trust signals, and legal links.",
    fix: "Add a <footer> with contact info, nav links, and legal pages.",
    scoreImpact: 4, check: (p) => !p.hasFooter && !p.isSPA,
  },
  {
    id: "struct_heading_skip", category: "structure", severity: "low", effort: "quick",
    title: "Heading levels skipped",
    description: "H1 jumps to H3 with no H2. This breaks document outline and screen reader navigation.",
    fix: "Use headings in order: H1 → H2 → H3. Use CSS for visual sizing, not heading levels.",
    scoreImpact: 3, check: (p) => p.h1s.length > 0 && p.h3s.length > 0 && p.h2s.length === 0,
  },
  {
    id: "struct_empty_links", category: "structure", severity: "medium", effort: "quick",
    title: "Links with no accessible text",
    description: "One or more links have no text and no aria-label. Screen readers can't describe them.",
    fix: "Add descriptive text or aria-label to all <a> elements, especially icon-only links.",
    scoreImpact: 4, check: (p) => p.emptyLinks > 0,
  },

  // ── Performance ──
  {
    id: "perf_render_blocking", category: "performance", severity: "medium", effort: "quick",
    title: "Render-blocking scripts",
    description: "External <script src> tags found without defer or async. These block page rendering until fully downloaded.",
    fix: "Add defer or async to all non-critical external scripts. Use defer for scripts that need the DOM.",
    scoreImpact: 7, check: (p) => p.renderBlockingScripts > 0,
  },
  {
    id: "perf_no_lazy_images", category: "performance", severity: "low", effort: "quick",
    title: "Images not lazy-loaded",
    description: "Images found without loading='lazy'. Off-screen images load on page load, slowing initial render.",
    fix: "Add loading='lazy' to all <img> tags below the fold. Keep loading='eager' only on the hero image.",
    scoreImpact: 5, check: (p) => p.totalImages > 2 && p.imagesWithoutLazy > 1,
  },
  {
    id: "perf_no_hints", category: "performance", severity: "low", effort: "quick",
    title: "No resource hints",
    description: "No <link rel='preconnect'> or <link rel='preload'> found. Critical resources load later than necessary.",
    fix: "Add preconnect hints for external domains (fonts, APIs). Add preload for your hero image and main font.",
    scoreImpact: 4,
    check: (p) => !/<link[^>]+rel=["'](?:preconnect|preload|dns-prefetch)["']/i.test(p.rawText) && p.totalImages > 0,
  },

  // ── AEO ──
  {
    id: "aeo_ai_blocked", category: "aeo", severity: "high", effort: "quick",
    title: "AI crawlers blocked in robots.txt",
    description: "GPTBot, ClaudeBot, or PerplexityBot are disallowed. Your site won't be indexed by ChatGPT, Claude, or Perplexity search.",
    fix: "Remove or update the Disallow rule for GPTBot, ClaudeBot, anthropic-ai, and PerplexityBot in robots.txt. Or add explicit Allow: / rules for each.",
    scoreImpact: 9, check: (p) => p.robotsBlocksAICrawlers,
  },
  {
    id: "aeo_no_llms_txt", category: "aeo", severity: "medium", effort: "quick",
    title: "No llms.txt file",
    description: "No /llms.txt found. This emerging standard helps AI tools understand what your site is about and how to cite it.",
    fix: "Create /public/llms.txt with a brief description of your site, its purpose, and links to key pages. See llmstxt.org for the spec.",
    scoreImpact: 5, check: (p) => !p.hasLlmsTxt,
  },
  {
    id: "aeo_no_faq_schema", category: "aeo", severity: "medium", effort: "moderate",
    title: "No FAQ or HowTo structured data",
    description: "No FAQPage or HowTo JSON-LD found. These unlock rich results in Google and make content directly citable by AI search engines.",
    fix: "Add a FAQPage schema block to your FAQ section. Each question/answer pair becomes a potential AI citation.",
    scoreImpact: 6, check: (p) => !p.hasFaqSchema,
  },
  {
    id: "aeo_no_question_headings", category: "aeo", severity: "low", effort: "moderate",
    title: "No question-style headings",
    description: "None of your H2/H3 headings are phrased as questions. AI search engines prefer content that directly answers questions.",
    fix: "Rephrase 2–3 section headings as questions: 'What is X?', 'How does Y work?', 'Why should I Z?'",
    scoreImpact: 4, check: (p) => !p.hasQuestionHeadings && !p.isSPA,
  },
  {
    id: "aeo_no_twitter_card", category: "aeo", severity: "low", effort: "quick",
    title: "No Twitter Card meta tags",
    description: "No twitter:card tag found. Links shared on X/Twitter will show no preview image or description.",
    fix: "Add <meta name='twitter:card' content='summary_large_image'> plus twitter:title, twitter:description, twitter:image.",
    scoreImpact: 3, check: (p) => !p.hasTwitterCard,
  },

  // ── Security ──
  {
    id: "sec_no_csp", category: "security", severity: "high", effort: "moderate",
    title: "Missing Content-Security-Policy",
    description: "No CSP header found. Without it, any injected script can access cookies, session tokens, and DOM data. XSS attacks bypass client-side defenses entirely.",
    fix: "Add a Content-Security-Policy header. Start with: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'. Tighten iteratively.",
    scoreImpact: 8, check: (p) => !p.hasCSP,
  },
  {
    id: "sec_no_hsts", category: "security", severity: "high", effort: "quick",
    title: "Missing Strict-Transport-Security",
    description: "No HSTS header found. Without it, browsers may connect over HTTP first, exposing users to downgrade attacks.",
    fix: "Add: Strict-Transport-Security: max-age=31536000; includeSubDomains to your server config or Next.js headers.",
    scoreImpact: 6, check: (p) => !p.hasHSTS,
  },
  {
    id: "sec_no_x_frame", category: "security", severity: "medium", effort: "quick",
    title: "Missing X-Frame-Options",
    description: "No X-Frame-Options header. Your page can be embedded in an iframe, enabling clickjacking attacks.",
    fix: "Add: X-Frame-Options: SAMEORIGIN (or DENY if you never need iframes).",
    scoreImpact: 5, check: (p) => !p.hasXFrameOptions,
  },
  {
    id: "sec_no_x_content_type", category: "security", severity: "medium", effort: "quick",
    title: "Missing X-Content-Type-Options",
    description: "No nosniff header found. Browsers may MIME-sniff responses, interpreting a text file as executable script.",
    fix: "Add: X-Content-Type-Options: nosniff",
    scoreImpact: 4, check: (p) => !p.hasXContentTypeOptions,
  },
  {
    id: "sec_no_referrer_policy", category: "security", severity: "low", effort: "quick",
    title: "Missing Referrer-Policy",
    description: "No Referrer-Policy header. Full URLs (including tokens or paths) may leak to third-party sites via the Referer header.",
    fix: "Add: Referrer-Policy: strict-origin-when-cross-origin",
    scoreImpact: 3, check: (p) => !p.hasReferrerPolicy,
  },
];
