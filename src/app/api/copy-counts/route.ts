import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = await kv.keys("prompt:copies:*");
    const counts: Record<string, number> = {};
    if (keys.length > 0) {
      const values = await kv.mget<number[]>(...keys);
      keys.forEach((key, i) => {
        const slug = key.replace("prompt:copies:", "");
        counts[slug] = values[i] ?? 0;
      });
    }
    const total = (await kv.get<number>("total:copies")) ?? 0;
    return NextResponse.json({ counts, total });
  } catch {
    return NextResponse.json({ counts: {}, total: 0 });
  }
}
