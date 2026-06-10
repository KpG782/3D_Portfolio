# DESIGN.md — Phase 2 design system · "THE TRACE"

**Direction (locked, Phase 1):** the site behaves like instrumented software. One request line runs down the page; every section is a numbered station on it. Recruiters get an instant text verdict; engineers get scroll-driven architecture traces with real numbers. Boldness budget is spent entirely on the traces — everything else stays quiet.

Dark-only for v1. Rationale: one axis of polish instead of two, the trace identity is inherently dark, and the recruiter-facing light surface already exists (`/resume` stays light + print-friendly). `color-scheme: dark` declared; revisit light mode only if field data demands it.

---

## 1 · Color — "Trace Navy"

Six brand tokens. Ground is blue-navy (never near-black), accent is a cyan-shifted blue (never green), brass is reserved for awards (heritage from the old Ledger Navy identity — continuity without nostalgia).

| Token | Hex | Role |
|---|---|---|
| `--substrate` | `#0A1424` | Page ground. The only full-bleed color. |
| `--panel` | `#111F38` | Cards, diagram canvases, raised surfaces. Borders over shadows. |
| `--signal` | `#E9F0FA` | Primary text. ~16:1 on substrate. |
| `--telemetry` | `#92A7C5` | Secondary text, labels, captions. ~7:1 on substrate, ~6:1 on panel. |
| `--pulse` | `#54B9FF` | The request line, links, focus rings, interactive accents. ~7.5:1. |
| `--brass` | `#D9A848` | Award stamps and the hero name mark **only**. Never UI chrome. |

**Data-only signals** — appear exclusively inside diagrams, eval scoreboards, and status rows. Never decoration, never buttons, never headings:

| Token | Hex | Meaning |
|---|---|---|
| `--pass` | `#43D9A3` | Eval pass, healthy stage (teal-shifted — deliberately not acid green) |
| `--warn` | `#FF9F40` | Latency, caveats (orange — kept distinct from brass gold) |
| `--fault` | `#F0564A` | Failures, "what broke" spans |

All text/background pairs above verified ≥ 4.5:1 (AA); body pairs reach AAA.

**Glass spec** (exact tokens — the only permitted glass recipe):

```css
--glass-bg: rgba(255, 255, 255, 0.06);
--glass-border: 1px solid rgba(255, 255, 255, 0.10);
--glass-blur: blur(14px) saturate(160%);
--glass-radius: 18px; /* range 16–20px */
```

Allowed on: nav bar, bento project cards, diagram stat overlays, chat launcher.
Banned on: body text containers, case-study prose, anything in the LCP path, the entire hero fold.

**Elevation:** no drop shadows on dark. Raise surfaces with `--panel` + 1px border `rgba(255,255,255,0.08)` + optional inner top edge `inset 0 1px 0 rgba(255,255,255,0.04)`.

**Focus:** `outline: 2px solid var(--pulse); outline-offset: 2px;` — never removed, on every interactive element.

**Z-index scale:** content 0 · sticky nav 30 · overlays 40 · chat 50 · modal 60.

---

## 2 · Type — three faces, none default

| Role | Face | Why this one |
|---|---|---|
| Display | **Bricolage Grotesque** (variable: wght + opsz) | Characterful ink-trap grotesque for H1/H2 and big claims. Warm enough to not read "dashboard clone," weird enough to be remembered. |
| Body | **Atkinson Hyperlegible** | Designed by the Braille Institute for low-vision readability — a body face that *is* an accessibility statement (and gets a line in the colophon). Distinct letterforms, excellent at 16–18px. |
| Mono | **Martian Mono** (variable, incl. condensed) | NASA-telemetry flavor for trace labels, span annotations, serials, chips, metrics. Tabular by nature — numbers align in scoreboards. |

Explicitly retired: Fraunces (cream-serif-adjacent = banned look #1), Inter (the default), JetBrains Mono / Fira / Space Mono (the default dev stacks — the reference tooling literally suggested them, which is the tell).

**Memorable treatment (the type system's signature):** every section opens with a mono *station label* — `[ 02 · CASE STUDIES ]` — set in Martian Mono uppercase, 12px, `--telemetry`, sitting on the request line itself. H1/H2 in Bricolage with tight tracking (-0.02em). Metrics set huge in Martian Mono with the unit in `--telemetry`. Body never exceeds 68ch.

**Scale (px / line-height):** 56/1.05 display (mobile 38) · 32/1.15 H2 · 22/1.3 H3 · 17/1.65 body · 14/1.5 small · 12/1.4 mono-label.

**Loading:** `next/font` self-hosted subsets, zero layout shift, `display: swap`. Preload = Bricolage var + Atkinson regular + Martian Mono var (chips are mono and sit in the fold). Budget ≤ 130KB woff2 total.

---

## 3 · Layout

**Concept:** one request line runs down the page; every section is a numbered station on it.

Grid: 12-col, `max-w-[1152px]`, 4/8pt spacing scale. The request line is a 2px SVG path pinned to the left gutter (desktop) / hidden behind a 24px inset rule (mobile).

### Hero — 390px (the 7-second test, nothing below this line matters more)

```
┌──────────────────────────────┐
│ kenbuilds          [Résumé]  │ ← nav: glass, 56px
│                              │
│ ● open to AI engineering     │ ← mono status, 12px
│   roles · Manila / remote    │
│                              │
│ Ken Patrick                  │ ← Bricolage 38px,
│ Garcia                       │   "Garcia" in --brass
│                              │
│ I ship production AI         │ ← body 18px --signal
│ systems — RAG, agents, and   │
│ the full stack around them.  │
│                              │
│ ┌──────────────────────────┐ │
│ │ Champion — C(Old) St.art │ │ ← 3 proof chips,
│ ├──────────────────────────┤ │   mono 13px, panel
│ │ Top 13/500+ — DEVAKDA ·  │ │   bg, NOT glass
│ │ shipped Android v1.0.0   │ │
│ ├──────────────────────────┤ │
│ │ Legal RAG · 100-question │ │
│ │ golden eval set          │ │
│ └──────────────────────────┘ │
│                              │
│ [ See the work ]  [ Résumé ] │ ← btn 48px tall
│ ╷                            │ ← request line starts
└─┴────────────────────────────┘
   everything above: server-rendered text, zero client JS
```

### Hero — desktop (≥1024px)

```
┌────────────────────────────────────────────────────────────┐
│ kenbuilds        Work · Case studies · Lab · Talks  [Résumé]│
│                                                            │
│  ● open to AI engineering roles · Metro Manila / remote    │
│                                                            │
│  Ken Patrick Garcia                 ┌────────────────────┐ │
│  ───────────────────────            │ $ whoami           │ │
│  I ship production AI systems —     │ AI full-stack engr │ │
│  RAG, agents, and the full stack    │ $ uptime           │ │
│  around them.                       │ shipping since '21 │ │
│                                     └────────────────────┘ │
│  [Champion — C(Old) St.art 2025]      (static styled box,  │
│  [Top 13/500+ — DEVAKDA · v1.0.0]      no photo in fold —  │
│  [Legal RAG · 100-q golden evals]      headshot lives in   │
│                                        Contact)            │
│  [ See the work ]   [ Résumé ]                             │
│ ╷                                                          │
└─┴──────────────────────────────────────────────────────────┘
```

### Bento — "The work" (station 01)

```
─┬─ [ 01 · THE WORK ]  15+ shipped systems
 │
 │  ┌────────────────────────┐ ┌───────────┐
 ├──│ LexInSight   (2-wide)  │ │ Beacon    │   glass cards;
 │  │ 100-q golden eval set  │ │ memory    │   each: result
 │  │ ▸ pgvector · Next.js   │ │ compounds │   line, stack
 │  └────────────────────────┘ └───────────┘   chips, link
 │  ┌───────────┐ ┌───────────┐ ┌──────────┐
 ├──│ Pacebeats │ │ Kudlit    │ │ FlowFit  │
 │  │ 1st R-Up  │ │ Top 13of  │ │ Champion │
 │  └───────────┘ │ 500+ ·1.0 │ └──────────┘
 │  ┌───────────┐ └───────────┘ ┌──────────┐
 ├──│ NOW       │ ┌───────────┐ │ DAMAY    │
 │  │ building… │ │ GitHub    │ │ Top 5/105│
 │  │ (live)    │ │ activity  │ │ Stellar  │
 │  └───────────┘ │ (live,1h) │ └──────────┘
 │                └───────────┘
```

### Case-study page (scrollytelling template ×3)

```
─┬─ [ TRACE · LEXINSIGHT ]
 │   100-question golden eval set — legal RAG
 │   graded before it ships.
 │
 ├── THE PROBLEM        ← prose, 68ch, no glass
 │   …
 ├── HOW IT WORKS       ← THE diagram (wireframe below)
 │   ┌───────────────────────────────────┐
 │   │  [query]→[embed]→[pgvector]→[LLM] │
 │   │     ↓ stages light up on scroll   │
 │   │  [eval gate ▸ 100-q scoreboard]   │
 │   └───────────────────────────────────┘
 ├── TRADE-OFFS I MADE  ← 2–3 numbered decisions
 ├── WHAT BROKE         ← --fault span: incident + fix
 ├── RESULTS            ← Martian Mono big numbers
 └── STACK → next trace ▸
```

### Trace diagram block (the signature element, "3D usage: B")

```
┌─ panel ────────────────────────────────────────┐
│ [ SPAN 03 · RETRIEVAL ]              42ms ▰▰▱  │ ← glass stat
│                                                │   overlay only
│   ○──────▶ ●━━━━━━▶ ○ ─ ─ ─▶ ○                 │
│  query    pgvector   rerank   generate        │
│           (lit:--pulse)  (dim until scrolled)  │
│                                                │
│ ▸ annotation: "chunked at 512 tokens because…" │ ← mono 13px
└────────────────────────────────────────────────┘
  SVG-first, scroll-scrubbed stroke + stage fills;
  2.5D parallax ≤ 6px; reduced-motion = fully lit.
```

### Contact (station 05)

```
─┬─ [ 05 · CONTACT ]
 │   Hiring for AI engineering?
 │   I reply fast.
 │
 │   [photo]   kenpatrickgarcia123@gmail.com
 │   (head-    [ Email Ken ]  [ Ask my portfolio ] ← opens chat
 │    shot)    GitHub · LinkedIn · dev.to
 │             4.9K+ followers on LinkedIn
 ╵
 └── colophon: "Built as a documented system —
     architecture in the README. Body face by the
     Braille Institute. Lighthouse receipts: …"
```

The lab (station 03) reuses the trace-diagram block: a static annotated SVG of the real desk — M4 Air (dev) · ASUS 40GB/Ubuntu (Ollama: Gemma, Qwen Coder + Open WebUI) · ThinkVision · Galaxy A26 (device testing) — drawn, not modeled; upgradeable to 3D in v2 without re-architecting.

---

## 4 · Motion

1. **Nothing animates before first paint.** The hero has no entrance animation at all — the audit's GSAP lesson is law.
2. `transform` and `opacity` only. No width/height/position animation, no scale-on-hover that shifts layout (hover = color/border change).
3. **One orchestrated moment:** inside each trace, stages light in sequence (120ms stagger, 600ms stage fill) as the diagram crosses 40% viewport. Everything else is a single 250ms fade/8px rise.
4. The request line draws via SVG `stroke-dashoffset` scrubbed by scroll — CSS scroll-driven animations (`animation-timeline: view()`) where supported, IntersectionObserver fallback elsewhere. No scroll-jacking, ever.
5. Durations: 150ms micro · 250ms reveal · 600ms stage. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
6. `prefers-reduced-motion`: request line fully drawn, stages pre-lit, all reveals instant. Verified per ship gate, not assumed.

---

## 5 · Copy pass

Plain verbs, sentence case, specific > clever. Every card leads with the quantified result. Locked facts only (Pacebeats = "1st Runner-Up — InfoTech Olympics 2025"; LexInSight never says "production" until evals land).

| Surface | Copy |
|---|---|
| Nav | Work · Case studies · Lab · Talks · Contact · **Résumé** |
| Hero status | `● open to AI engineering roles · Metro Manila / remote` |
| Hero H1 | Ken Patrick **Garcia** |
| Positioning | I ship production AI systems — RAG, agents, and the full stack around them. |
| Chips | Champion — C(Old) St.art Hackathon 2025 · Top 13 of 500+ — DEVAKDA, shipped Android v1.0.0 · Legal RAG with a 100-question golden eval set |
| CTAs | See the work · Résumé |
| 01 The work | "The work" / 15+ shipped systems across AI, web, and mobile. |
| LexInSight card | 100-question golden eval set — legal RAG graded before it ships. |
| Beacon card | Research that compounds — an agent with persistent memory, shipped solo. |
| Pacebeats card | 1st Runner-Up — InfoTech Olympics 2025 · playlists from live heart rate. |
| Kudlit card | Top 13 of 500+ — DEVAKDA · Baybayin scanner shipped as Android v1.0.0. |
| FlowFit card | Champion — C(Old) St.art 2025 · kids' fitness with on-device AI. |
| DAMAY card | Top 5 of 105 — Stellar PH Hackathon 2026. |
| Romega card *(pending lead's verbal OK)* | Sole engineer on Romega's internal ATS — orchestrated by a self-hosted n8n server I operate. |
| LigTAS card | Agent on Cloud Run — built at Google Gen AI Academy APAC. |
| SagipAI card | Emergency AI that works offline — on-device LiteRT-LM. |
| Live cards | Now building · GitHub activity, last 30 days |
| 02 Case studies | "Three systems, traced end to end" / Architecture, trade-offs, what broke, and the numbers. |
| Case-study sections | The problem · How it works · Trade-offs I made · What broke · Results · Stack |
| 03 Lab | "The lab" / Local inference on hardware I run myself. |
| 04 Talks | "Talks & community" / First speakership: Qwen Meetup Manila #2 — hosted by Alibaba Cloud PH. |
| 05 Contact | "Hiring for AI engineering? I reply fast." / Email Ken · Ask my portfolio |
| Chat empty state | Ask anything that's on this site — projects, stack, evals. Answers come only from Ken's docs. |
| Footer | Built as a documented system — architecture in the README. © 2026 Ken Patrick Garcia · Mandaluyong, PH |

---

## 6 · Self-critique vs the brief

- **The reference tooling itself proposed the banned defaults** — slate-900 + `#22C55E` "code dark + run green" and Fira/JetBrains/Space Mono. Rejected wholesale; that output validated the anti-template clause rather than the palette.
- **Changed during this pass:** warn-orange moved to `#FF9F40` after a collision with brass gold; green restricted to a teal-shifted `#43D9A3` that only exists inside data UI; Fraunces (current site's display face) dropped for cream-serif adjacency; hero photo removed from the fold (the audit showed it displacing the pitch) and relocated to Contact.
- **Acknowledged risks:** Bricolage Grotesque is rising in popularity — acceptable because the memorability load sits on the station-label system and traces, not the face alone. Dark-only is a deliberate scope cut, revisitable. Beacon's card still has no number (gap list) — its lead is a concrete fact, not an adjective, until Ken supplies one.
- **Litmus:** ground `#0A1424` is blue, not black ✓ · accent is cyan-blue, not acid green ✓ · no cream/serif/terracotta ✓ · no broadsheet hairline grid (stations + panels instead) ✓ · nothing in this file exists in a template ✓.
