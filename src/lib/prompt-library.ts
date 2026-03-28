import "server-only";

import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import type { Category, Prompt } from "@/lib/types";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

const PROMPTS_ROOT = path.join(process.cwd(), "prompt-library");

const SECTION_HEADERS = [
  "Purpose",
  "Input",
  "Instructions",
  "Output Format",
  "Quality Criteria",
  "Variants",
] as const;

const GLOBAL_SEARCH_TAGS: string[] = [];

const TAG_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "from",
  "full",
  "in",
  "into",
  "of",
  "on",
  "or",
  "same",
  "side",
  "small",
  "smart",
  "the",
  "to",
  "with",
  "first",
  "more",
  "new",
  "core",
]);

const TAG_ALIASES: Record<string, string> = {
  ai: "ai",
  app: "app",
  architecture: "architecture",
  brief: "brief",
  build: "build",
  clarify: "clarity",
  code: "code",
  decision: "decision",
  delivery: "delivery",
  development: "development",
  error: "errors",
  flow: "flow",
  gates: "gates",
  happy: "journey",
  idea: "idea",
  large: "large",
  multi: "multi",
  path: "paths",
  persist: "persistence",
  pivot: "pivot",
  plan: "planning",
  prd: "prd",
  product: "product",
  project: "project",
  requirements: "requirements",
  research: "research",
  scope: "scope",
  spec: "spec",
  stop: "stop",
  tasks: "tasks",
  universal: "universal",
};

const CATEGORY_TAGS: Record<string, string[]> = {
  "prd-core": ["prd", "planning", "mvp"],
  "build-brief": ["brief", "planning", "saas"],
  "architecture-stack": ["architecture", "backend", "api"],
  "feature-shipping": ["shipping", "features", "webapp"],
  "testing-release": ["testing", "release", "qa"],
  "launch-growth": ["launch", "growth", "marketing"],
  "ops-maintenance": ["ops", "maintenance", "deployment"],
};

const SEARCH_KEYWORD_TAGS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /\bsaas\b/i, tag: "saas" },
  { pattern: /\bwebsite\b|\bweb site\b/i, tag: "website" },
  { pattern: /\bweb[-\s]?app\b/i, tag: "webapp" },
  { pattern: /\bmobile\b|\bmobile[-\s]?app\b/i, tag: "mobile" },
  { pattern: /\bapi\b|\brest\b|\bgraphql\b/i, tag: "api" },
  { pattern: /\bbackend\b/i, tag: "backend" },
  { pattern: /\bfrontend\b/i, tag: "frontend" },
  { pattern: /\bopen[-\s]?source\b/i, tag: "opensource" },
  { pattern: /\bautomation\b/i, tag: "automation" },
  { pattern: /\bcli\b|\btooling\b/i, tag: "tooling" },
  { pattern: /\bmvp\b/i, tag: "mvp" },
  { pattern: /\bprd\b|\brequirements?\b/i, tag: "prd" },
  { pattern: /\btesting?\b|\bqa\b/i, tag: "testing" },
  { pattern: /\bsecurity\b/i, tag: "security" },
  { pattern: /\bdeploy(?:ment)?\b|\bhosting\b/i, tag: "deployment" },
  { pattern: /\blaunch\b|\bgrowth\b/i, tag: "growth" },
  { pattern: /\bui\b|\bux\b|\bdesign\b/i, tag: "uiux" },
];

function extractSection(content: string, section: string): string {
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i");
  const match = content.match(re);
  return match?.[1]?.trim() ?? "";
}

function firstParagraph(text: string): string {
  const normalized = text.trim();
  if (!normalized) return "";
  const split = normalized.split(/\n\s*\n/);
  return split[0]?.replace(/\s+/g, " ").trim() ?? "";
}

function normalizeTitleText(value: string): string {
  return value
    .replace(/\bAi\b/g, "AI")
    .replace(/\bPrd\b/g, "PRD")
    .replace(/\bApi\b/g, "API")
    .replace(/\bUi\b/g, "UI")
    .replace(/\bUx\b/g, "UX")
    .replace(/\bMvp\b/g, "MVP")
    .replace(/\bSaas\b/g, "SaaS");
}

function titleFromFileName(fileName: string): string {
  const formatted = fileName
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return normalizeTitleText(formatted);
}

function normalizedTokensFromFileName(fileName: string): string[] {
  return fileName
    .replace(/\.md$/i, "")
    .split(/[-_]+/g)
    .map((token) => token.toLowerCase().trim())
    .filter((token) => token.length > 2 && !TAG_STOP_WORDS.has(token))
    .map((token) => TAG_ALIASES[token] ?? token);
}

function tagsFromSearchKeywords(input: string): string[] {
  return SEARCH_KEYWORD_TAGS.filter((item) => item.pattern.test(input)).map((item) => item.tag);
}

function buildTags(categorySlug: string, fileName: string, content: string): string[] {
  const categoryTags = CATEGORY_TAGS[categorySlug] ?? [];
  const fileTags = normalizedTokensFromFileName(fileName);
  const semanticTags = tagsFromSearchKeywords(`${fileName}\n${content}`);
  const merged = [...GLOBAL_SEARCH_TAGS, ...categoryTags, ...fileTags, ...semanticTags];
  return [...new Set(merged)].slice(0, 6);
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function buildPromptText(content: string): string {
  const sections = SECTION_HEADERS.map((header) => {
    const sectionContent = extractSection(content, header);
    if (!sectionContent) return "";
    return `${header}:\n${sectionContent}`;
  }).filter(Boolean);

  return sections.length > 0 ? sections.join("\n\n") : content.trim();
}

async function readPromptFile(
  categorySlug: string,
  categoryName: string,
  absolutePath: string,
  fileName: string
): Promise<Prompt> {
  const content = await fs.readFile(absolutePath, "utf8");
  const stats = await fs.stat(absolutePath);
  const fileBasedTitle = titleFromFileName(fileName);
  const title = fileBasedTitle;
  const purpose = extractSection(content, "Purpose");
  const whenToUse = firstParagraph(extractSection(content, "Input")) || "Use before implementation for structured execution.";
  const promptText = buildPromptText(content);
  const slug = `${categorySlug}-${fileName.replace(/\.md$/i, "").toLowerCase()}`;
  const popularitySeed = hashString(slug);

  return {
    slug,
    title,
    category: categorySlug,
    categoryName,
    tags: buildTags(categorySlug, fileName, content),
    difficulty: "intermediate",
    tools: ["claude-code", "cursor", "codex"],
    author: "vibeprompt",
    useCase: firstParagraph(purpose) || "Shipping-focused prompt for real product work.",
    whenToUse,
    prompt: promptText,
    notes: "Source: Shipping Prompt Playbook",
    upvotes: 20 + (popularitySeed % 220),
    commentCount: popularitySeed % 35,
    createdAt: stats.mtime.toISOString().slice(0, 10),
  };
}

export const getPromptLibrary = cache(async (): Promise<{ categories: Category[]; prompts: Prompt[] }> => {
  const prompts: Prompt[] = [];
  const categories: Category[] = [];

  for (const categoryDef of CATEGORY_DEFINITIONS) {
    const categoryPath = path.join(PROMPTS_ROOT, categoryDef.dirName);
    let entries: string[] = [];

    try {
      entries = await fs.readdir(categoryPath);
    } catch {
      entries = [];
    }

    const markdownFiles = entries
      .filter((entry) => entry.toLowerCase().endsWith(".md") && !entry.toLowerCase().startsWith("readme"))
      .sort((a, b) => a.localeCompare(b));

    const categoryPrompts = await Promise.all(
      markdownFiles.map((fileName) =>
        readPromptFile(categoryDef.slug, categoryDef.name, path.join(categoryPath, fileName), fileName)
      )
    );

    prompts.push(...categoryPrompts);

    categories.push({
      slug: categoryDef.slug,
      name: categoryDef.name,
      description: categoryDef.description,
      icon: categoryDef.icon,
      count: categoryPrompts.length,
    });
  }

  return { categories, prompts };
});

export async function getPromptBySlug(slug: string): Promise<Prompt | undefined> {
  const { prompts } = await getPromptLibrary();
  return prompts.find((prompt) => prompt.slug === slug);
}

