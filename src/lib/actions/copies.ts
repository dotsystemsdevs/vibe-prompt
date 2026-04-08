"use server";

import { getSupabase } from "@/lib/supabase";

export async function incrementCopyCount(slug: string): Promise<void> {
  try {
    const db = getSupabase();
    const { data } = await db
      .from("prompt_copies")
      .select("count")
      .eq("slug", slug)
      .maybeSingle() as { data: { count: number } | null };

    if (data) {
      await db.from("prompt_copies").update({ count: data.count + 1 }).eq("slug", slug);
    } else {
      await db.from("prompt_copies").insert({ slug, count: 1 });
    }
  } catch {
    // Graceful fallback if table doesn't exist yet
  }
}

export async function getCopyCount(slug: string): Promise<number> {
  try {
    const db = getSupabase();
    const { data } = await db
      .from("prompt_copies")
      .select("count")
      .eq("slug", slug)
      .maybeSingle() as { data: { count: number } | null };
    return data?.count ?? 0;
  } catch {
    return 0;
  }
}
