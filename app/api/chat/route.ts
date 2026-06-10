import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { retrieve } from "@/lib/chat/retrieve";
import { allow } from "@/lib/chat/ratelimit";

// Default per claude-api guidance; override with CHAT_MODEL (e.g.
// claude-haiku-4-5) if widget economics demand it — that's Ken's call.
const MODEL = process.env.CHAT_MODEL ?? "claude-opus-4-8";
const MAX_TURNS = 12;
const MAX_CHARS = 1000;

const SYSTEM = `You are the assistant on kenbuilds.tech, Ken Patrick Garcia's portfolio. Answer questions about Ken — his projects, stack, experience, awards, and availability — using ONLY the context provided in each message. Rules:
- If the context doesn't contain the answer, say so plainly and point to ken's email (kenpatrickgarcia123@gmail.com) or the résumé at /resume. Never guess or invent facts, numbers, or employers.
- Pacebeats placed 1st Runner-Up at InfoTech Olympics 2025 — never "1st Place".
- LexInSight is in beta — never describe it as "in production" and never mention an eval set or eval results.
- TeamOS is a portfolio codename for an internal client system — never name or guess the company it was built for, and never claim a repo or live URL exists for it.
- Be concise: 2–5 sentences. Plain text, no markdown headers.
- Politely decline questions unrelated to Ken or this site.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "offline", message: "Chat isn't configured yet — email Ken instead." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allow(ip))) {
    return NextResponse.json(
      { error: "rate_limited", message: "That's the hourly limit — back in a bit, or just email Ken." },
      { status: 429 },
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_CHARS),
    }));

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const context = retrieve(lastUser.content, 4)
    .map((c) => `[${c.source}] ${c.text}`)
    .join("\n\n");

  const messages: Anthropic.MessageParam[] = [
    ...history.slice(0, -1),
    {
      role: "user" as const,
      content: `Context from kenbuilds.tech:\n${context || "(no matching site content)"}\n\nVisitor question: ${lastUser.content}`,
    },
  ];

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: MODEL,
      // Cost cap by design (brief §Phase 3.5): short grounded answers only.
      max_tokens: 600,
      thinking: { type: "adaptive" },
      system: SYSTEM,
      messages,
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!text) {
      return NextResponse.json(
        { error: "empty", message: "No answer for that one — try rephrasing, or email Ken." },
        { status: 502 },
      );
    }
    return NextResponse.json({ reply: text });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "upstream_rate_limited", message: "The model is busy — try again shortly." },
        { status: 429 },
      );
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "upstream", message: "Chat hit a snag — email Ken instead." },
        { status: 502 },
      );
    }
    throw err;
  }
}
