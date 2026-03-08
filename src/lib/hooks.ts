"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useLayout(): "desktop" | "mobile" | null {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  if (isDesktop === null) return null;
  return isDesktop ? "desktop" as const : "mobile" as const;
}
