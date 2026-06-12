"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets window scroll to (0, 0) whenever the route pathname changes.
 * Next.js doesn't always do this in App Router when navigating between pages
 * that share a layout. Mount this once in the root layout.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Use "instant" so it doesn't smooth-scroll across long pages
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
