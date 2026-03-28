"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/browse?q=${encodeURIComponent(q.trim())}`);
    else router.push("/browse");
  }

  return (
    <form onSubmit={submit} className="mt-10 flex items-center border border-border max-w-lg">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search your vibe..."
        className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="border-l border-border px-5 py-3 text-xs text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        →
      </button>
    </form>
  );
}
