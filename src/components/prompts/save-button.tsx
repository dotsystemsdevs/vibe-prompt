"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { toggleSave } from "@/lib/actions/saves";

interface SaveButtonProps {
  slug: string;
  initialSaved: boolean;
}

export function SaveButton({ slug, initialSaved }: SaveButtonProps) {
  const { isSignedIn } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSave() {
    if (loading) return;
    setLoading(true);
    setSaved((v) => !v);
    try {
      await toggleSave(slug);
      router.refresh();
    } catch {
      setSaved((v) => !v);
    } finally {
      setLoading(false);
    }
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className="px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground border border-foreground/15 hover:border-foreground/30">
          Save
        </button>
      </SignInButton>
    );
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
