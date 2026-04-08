"use client";

import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { toggleAwesomeSave } from "@/lib/actions/awesome-saves";

interface AwesomeSaveButtonProps {
  href: string;
  initialSaved: boolean;
}

export function AwesomeSaveButton({ href, initialSaved }: AwesomeSaveButtonProps) {
  const { isSignedIn } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSaved((v) => !v);
    try {
      await toggleAwesomeSave(href);
    } catch {
      setSaved((v) => !v);
    } finally {
      setLoading(false);
    }
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button
          onClick={(e) => e.preventDefault()}
          className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground/40 transition-colors hover:text-foreground"
        >
          Save
        </button>
      </SignInButton>
    );
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
