import { getSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await getSupabase()
      .from("prompt_copies")
      .select("slug, count") as { data: { slug: string; count: number }[] | null };

    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
      counts[row.slug] = row.count;
    }
    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({});
  }
}
