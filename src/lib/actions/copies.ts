"use server";

import { kv } from "@vercel/kv";

export async function incrementCopyCount(slug: string): Promise<void> {
  try {
    await Promise.all([
      kv.incr(`prompt:copies:${slug}`),
      kv.incr("total:copies"),
    ]);
  } catch {}
}

export async function getCopyCount(slug: string): Promise<number> {
  try {
    return (await kv.get<number>(`prompt:copies:${slug}`)) ?? 0;
  } catch {
    return 0;
  }
}
