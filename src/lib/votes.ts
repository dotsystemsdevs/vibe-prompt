const KEY = "vp_downvotes";

function getAll(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) ?? "{}"); }
  catch { return {}; }
}

export function getDownvotes(slug: string): number {
  return getAll()[slug] ?? 0;
}

export function incrementDownvote(slug: string): number {
  const all = getAll();
  all[slug] = (all[slug] ?? 0) + 1;
  localStorage.setItem(KEY, JSON.stringify(all));
  return all[slug];
}

export function getAllSlopSlugs(): Set<string> {
  const all = getAll();
  return new Set(Object.entries(all).filter(([, v]) => v >= 10).map(([k]) => k));
}

export const SLOP_THRESHOLD = 10;
