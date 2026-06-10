export type LogItem = {
  id: string;
  title: string;
  /** Quantified result or concrete shipped fact — leads the row. */
  lead: string;
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
    stack: ["Flutter", "WearOS", "Samsung Health SDK", "Supabase"],
    repo: "https://github.com/KpG782/flowfit",
    image: {
      src: "/images/hero/flowfit.webp",
      alt: "C(Old) St.art Hackathon winners announcement — Team ACSADIANS, University of Makati",
      width: 1638,
      height: 2048,
    },
  },
  // Copy confirmed public-safe by Ken, pending his lead's verbal OK before
  // production promotion. Preview-only until then.
  {
    id: "romega-ats",
    title: "Romega ATS",
    lead: "Sole engineer on Romega's internal ATS — orchestrated by a self-hosted n8n server I operate.",
    stack: ["n8n", "LLM APIs", "Node.js"],
  },
  {
    id: "ligtas",
    title: "LigTAS",
    lead: "Agent on Cloud Run — built at Google Gen AI Academy APAC.",
    stack: ["Cloud Run", "Agents"],
  },
  {
    id: "sagipai",
    title: "SagipAI",
    lead: "Emergency AI that works offline — on-device LiteRT-LM.",
    stack: ["LiteRT-LM", "On-device"],
  },
  {
    id: "herbalens",
    title: "HerbaLens",
    lead: "Top 10 of 53 — DOST-TAPI 2025 · medicinal-plant recognition.",
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
    stack: ["Flutter", "Firebase", "Maps"],
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
