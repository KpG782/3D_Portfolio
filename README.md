# kenbuilds.tech — THE TRACE

Portfolio of **Ken Patrick Garcia**, AI Full-Stack Engineer. Built as a
documented system: this README is the architecture doc, [`AUDIT.md`](AUDIT.md)
is the measured baseline it replaced, and [`DESIGN.md`](DESIGN.md) is the
design system it implements.

**Concept:** the site behaves like instrumented software. One request line
runs down the page; every section is a numbered station on it. Case studies
are scroll-lit architecture traces with real numbers — architecture,
trade-offs, what broke, results.

## Stack

- **Next.js 16 (App Router) + TypeScript** — every page static/SSG; the home
  page revalidates hourly for the live cards. No client JS is required for
  first paint.
- **Tailwind CSS 4** — design tokens live in [`app/globals.css`](app/globals.css)
  as `@theme` variables (Trace Navy palette, exact glass spec, motion rules).
- **next/font** — Bricolage Grotesque (display), Atkinson Hyperlegible (body),
  Martian Mono (labels/metrics). `display: optional`: text paints once in a
  metrically-matched fallback and never re-fires LCP; preloaded brand fonts
  win on normal connections.
- **Claude API (`@anthropic-ai/sdk`)** — the "Ask my portfolio" RAG widget.
- **Vercel Analytics + Speed Insights** — funnel events: `hero_view`,
  `project_card_click`, `case_study_scroll_depth`, `chat_opened`,
  `resume_download`.

## Architecture

```
app/
  layout.tsx          fonts, metadata, JSON-LD, analytics
  page.tsx            hero → 01 work (3 case-study cards + ship log)
                      → awards → 02 lab → 03 talks → 04 contact  (ISR 1h)
  work/[slug]/        3 case-study traces (SSG) + per-route OG images
  api/chat/route.ts   RAG chat endpoint (dynamic)
  robots.ts · sitemap.ts · not-found.tsx
components/           server components + four small client islands:
                      InView (scroll reveals), FunnelEvents, ScrollDepth,
                      chat/* (launcher lazy-loads the panel on first open)
data/                 single source of truth — every fact on the site lives
                      here (site, projects, case-studies, awards, lab, talks)
lib/chat/             corpus (built from data/), lexical retrieval, rate limit
public/               résumé page + PDF, llms.txt, images (≈400KB total)
```

### The chat widget (`/api/chat`)

Retrieval-augmented answers **only from site content**: the corpus is
assembled from the same `data/` files that render the pages, scored with
IDF-weighted lexical retrieval (dependency-free), and passed as context to
Claude with a system prompt that forbids out-of-corpus claims.

- **Model:** `claude-opus-4-8` by default; override with `CHAT_MODEL`
  (e.g. `claude-haiku-4-5` for cheaper traffic).
- **Rate limit:** sliding window, 10 messages/IP/hour — Upstash Redis REST if
  `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` exist, per-instance
  in-memory fallback otherwise.
- **Env-gated:** without `ANTHROPIC_API_KEY` the endpoint returns 503 and the
  panel shows an honest offline state.
- **Upgrade path:** swap `lib/chat/retrieve.ts` for pgvector similarity over
  the same chunk shape when Supabase credentials land.

### Performance budget (ship gates)

The hero is server-rendered text with **no entrance animation** — the LCP
element is the headline. Motion is transform/opacity only, scroll-triggered
through one IntersectionObserver island, and fully pre-lit under
`prefers-reduced-motion`. Glass appears only on nav, bento cards, stat
overlays, and the chat launcher — never on prose or in the LCP path.

### Content rules

- Facts come from `data/` only; the build never invents metrics.
  Pacebeats is "1st Runner-Up — InfoTech Olympics 2025" everywhere.
- LexInSight is never called "production". The golden-eval framing is
  parked entirely (no artifact exists yet) — `components/EvalBoard.tsx`
  returns only when a real eval set with real pass-rates does.
- "What broke" sections render an honest pending state until written from
  real incident notes.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build && npm run start
```

Optional env (`.env.local`): `ANTHROPIC_API_KEY`, `CHAT_MODEL`,
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.

### Résumé pipeline

`public/resume.html` is the PII-free recruiter page (served at `/resume`).
Regenerate the PDF after editing it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf=public/Ken-Patrick-Garcia-Resume.pdf \
  "file://$PWD/public/resume.html"
```
