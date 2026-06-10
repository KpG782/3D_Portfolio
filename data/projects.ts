export type BentoItem = {
  id: string;
  title: string;
  /** Quantified result or concrete shipped fact — leads the card. */
  lead: string;
  stack: string[];
  href?: string; // internal case-study route
  repo?: string;
  live?: string;
  /** Real asset from the project (banner, award photo, certificate). */
  image?: { src: string; alt: string };
  /** 2-wide feature cell in the bento. */
  wide?: boolean;
  /** Achievement-only card (no body, stamp styling). */
  stamp?: boolean;
};

export const bento: BentoItem[] = [
  {
    id: "lexinsight",
    title: "LexInSight",
    lead: "100-question golden eval set — legal RAG graded before it ships.",
    stack: ["Next.js", "Supabase", "pgvector", "RAG"],
    href: "/work/lexinsight",
    repo: "https://github.com/KpG782/Lexinsights",
    live: "https://lexinsights.vercel.app",
    wide: true,
  },
  {
    id: "beacon",
    title: "Beacon",
    lead: "Research that compounds — an agent with persistent memory, shipped solo.",
    stack: ["Vercel AI SDK", "Next.js", "Vector memory"],
    href: "/work/beacon",
    repo: "https://github.com/KpG782/Beacon",
    live: "https://beacon-mu-murex.vercel.app/",
  },
  {
    id: "pacebeats",
    title: "Pacebeats",
    lead: "1st Runner-Up — InfoTech Olympics 2025 · playlists from live heart rate.",
    stack: ["Kotlin", "WearOS", "Supabase", "ML"],
    href: "/work/pacebeats",
    repo: "https://github.com/KpG782/pacebeats-release-files",
    live: "https://www.pacebeats.top/",
  },
  {
    id: "kudlit",
    title: "Kudlit",
    lead: "Top 13 of 500+ — DEVAKDA · Baybayin scanner shipped as Android v1.0.0.",
    stack: ["Flutter", "YOLO → TFLite", "Local Gemma", "Gemini"],
    repo: "https://github.com/KpG782/kudlit-app",
    image: {
      src: "/images/projects/kudlit.webp",
      alt: "Kudlit v1.0.0 release banner — Baybayin scanner, translator, and learning companion",
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
    },
  },
  // DAMAY (Top 5 of 105 — Stellar PH 2026) intentionally absent for now per
  // Ken (2026-06-10); restore as a `stamp: true` card when content is ready.
];

/** "Now building" live card — edit freely; keep it true. */
export const nowBuilding = {
  title: "Now building",
  body: "THE TRACE — this portfolio, rebuilt as a documented Next.js system with a RAG chat over its own content.",
};
