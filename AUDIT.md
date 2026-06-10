# AUDIT.md — Phase 0 (read-only)

**Date:** 2026-06-10 · **Auditor:** Claude Code · **Target:** working tree on `master` (local production build; live = https://kenbuilds.tech)
**Method:** Lighthouse 12 CLI against `vite preview` (mobile = simulated slow-4G throttle, desktop preset), headless-Chrome screenshots at 390×844 / 390×3500 / 1440×900, full source + asset inventory. Lab numbers on localhost; the live CDN will shift absolute values slightly, but every root cause below ships identically to production.

---

## Verdict

The site has strong raw material (clean résumé data layer, real awards, real production work) wrapped in a delivery system that fails the brief on every measurable gate. A recruiter on a phone sees a passport photo and a decorative terminal — no positioning line, no proof, no projects — and on simulated 4G the page is blank for ~5 seconds because 435KB gz of JavaScript (including a 1.2MB three.js bundle that powers one decorative room at the bottom of the page) sits on the critical path. The brief's three hero proof points are not on the site: DAMAY/Stellar doesn't exist anywhere, the LexInSight golden-eval story is untold, and the Pacebeats placement **contradicts itself inside the repo** (data says 1st Runner-Up; journey copy and the new brief say 1st Place). This is a rebuild, not a tune-up — and the brief's Phase 3 (RSC hero, route handlers, @vercel/og) requires Next.js, while this repo is a Vite SPA.

---

## 1. Scorecard vs Phase 4 ship gates

| Gate | Target | Measured (mobile unless noted) | Status |
|---|---|---|---|
| Lighthouse Performance | ≥ 95 | **32** (desktop: 87) | ❌ |
| Lighthouse Accessibility | ≥ 95 | 97 | ✅ |
| Lighthouse Best Practices | ≥ 95 | 92 | ❌ (close) |
| Lighthouse SEO | ≥ 95 | 100 | ✅ |
| LCP | < 1.0 s | **18.3 s** (desktop: 2.1 s) | ❌ |
| FCP | — | 5.2 s | ❌ |
| TBT (INP proxy; INP needs field data) | < 200 ms | **4,293 ms** | ❌ |
| CLS | < 0.1 | 0.000 | ✅ |
| Initial JS (gz, critical path) | < 150 KB | **~435 KB** (entry 16 + gsap 48 + motion 39 + three 331) | ❌ 2.9× over |
| Page weight on load | — | 4.3 MB (2.86 MB images, 53 requests) | ❌ |
| 390 px mobile pass | no overflow | **Horizontal overflow site-wide** (photo, terminal, cards clip at right edge) | ❌ |
| Keyboard nav / focus | visible focus | Skip-link + `focus-ring-brand` present; a11y 97 | ✅ baseline |
| `prefers-reduced-motion` | full fallback | Honored in canvas, GSAP, framer variants | ✅ pattern exists |
| OG image per case study | per page | One static `og-image.png`; no case-study pages exist | ❌ |
| Funnel analytics events | 5 events | Vercel Analytics pageviews only; zero custom events | ❌ |
| README = architecture doc | yes | Emoji template README describing features, not architecture | ❌ |

Bonus signal: Lighthouse's new **agentic-browsing category scores 33/100** — ironic for an AI-forward brand (an `llms.txt` exists but the SPA is illegible to agents without JS execution).

### 7-second test (390 px phone): **FAIL**

What the first viewport actually contains, in order: navbar logo → oversized 2×2 ID photo (clipped off the right edge) → `whoami` terminal box. The name peeks in at the very bottom; **positioning line, proof chips, CTAs, and projects are all below the fold**. Hierarchy is Photo → Gimmick → Name → (scroll 3 screens) → Proof. Worse: hero text/CTAs are GSAP `.from()` animated, so until the JS bundle loads *and* the timeline runs, the pitch is literally invisible — on throttled mobile that's 5+ seconds of dark blue nothing. The first quantified proof ("Ships production AI, not demos" cards) sits ~3 viewports down.

---

## 2. Performance root causes (ranked by impact)

1. **three.js is on the critical path despite being "lazy."** `vite.config.js` `manualChunks` forces all three/@react-three/postprocessing code into `three-vendor` (1,203 KB raw / 331 KB gz). Rollup then hoisted shared runtime helpers into the vendor chunks, so the entry statically imports from `three-vendor`, `gsap-vendor`, AND `motion-vendor` — and Vite emits `<link rel="modulepreload">` for all three in `index.html`. Every visitor downloads 1.2 MB of WebGL runtime whose only live consumer is a decorative spinning room in the Contact section. The config comment claiming it's lazy is false in the built output.
2. **Blank-shell SPA.** `index.html` body is `<div id="root">`. Nothing — not the name — paints before React + vendors execute. FCP 5.2 s is the JS gate, not assets (hero images are tiny: 2x2.webp 8 KB, bg.webp 16 KB).
3. **JS-gated, animation-gated hero copy.** GSAP `.from()` keeps headline/description/CTAs at opacity 0 until the timeline runs post-hydration.
4. **"Deferred" sections aren't.** `DeferredSection` uses `rootMargin: 800px` — on an 844 px phone that mounts FeatureCards, Journey, Showcase (34 KB JS + eager `fetchPriority=high` project images) immediately, producing 2.86 MB of images / 17 image requests on first load that compete with the hero.
5. **Render-blocking Google Fonts:** 3 families / 13 cuts (Fraunces ×5, Inter ×4, JetBrains Mono ×4), 144 KB of font payload behind a blocking stylesheet request.
6. **Main-thread burn:** custom O(n²) neural-network canvas (~48 particles with chain-reaction physics per frame) + GSAP + framer-motion + three.js all loaded together → TBT 4.3 s. Two animation libraries (gsap AND framer-motion) do the same job in different sections.

---

## 3. Inventory

**Routes:** `/` (single SPA page, 14 stacked sections), `/resume` → rewrite to static `resume.html`, `/Ken-Patrick-Garcia-Resume.pdf` (260 KB, PII-free, regenerated from resume.html). No router, no per-project pages.

**Stack:** Vite 6 · React 19 · Tailwind 4 · GSAP + @gsap/react · framer-motion · three 0.177 + @react-three/fiber/drei/postprocessing · @emailjs/browser · react-icons · react-countup · react-responsive · @vercel/analytics + speed-insights.

**Sections mounted (in order):** NavBar, Hero (854 lines: canvas bg + video modal + GSAP), FeatureCards, JourneySection (scroll-drawn SVG timeline — genuinely good), ShowcaseSection (tabs + filter grid + modal, renders legacy `data.js`), ExperienceSection, EducationAwards, TechStack, SpeakingCommunity, CertificationsSection (563 lines), Testimonials, FAQSection, Contact (EmailJS form + 3D room), DesignSystem (colophon), Footer.

**Data layers — three generations coexist:**
- `constants/resume.js` ✅ current single source of truth (profile, stats, experiences, education, awards, leadership, skills, journey, talks, communities) — clean, structured, mostly accurate.
- `constants/data.js` ⚠️ legacy 22-entry PROJECTS blob (emoji-laden marketing prose) that ShowcaseSection still renders via the `projects.js` normalize layer.
- `constants/index.js` ❌ template leftovers: `expCards` (an *alternate employment history* with suspiciously round fake-smelling metrics — "30% load time", "40% velocity", "50% deployment" — and a "Promoted Jan 2026" narrative contradicting resume.js; dead but still in the repo), `words`, `counterItems`, `logoIconsList` (11 placeholder "company-logo-N" images), `techStackImgs`, `techStackIcons`, `socialImgs`, `expLogos`. Plus `testimonials` (live — see content audit).

**Dead code (in repo, never mounted):** `HeroModels/Room.jsx`+`HeroLights`+`Patricles` *as hero* (now only re-used by ContactExperience), `Models/TechLogos/TechIcon.jsx`, `FeaturedHighlights.jsx`, `LogoSection.jsx`, `AnimatedCounter.jsx`, `ThemeToggle` (mounted via NavBar — fine), `SEO_AUDIT.md`/`SEO_PLAN.md` (stale docs).

**Assets:** `public/` = **35 MB** → deployed `dist/` = **42 MB**.
- `images/` 30 MB, 168 files, only ~77 referenced. **~91 orphans ≈ 13 MB+**: every project PNG original shipped alongside its .webp twin (project2/6.png 1.5 MB, project2/3.png 1.5 MB, project1/4.png 1.4 MB…), cert PNGs (3× ~920 KB), `hero/flowfit.jpg` 748 KB, unused `textures/` 348 KB.
- `models/` 4.4 MB, 13 GLBs; live code loads **one** (`optimized-room.glb`, 808 KB, the contact room). Dead: `ken3d-optimized.glb` 1.6 MB, `node-transformed.glb` 716 KB, `computer-optimized*.glb`, tech-logo GLBs, `elephpant1.glb`, `android.glb`.
- Good hygiene that exists: webp variants, `sitemap.xml`, `robots.txt`, `llms.txt`, `site.webmanifest`, rich JSON-LD (Person/WebSite/FAQ), security headers + immutable asset caching in `vercel.json`, PII-free résumé pipeline.

---

## 4. Content audit — projects

| Project | Quantified result on site? | Architecture/trade-offs? | Links | Verdict |
|---|---|---|---|---|
| **Beacon** (featured) | ❌ none ("persistent memory" claim only) | ❌ | **repo & demo both empty** | Keep — needs links + numbers |
| **Kudlit** (featured) | ✅ Top 13/500+ DEVAKDA | ❌ (stack list only) | repo ✅ | Keep — case-study candidate |
| **Pacebeats** (featured) | ⚠️ "1st Runner-Up" — **conflicts with journey copy & brief ("1st Place")** | ❌ | LinkedIn demo | Keep — brief names it a top-3 case study |
| **LexInSight** | ❌ zero numbers; **no mention of the 100-question golden eval set** (the brief's #3 proof point); status "In Progress (Beta)" | partial (highlights list) | repo only | Keep — flagship case study, content missing |
| **DAMAY (Stellar PH, Top 5/105)** | — | — | — | **DOES NOT EXIST ON SITE** (brief's #1 proof point) |
| **LigTAS Agent** (Cloud Run, Google Gen AI Academy) | — | — | — | **Not on site** |
| **SagipAI** (on-device LiteRT-LM) | — | — | — | **Not on site** |
| HerbaLens | ✅ Top 10/53 DOST-TAPI | ❌ | live site ✅ | Keep (supporting) |
| ARS | ✅ Best Paper 97% | ❌ | repo + FB photo | Keep (supporting) |
| FlowFit | ✅ Champion | ❌ | generic GH profile link | Keep (supporting) |
| CampusCare | ❌ | ❌ | repo ✅ | Marginal |
| 7 client sites (cafés, weddings, printing, silog) | ❌ | ❌ | ✅ | Compress to one "client work" line |
| **9 duplicate entries** (wedding ×2 identical, tugang ×2, HungryPotters ×2, pacebeats-landing ×2, designers-cafe ×2, "UI library"/"cursor library"/"Bootstrap showcase" = same repos relabeled) | — | — | — | **Padding. Kill.** |
| "Interactive Portfolio with Three.js" | ❌ | ❌ | demo → stale `3-d-portfolio-eight-pi.vercel.app` instead of kenbuilds.tech | Fix or fold into colophon |

**Other content findings:**
- **Architecture diagrams: zero anywhere.** Trade-offs / "what broke": zero. Eval rigor: zero. This is the entire engineer-deep-dive funnel, missing.
- **Romega claim gap:** brief says "internal ATS + production n8n server"; site says chatbots/RAG/Gemini only.
- **Testimonials** = 6 classmates, quotes about being a good student, **with their university emails published**. Weak hiring signal + privacy smell.
- **FAQ section** renders the JSON-LD SEO questions as visible UI ("Who is Ken Patrick Garcia?") — robot copy shown to humans.
- **Certifications:** AWS Cloud Practitioner credential URL is a broken `blob:` link. 6.7 MB of cert images for a low-signal section.
- **Stats conflict:** `stats` says 24 projects/6 roles; dead `counterItems` says 20+/4. Hero proof line says "24 projects shipped" — inflated by the 9 duplicates above.
- Homelab (the brief's 3D centerpiece source material): not represented anywhere.
- `index.html` JSON-LD/meta still say "Flutter, Three.js" identity — predates the AI-first positioning.

---

## 5. Kill list (deleted in the rebuild)

1. **three.js + @react-three/* + postprocessing as currently used** — 1.2 MB bundle serving one decorative contact room. (3D returns only per the Phase 1 chosen direction, lazy + budgeted.)
2. **All 13 GLBs in `/models`** (4.4 MB) — generic room/tech logos; none depict Ken's real homelab.
3. **~91 orphaned images (~13 MB)** incl. all PNG twins of webp files, plus `textures/`.
4. **Neural-network canvas background** (O(n²) main-thread physics, decorative).
5. **Draggable YouTube PiP VideoModal** (305 lines for an embed) — replace with a plain link/lite-embed if the video survives the gap-list decision.
6. **9 duplicate project entries** + `data.js` emoji marketing prose as a format.
7. **`constants/index.js` template graveyard**: `expCards` (fake-metric alternate résumé — delete with prejudice), `words`, `counterItems`, `logoIconsList`, `techStackImgs`, `techStackIcons`, `socialImgs`, `expLogos`.
8. **Dead components:** FeaturedHighlights, LogoSection, AnimatedCounter, TechIcon, HeroModels/* (Room moves or dies with the 3D decision).
9. **Visible FAQ section** (keep the JSON-LD; humans get real copy).
10. **Classmate testimonials with published emails** (replace per gap list or cut).
11. **One of the two animation libraries** — gsap or framer-motion, not both.
12. **Google Fonts render-blocking triple-family load** (design system will re-spec; self-host + preload whatever survives).
13. `SEO_AUDIT.md`, `SEO_PLAN.md` (stale), stale Vercel-preview link in the portfolio's own project entry.

## 6. Keep list (carries into the rebuild)

- **`resume.js` data-layer pattern** — experiences, awards, education, leadership, talks, communities, journey narrative (the 5-chapter arc is genuinely good storytelling raw material). Fix the Pacebeats conflict first.
- **`projects.js` normalize-layer concept** (single schema feeding all project UI) — re-point at clean content.
- **JourneySection scroll-drawn SVG spine** — the one section already doing "interactive storytelling"; concept survives even if reimplemented.
- **Résumé pipeline**: `resume.html` → PII-free PDF + `/resume` rewrite.
- **SEO substrate**: domain, canonical, sitemap, robots, llms.txt, manifest, JSON-LD graph (update content), OG image pipeline.
- **`vercel.json`** security headers + immutable caching + cleanUrls.
- **Accessibility patterns**: skip-link, focus rings, reduced-motion guards everywhere, semantic sections (a11y 97 — protect it).
- **Vercel Analytics + Speed Insights** (extend with funnel events).
- **Theme tokens / Ledger Navy design discipline + `design/` HTML deliverables** as Phase 2 input.
- **Real proof content**: 5 awards, talks (Qwen Meetup), communities, certifications data (fix AWS link), 2x2 headshot (8 KB, fine — placement is the problem, not the asset).

## 7. Gap list — content only Ken can provide

**Blocking (touches the hero / top-3 proof points):**
1. **Pacebeats placement:** repo data says *1st Runner-Up, InfoTech Olympics 2025*; journey copy + your brief say *1st Place InfotechnoLympics*. Which is the certificate truth? (Hard rule: we never inflate.)
2. **DAMAY:** description, your role, Soroban/smart-contract architecture, repo/demo links, 1–2 screenshots, and the "Top 5 of 105" source (post/cert) — nothing exists on the site today.
3. **LexInSight golden evals:** the 100-question set — how it was built, what it measures (accuracy? citation fidelity?), pass rates before/after, retrieval stack details. Plus: is "production" claimable (real users?) and a live link if any.
4. **Beacon links:** repo + demo URLs (currently empty strings).

**Case-study depth (Problem → Architecture → Trade-offs → What broke → Results):**
5. For each of LexInSight, DAMAY, Pacebeats: 2–3 trade-offs you made, one failure story + fix, and result numbers. (I can draft from interviews; I won't invent.)
6. Romega: confirm what's public-safe — "internal ATS + production n8n server" vs current "chatbots/RAG" copy.

**3D / homelab (if direction A wins Phase 1):**
7. 3–5 photos of the real desk (M4 Air, ASUS ROG/TUF?, ThinkVision T27h, Galaxy A26) for low-poly modeling reference + exact "what runs where" labels (Ollama models, Open WebUI port, n8n host).

**Infrastructure decisions for Phase 3:**
8. Confirm the **Next.js migration** (brief's RSC hero / route handlers / @vercel/og require it — this repo is Vite). Recommendation: fresh Next.js 15 app in this repo, port content, keep domain.
9. Chat-with-portfolio RAG: Supabase project (pgvector) + Upstash Redis + `ANTHROPIC_API_KEY` — provision or hand me keys when we get there; also the corpus (project docs/case studies become the retrieval set).
10. GitHub activity card: confirm public-repo-only data is fine (no token) or provide a read-only token.

**Smaller decisions:**
11. Intro video: keep (as plain link) or cut?
12. Testimonials: cut, or replace with 1–2 professional quotes (Romega lead, CodeVF, hackathon mentor)? Either way classmates' emails come down.
13. LinkedIn "~4.9K followers": display as static text or live-ish number? Source?
14. AWS Cloud Practitioner: real credential URL (current one is a broken `blob:`).
15. "24 projects shipped" hero claim: after de-duplication the honest count is ~15–16 distinct works — confirm the number you want to stand behind.

---

## 8. Structural conclusion

The brief's funnel (static 7-second hero, scrollytelling case-study routes, per-page OG, route-handler RAG API) maps to **Next.js App Router on Vercel**, not a Vite SPA. The rebuild should start from a fresh Next.js app and treat this codebase as a **content quarry** (resume.js, journey narrative, design tokens, SEO substrate) rather than a refactor target. Everything in the keep list ports cleanly; nothing in the kill list deserves migration effort.

*Lab-data caveats: Lighthouse mobile = simulated slow-4G on localhost; INP is field-only (TBT 4.3 s is the lab proxy); live kenbuilds.tech will score somewhat differently but shares every structural cause. Screenshots captured under virtual time, which is also why GSAP's hidden `from`-states were caught red-handed.*
