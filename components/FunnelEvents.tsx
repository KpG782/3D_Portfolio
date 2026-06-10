"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Funnel instrumentation (ship gate): hero_view, project_card_click,
 * resume_download. chat_opened fires inside the chat widget and
 * case_study_scroll_depth inside ScrollDepth. One tiny island, loaded
 * after paint.
 */
export default function FunnelEvents() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            track("hero_view");
            io.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      io.observe(hero);
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-track]",
      );
      if (!el) return;
      const name = el.dataset.track!;
      const props: Record<string, string> = {};
      if (el.dataset.trackId) props.id = el.dataset.trackId;
      track(name, props);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
