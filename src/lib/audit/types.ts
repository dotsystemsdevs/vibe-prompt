export type Severity = "high" | "medium" | "low";
export type Category = "seo" | "conversion" | "trust" | "structure" | "performance" | "security" | "aeo";
export type Effort = "quick" | "moderate" | "involved";

export interface ParsedPage {
  title: string;
  metaDescription: string;
  h1s: string[];
  h2s: string[];
  h3s: string[];
  buttonCount: number;
  realButtonCount: number;
  uniqueCtaCount: number;
  buttonTexts: string[];
  isSPA: boolean;
  totalImages: number;
  imagesWithoutAlt: number;
  imagesWithoutLazy: number;
  links: string[];
  externalBlankLinks: number;
  emptyLinks: number;
  hasNav: boolean;
  hasFooter: boolean;
  hasMain: boolean;
  hasCanonical: boolean;
  hasStructuredData: boolean;
  hasViewport: boolean;
  hasFavicon: boolean;
  hasForm: boolean;
  hasFaq: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  renderBlockingScripts: number;
  buzzwordCount: number;
  rawText: string;
  hasCSP: boolean;
  hasHSTS: boolean;
  hasXFrameOptions: boolean;
  hasXContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  hasFaqSchema: boolean;
  hasQuestionHeadings: boolean;
  hasTwitterCard: boolean;
  robotsBlocksAICrawlers: boolean;
  hasLlmsTxt: boolean;
}

export interface Finding {
  id: string;
  category: Category;
  severity: Severity;
  effort: Effort;
  title: string;
  description: string;
  fix: string;
  scoreImpact: number;
}

export interface AuditResult {
  url: string;
  score: number;
  grade: string;
  pageTitle: string;
  isSPA: boolean;
  categories: Record<Category, { score: number; label: string }>;
  findings: Finding[];
  quickWins: Finding[];
  scannedAt: string;
}

export interface Rule {
  id: string;
  category: Category;
  severity: Severity;
  effort: Effort;
  title: string;
  description: string;
  fix: string;
  scoreImpact: number;
  check: (p: ParsedPage) => boolean;
}
