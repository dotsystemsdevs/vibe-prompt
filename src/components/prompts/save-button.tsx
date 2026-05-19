"use client";

import { useState, useSyncExternalStore } from "react";
import { isLocallySaved, toggleLocalSave } from "@/lib/local-saves";

interface SaveButtonProps {
  slug: string;
  initialSaved: boolean;
}

function subscribeSaves(callback: () => void) {
  window.addEventListener("vp:saves-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("vp:saves-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

export function SaveButton({ slug, initialSaved }: SaveButtonProps) {
  const saved = useSyncExternalStore(
    subscribeSaves,
    () => isLocallySaved(slug),
    () => initialSaved,
  );
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (loading) return;
    setLoading(true);
    try {
      toggleLocalSave(slug);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-colors border ${
        saved
          ? "border-foreground/30 text-foreground"
          : "border-foreground/15 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
