"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/** Fires case_study_scroll_depth at 25/50/75/100 — once each (ship gate). */
export default function ScrollDepth({ slug }: { slug: string }) {
  useEffect(() => {
    const fired = new Set<number>();
    let raf = 0;

    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = ((window.scrollY / max) * 100) | 0;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("case_study_scroll_depth", { slug, depth: mark });
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug]);

  return null;
}
