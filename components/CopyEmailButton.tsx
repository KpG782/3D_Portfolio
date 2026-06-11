"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";

/**
 * The contact CTA. Click-to-copy beats mailto: on corporate machines with no
 * configured mail client, mailto fails silently and the lead dies — copy
 * works everywhere. mailto stays available as the fallback path (the plain
 * email link in Contact), and as the in-place fallback when the Clipboard
 * API itself is blocked.
 */
export default function CopyEmailButton({
  className,
  label = "Copy email",
  copiedLabel = "Copied ✓",
}: {
  className?: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    track("email_copy");
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={className}
      aria-live="polite"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
