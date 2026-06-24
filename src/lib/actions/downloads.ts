"use server";

import { kv } from "@vercel/kv";

export async function incrementDownloadCount(filename: string): Promise<void> {
  try {
    await Promise.all([
      kv.incr(`template:downloads:${filename}`),
      kv.incr("total:downloads"),
    ]);
  } catch {}
}

export async function getDownloadCounts(): Promise<Record<string, number>> {
  try {
    const keys = await kv.keys("template:downloads:*");
    const counts: Record<string, number> = {};
    if (keys.length > 0) {
      const values = await kv.mget<number[]>(...keys);
      keys.forEach((key, i) => {
        counts[key.replace("template:downloads:", "")] = values[i] ?? 0;
      });
    }
    return counts;
  } catch {
    return {};
  }
}
