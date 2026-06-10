"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

// Panel code loads only on first open — nothing in the initial bundle.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const openChat = () => {
    setOpen(true);
    if (!opened) {
      setOpened(true);
      track("chat_opened");
    }
  };

  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener("kb:open-chat", handler);
    return () => window.removeEventListener("kb:open-chat", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <>
      {open ? <ChatPanel onClose={() => setOpen(false)} /> : null}
      <button
        type="button"
        onClick={openChat}
        className="glass fixed right-4 bottom-4 z-50 flex min-h-12 cursor-pointer items-center gap-2 px-4 font-mono text-sm text-signal transition-colors duration-200 hover:border-pulse/50"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span
          aria-hidden="true"
          className="inline-block size-2 rounded-full bg-pulse"
        />
        Ask my portfolio
      </button>
    </>
  );
}
