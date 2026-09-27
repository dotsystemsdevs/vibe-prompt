import { promises as fs } from "fs";
import fsSync from "fs";
import path from "path";

export type Prompt = {
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  fileName: string;
  whenToUse: string;
  prompt: string;
};

const CATEGORY_DIRS = [
  "Agent Setup",
  "Architecture Stack",
  "Build Ship",
  "Launch Growth",
  "Ops Maintenance",
  "PRD Spec",
  "Prompting Craft",
  "Research Validate",
  "Testing Quality",
];

export function findPromptRoot(start: string = process.cwd()): string {
  if (process.env.VIBEPROMPT_ROOT && fsSync.existsSync(process.env.VIBEPROMPT_ROOT)) {
    return process.env.VIBEPROMPT_ROOT;
  }
  let dir = start;
  for (let i = 0; i < 10; i += 1) {
    const candidate = path.join(dir, "prompt-library");
    if (fsSync.existsSync(path.join(candidate, "Agent Setup"))) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.join(start, "prompt-library");
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\s*\n?/, "");
}

function parseFrontmatterField(content: string, field: string): string | null {
  const fmMatch = content.match(/^---([\s\S]*?)---/);
  if (!fmMatch) return null;
  const re = new RegExp(`^${field}:\\s*(.+)$`, "mi");
  return fmMatch[1].match(re)?.[1]?.trim() ?? null;
}

function extractSection(content: string, section: string): string {
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`##\\s+${escaped}[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i");
  const match = content.match(re);
  return match?.[1]?.trim() ?? "";
}

function stripOuterCodeFence(text: string): string {
  const match = text.trim().match(/^```(?:\w+)?\r?\n([\s\S]*?)```\s*$/s);
  return match ? match[1].trim() : text;
}

function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function readPrompt(
  categoryDir: string,
  categorySlug: string,
  absolutePath: string,
  fileName: string
): Promise<Prompt> {
  const raw = await fs.readFile(absolutePath, "utf8");
  const content = raw.replace(/\r\n/g, "\n");
  const body = stripFrontmatter(content);

  const frontmatterTitle = parseFrontmatterField(content, "title");
  const title = frontmatterTitle ?? titleFromFileName(fileName);

  const whenToUse = extractSection(body, "When to use").trim();

  let prompt = extractSection(body, "Prompt");
  if (prompt) {
    prompt = stripOuterCodeFence(prompt);
  } else {
    prompt = extractSection(body, "Instructions") || body;
  }

  return {
    slug: `${categorySlug}-${fileName.replace(/\.md$/i, "").toLowerCase()}`,
    title,
    categorySlug,
    categoryName: categoryDir,
    fileName,
    whenToUse,
    prompt,
  };
}

export async function loadLibrary(root?: string): Promise<Prompt[]> {
  const promptRoot = root ?? findPromptRoot();
  const folders = CATEGORY_DIRS;
  const prompts: Prompt[] = [];
  for (const dir of folders) {
    const dirPath = path.join(promptRoot, dir);
    let entries: string[] = [];
    try {
      entries = await fs.readdir(dirPath);
    } catch {
      continue;
    }
    const files = entries
      .filter((e) => e.toLowerCase().endsWith(".md") && !e.toLowerCase().startsWith("readme"))
      .sort((a, b) => a.localeCompare(b));
    const categorySlug = dir.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
    for (const file of files) {
      prompts.push(await readPrompt(dir, categorySlug, path.join(dirPath, file), file));
    }
  }
  return prompts;
}

export function searchPrompts(prompts: Prompt[], query: string): Prompt[] {
  return prompts
    .filter((p) =>
      `${p.title} ${p.categoryName} ${p.whenToUse} ${p.prompt}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}
