"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's the golden eval set?",
  "What runs in Ken's homelab?",
  "Is Ken open to roles right now?",
];

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setNotice(null);
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; message?: string };
      if (!res.ok) {
        setNotice(data.message ?? "Chat hit a snag — email Ken instead.");
      } else if (data.reply) {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setNotice("Network hiccup — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Ask Ken's portfolio"
      className="fixed right-4 bottom-20 z-50 flex max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/12 bg-panel shadow-2xl"
    >
      <header className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <p className="font-mono text-xs tracking-wide text-telemetry">
          [ ASK MY PORTFOLIO ]
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="cursor-pointer rounded p-1 text-telemetry transition-colors hover:text-signal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div>
            <p className="text-sm leading-relaxed text-telemetry">
              Ask anything that's on this site — projects, stack, evals.
              Answers come only from Ken's docs.
            </p>
            <div className="mt-3 flex flex-col items-start gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="chip-mini cursor-pointer transition-colors hover:border-pulse/50 hover:text-signal"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {messages.map((m, i) => (
          <p
            key={i}
            className={
              m.role === "user"
                ? "ml-8 rounded-xl bg-pulse/15 px-3 py-2 text-sm leading-relaxed text-signal"
                : "mr-4 text-sm leading-relaxed text-signal/90"
            }
          >
            {m.content}
          </p>
        ))}
        {busy ? (
          <p className="font-mono text-xs text-telemetry" role="status">
            tracing…
          </p>
        ) : null}
        {notice ? (
          <p className="font-mono text-xs text-warn" role="status">
            {notice}
          </p>
        ) : null}
      </div>

      <form
        className="flex gap-2 border-t border-white/8 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask a question about Ken
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask about the work…"
          className="min-h-11 flex-1 rounded-lg border border-white/10 bg-substrate px-3 text-sm text-signal placeholder:text-telemetry/60"
        />
        <button
          type="submit"
          disabled={busy || input.trim().length === 0}
          className="btn btn-primary !min-h-11 !px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
