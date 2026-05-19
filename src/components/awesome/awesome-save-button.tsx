"use client";

import { useState, useSyncExternalStore } from "react";
import { isLocallySaved, toggleLocalSave } from "@/lib/local-saves";

interface AwesomeSaveButtonProps {
  href: string;
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

export function AwesomeSaveButton({ href, initialSaved }: AwesomeSaveButtonProps) {
  const key = `awesome:${encodeURIComponent(href)}`;
  const saved = useSyncExternalStore(
    subscribeSaves,
    () => isLocallySaved(key),
    () => initialSaved,
  );
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      toggleLocalSave(key);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`shrink-0 text-[10px] uppercase tracking-widest transition-colors ${
        saved ? "text-foreground" : "text-muted-foreground/40 hover:text-foreground"
      }`}
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
