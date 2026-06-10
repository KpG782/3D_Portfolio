export type LogItem = {
  id: string;
  title: string;
  /** Quantified result or concrete shipped fact — leads the row. */
  lead: string;
  /** What the system actually does — sourced from the repo's own README/
      description, never invented. Omit when no public artifact exists. */
  body?: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Real asset from the project (banner, award photo, certificate). */
  image?: { src: string; alt: string; width: number; height: number };
};

/**
 * The ship log — every shipped system that isn't one of the three case
 * studies. Rendered as dense disclosure rows, not cards: the three traces
 * are the only cards on the page (taste pass, 2026-06-10).
 */
export const shipLog: LogItem[] = [
  {
    id: "kudlit",
    title: "Kudlit",
    lead: "Top 13 of 500+ — DEVAKDA · Baybayin scanner shipped as Android v1.0.0.",
    body: "Camera-first Baybayin glyph scanner, two-way translation between Filipino text and Baybayin Unicode, lessons and quiz practice, and Butty — an AI learning companion for explanations. Shipped as a public Android APK with its own bundled design system and Baybayin display font.",
    stack: ["Flutter", "YOLO → TFLite", "Local Gemma", "Gemini"],
    repo: "https://github.com/KpG782/kudlit-app",
    image: {
      src: "/images/projects/kudlit.webp",
      alt: "Kudlit v1.0.0 release banner — Baybayin scanner, translator, and learning companion",
      width: 1600,
      height: 600,
    },
  },
  {
    id: "flowfit",
    title: "FlowFit",
    lead: "Champion — C(Old) St.art 2025 · kids' fitness with on-device AI.",
    body: "Dual-platform fitness tracking: a Galaxy Watch (Wear OS) app streams real-time heart rate and inter-beat intervals from the Samsung Health Sensor SDK, syncing to an Android companion over the Wearable Data Layer — with activity, sleep, nutrition, and mood tracking on a Supabase backend.",
    stack: ["Flutter", "WearOS", "Samsung Health SDK", "Supabase"],
    repo: "https://github.com/KpG782/flowfit",
    image: {
      src: "/images/hero/flowfit.webp",
      alt: "C(Old) St.art Hackathon winners announcement — Team ACSADIANS, University of Makati",
      width: 1638,
      height: 2048,
    },
  },
  // Internal ops hub presented under a portfolio codename per Ken's
  // anonymization write-up (2026-06-11): never name the company on the
  // project, no links, no screenshots with real data. Copy below is from
  // that write-up verbatim where possible. Replaces the "Romega ATS" row.
  {
    id: "teamos",
    title: "TeamOS",
    lead: "Internal ops hub, shipped solo in ~3 months — 46 pages, 56 API routes, 31-table schema.",
    body: "All-in-one operations platform for a distributed digital services team, replacing 4+ separate SaaS tools: project management with kanban and sprints, attendance with live presence and a policy-driven overtime approval queue, a recruiting ATS with automated resume parsing and a consent-gated talent pool, a full LMS with server-graded quizzes and PDF certificates, and AI-drafted executive briefings gated behind human review. Led the migration off a third-party PM SaaS — SQLite → Supabase Postgres, custom JWT → Supabase Auth + Google OAuth.",
    stack: ["Next.js 16", "Supabase", "Drizzle", "n8n", "LLM APIs"],
  },
  {
    id: "ligtas",
    title: "LigTAS",
    lead: "Agent on Cloud Run — built at Google Gen AI Academy APAC.",
    stack: ["Cloud Run", "Agents"],
  },
  // SagipAI (offline emergency AI, on-device LiteRT-LM) parked per Ken
  // (2026-06-11); restore as a log row when he wants it back.
  {
    id: "herbalens",
    title: "HerbaLens",
    lead: "Top 10 of 53 — DOST-TAPI 2025 · medicinal-plant recognition.",
    body: "AI medicinal-plant recognition bridging Filipino herbal knowledge with computer vision — TensorFlow models in an Android app, with a public project site.",
    stack: ["Android", "TensorFlow", "Computer vision"],
    live: "https://theherbalenswebsite.web.app/",
    image: {
      src: "/images/hero/herbalens.webp",
      alt: "DOST-TAPI ClustRICE 2025 finalist certificate naming the HerbaLens team",
      width: 2021,
      height: 1536,
    },
  },
  {
    id: "ars",
    title: "ARS",
    lead: "Best Paper, 97% — roadside emergencies matched to nearby mechanics.",
    body: "Connects vehicle owners with mechanics for on-demand repairs: booking, live ETA over a self-hosted OSRM routing server built for the Philippine road network, in-app chat, AI diagnostics via a Rasa + RAG + Gemini chatbot with Taglish support, and a real-time mechanic dashboard — Firebase backend, feature-first clean architecture.",
    stack: ["Flutter", "Riverpod", "Firebase", "Self-hosted OSRM", "Rasa + RAG"],
    repo: "https://github.com/KpG782/ars",
    live: "https://ars-website-chi.vercel.app",
    image: {
      src: "/images/hero/ars.webp",
      alt: "The ARS team recognized at the 8th Research Congress, University of Makati",
      width: 2048,
      height: 1365,
    },
  },
  // DAMAY (Top 5 of 105 — Stellar PH 2026) intentionally absent for now per
  // Ken (2026-06-10); restore as a log row when content is ready.
];

/** "Now building" status — edit freely; keep it true and keep it short. */
export const nowBuilding = {
  label: "now building",
  body: "THE TRACE — this portfolio as a documented system",
};
