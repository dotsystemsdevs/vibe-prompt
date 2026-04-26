import type { ParsedPage } from "./types";

type HtmlParsed = Omit<ParsedPage, "hasCSP" | "hasHSTS" | "hasXFrameOptions" | "hasXContentTypeOptions" | "hasReferrerPolicy" | "robotsBlocksAICrawlers" | "hasLlmsTxt">;

function getMetaContent(html: string, name: string): string {
  const pats = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]*name=["']${name}["']`, "i"),
  ];
  for (const p of pats) {
    const m = html.match(p);
    if (m?.[1] !== undefined) return m[1];
  }
  return "";
}

function getMetaProperty(html: string, prop: string): string {
  const pats = [
    new RegExp(`<meta[^>]+property=["']${prop}["'][^>]*content=["']([^"']*?)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]*property=["']${prop}["']`, "i"),
  ];
  for (const p of pats) {
    const m = html.match(p);
    if (m?.[1] !== undefined) return m[1];
  }
  return "";
}

export function parseHtml(html: string): HtmlParsed {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = (titleMatch?.[1] ?? "").replace(/<[^>]+>/g, "").trim();
  const metaDescription = getMetaContent(html, "description");

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);

  const imgMatches = [...html.matchAll(/<img[^>]+>/gi)];
  const totalImages = imgMatches.length;
  const imagesWithoutAlt = imgMatches.filter((m) => {
    const alt = m[0].match(/\balt\s*=\s*["']([^"']*)["']/i);
    return !alt || alt[1].trim() === "";
  }).length;
  const imagesWithoutLazy = imgMatches.filter((m) => !/loading\s*=\s*["']lazy["']/i.test(m[0])).length;

  const realButtons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)];
  const CTA_CLASS = /\b(?:btn|button|cta|action|primary|hero.?cta|call.?to.?action)\b/i;
  const CTA_TEXT = /^(get started|start free|sign up|try free|try it|buy now|subscribe|join now|download|book a demo|schedule|request demo|get a demo|upgrade|claim|launch|install)\b/i;
  const linkMatches = [...html.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)];
  const buttonLikeLinks = linkMatches.filter((m) => {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    return CTA_CLASS.test(m[0]) || /role\s*=\s*["']button["']/i.test(m[0]) || CTA_TEXT.test(text);
  });
  const realButtonCount = realButtons.length;
  const buttonCount = realButtons.length + buttonLikeLinks.length;
  const buttonTexts = [
    ...realButtons.map((m) => m[1].replace(/<[^>]+>/g, "").trim()),
    ...buttonLikeLinks.map((m) => m[1].replace(/<[^>]+>/g, "").trim()),
  ].filter(Boolean);
  const uniqueCtaCount = new Set(
    buttonTexts.map((t) => t.toLowerCase().replace(/\s+/g, " ").trim()).filter(Boolean)
  ).size;

  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const externalBlankLinks = linkMatches.filter((m) => {
    return /target\s*=\s*["']_blank["']/i.test(m[0])
      && /href\s*=\s*["']https?:\/\//i.test(m[0])
      && !/noopener/i.test(m[0]);
  }).length;
  const emptyLinks = linkMatches.filter((m) => {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    return text.length === 0
      && !/aria-label\s*=\s*["'][^"']+["']/i.test(m[0])
      && !/\btitle\s*=\s*["'][^"']+["']/i.test(m[0]);
  }).length;

  const hasNav = /<nav[\s>]/i.test(html);
  const hasFooter = /<footer[\s>]/i.test(html);
  const hasMain = /<main[\s>]/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);
  const hasStructuredData = /type=["']application\/ld\+json["']/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);
  const hasFavicon = /<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/i.test(html);
  const hasForm = /<form[\s>]/i.test(html) || /<input[^>]+type=["']email["']/i.test(html);
  const hasFaq = /\bfaq\b|frequently asked|common questions/i.test(html);

  const ogTitle = getMetaProperty(html, "og:title");
  const ogDescription = getMetaProperty(html, "og:description");
  const ogImage = getMetaProperty(html, "og:image");

  const renderBlockingScripts = [...html.matchAll(/<script[^>]+src=["'][^"']+["'][^>]*>/gi)]
    .filter((m) => !/\bdefer\b|\basync\b/i.test(m[0])).length;

  const BUZZWORD_RE = /\b(powerful|seamless|intuitive|revolutionary|game.changing|cutting.edge|next.gen|next.generation|best.in.class|world.class|innovative|state.of.the.art|robust|scalable|disruptive|synergy|bleeding.edge|frictionless|paradigm)\b/gi;
  const buzzwordCount = (html.match(BUZZWORD_RE) ?? []).length;

  const rawText = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const isSPA = rawText.length < 600;

  const hasFaqSchema = /"@type"\s*:\s*["'](?:FAQPage|HowTo)["']/i.test(html);
  const hasTwitterCard = /<meta[^>]+name=["']twitter:card["'][^>]*>/i.test(html);
  const allHeadings = [...h2s, ...h3s];
  const hasQuestionHeadings = allHeadings.some((h) =>
    /^(what|how|why|can|is|are|do|does|when|where|who|which)\b/i.test(h)
  );

  return {
    title, metaDescription, h1s, h2s, h3s,
    buttonCount, realButtonCount, uniqueCtaCount, buttonTexts, isSPA,
    totalImages, imagesWithoutAlt, imagesWithoutLazy,
    links, externalBlankLinks, emptyLinks,
    hasNav, hasFooter, hasMain, hasCanonical, hasStructuredData,
    hasViewport, hasFavicon, hasForm, hasFaq,
    ogTitle, ogDescription, ogImage,
    renderBlockingScripts, buzzwordCount, rawText,
    hasFaqSchema, hasTwitterCard, hasQuestionHeadings,
  };
}

export function checkSecurityHeaders(headers: Headers): Pick<ParsedPage, "hasCSP" | "hasHSTS" | "hasXFrameOptions" | "hasXContentTypeOptions" | "hasReferrerPolicy"> {
  return {
    hasCSP: !!headers.get("content-security-policy"),
    hasHSTS: !!headers.get("strict-transport-security"),
    hasXFrameOptions: !!headers.get("x-frame-options"),
    hasXContentTypeOptions: headers.get("x-content-type-options")?.toLowerCase().includes("nosniff") ?? false,
    hasReferrerPolicy: !!headers.get("referrer-policy"),
  };
}

export async function checkExternalFiles(origin: string): Promise<Pick<ParsedPage, "robotsBlocksAICrawlers" | "hasLlmsTxt">> {
  const AC = new AbortController();
  const t = setTimeout(() => AC.abort(), 4000);
  const AC2 = new AbortController();
  const t2 = setTimeout(() => AC2.abort(), 4000);

  const AI_AGENT = /^User-agent:\s*(GPTBot|ClaudeBot|anthropic-ai|PerplexityBot|CCBot|cohere-ai|ChatGPT-User)/im;
  const DISALLOW_ROOT = /^Disallow:\s*\/\s*$/m;

  const [robotsRes, llmsRes] = await Promise.allSettled([
    fetch(`${origin}/robots.txt`, { signal: AC.signal, cache: "no-store" }),
    fetch(`${origin}/llms.txt`, { signal: AC2.signal, cache: "no-store" }),
  ]);
  clearTimeout(t); clearTimeout(t2);

  let robotsBlocksAICrawlers = false;
  if (robotsRes.status === "fulfilled" && robotsRes.value.ok) {
    const txt = await robotsRes.value.text().catch(() => "");
    const sections = txt.split(/(?=^User-agent:)/im);
    robotsBlocksAICrawlers = sections.some((s) => AI_AGENT.test(s) && DISALLOW_ROOT.test(s));
  }

  const hasLlmsTxt =
    llmsRes.status === "fulfilled" && llmsRes.value.ok && llmsRes.value.status === 200;

  return { robotsBlocksAICrawlers, hasLlmsTxt };
}
