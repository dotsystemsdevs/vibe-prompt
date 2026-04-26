import type { AuditResult, Category, Effort, Finding, ParsedPage } from "./types";
import { RULES } from "./rules";

const ALL_CATEGORIES: Category[] = ["seo", "conversion", "trust", "structure", "performance", "security", "aeo"];

const CATEGORY_LABELS: Record<Category, string> = {
  seo: "SEO",
  conversion: "Conversion",
  trust: "Trust & Social",
  structure: "Structure",
  performance: "Performance",
  security: "Security",
  aeo: "AI / AEO",
};

const EFFORT_SCORE: Record<Effort, number> = { quick: 3, moderate: 2, involved: 1 };

function calcGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

export function runAudit(page: ParsedPage, url: string): AuditResult {
  const findings = RULES.filter((r) => r.check(page)).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ check, ...rest }) => rest as Finding
  );

  const categories = ALL_CATEGORIES.reduce((acc, cat) => {
    const catRules = RULES.filter((r) => r.category === cat);
    const catMax = catRules.reduce((s, r) => s + r.scoreImpact, 0);
    const catLost = findings.filter((f) => f.category === cat).reduce((s, f) => s + f.scoreImpact, 0);
    acc[cat] = {
      score: Math.round(Math.max(10, ((catMax - catLost) / catMax) * 100)),
      label: CATEGORY_LABELS[cat],
    };
    return acc;
  }, {} as Record<Category, { score: number; label: string }>);

  const totalMax = RULES.reduce((s, r) => s + r.scoreImpact, 0);
  const totalLost = findings.reduce((s, f) => s + f.scoreImpact, 0);
  const score = Math.round(Math.max(0, Math.min(100, ((totalMax - totalLost) / totalMax) * 100)));

  const quickWins = [...findings]
    .filter((f) => f.scoreImpact > 0)
    .sort((a, b) => b.scoreImpact * EFFORT_SCORE[b.effort] - a.scoreImpact * EFFORT_SCORE[a.effort])
    .slice(0, 5);

  return {
    url,
    score,
    grade: calcGrade(score),
    pageTitle: page.title,
    isSPA: page.isSPA,
    categories,
    findings: findings.sort((a, b) => {
      const sev = { high: 0, medium: 1, low: 2 };
      return sev[a.severity] - sev[b.severity];
    }),
    quickWins,
    scannedAt: new Date().toISOString(),
  };
}
