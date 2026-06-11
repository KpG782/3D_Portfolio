"use client";

import { track as vercelTrack } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * One funnel, two sinks. Every custom event (hero_view, project_card_click,
 * resume_download, chat_opened, case_study_scroll_depth) lands in both
 * Vercel Analytics and GA4. GA4 only receives when NEXT_PUBLIC_GA_ID is set,
 * so local dev stays silent.
 */
export function track(
  name: string,
  props?: Record<string, string | number>,
) {
  vercelTrack(name, props);
  if (process.env.NEXT_PUBLIC_GA_ID) {
    sendGAEvent("event", name, props ?? {});
  }
}
