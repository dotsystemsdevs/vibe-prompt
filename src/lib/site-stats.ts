import { LIST_PROBLEMS } from "./list-problems";
import { AWESOME_CATEGORIES } from "./awesome-data";
import { BUILT_WITH_PROJECTS } from "./built-with-data";
import { getPromptLibrary } from "./prompt-library";
import { getAllArticles } from "./articles";

export type SiteStats = {
  fixes: number;
  prompts: number;
  articles: number;
  tools: number;
  apps: number;
};

/** The authority numbers, used on the homepage + Fixes hub. */
export async function getSiteStats(): Promise<SiteStats> {
  const [{ prompts }, articles] = await Promise.all([getPromptLibrary(), getAllArticles()]);
  const tools = AWESOME_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
  return {
    fixes: LIST_PROBLEMS.length,
    prompts: prompts.length,
    articles: articles.length,
    tools,
    apps: BUILT_WITH_PROJECTS.length,
  };
}
