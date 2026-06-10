export type TraceStage = {
  id: string;
  label: string;
  /** Mono sub-label under the node. */
  sub?: string;
};

export type Tradeoff = { title: string; body: string };

export type CaseStudy = {
  slug: string;
  name: string;
  /** Quantified result or concrete shipped fact — the page lead. */
  lead: string;
  role: string;
  status: string;
  /** Project brand icon, pulled from the project's own repo assets. */
  icon: string;
  /** Real product screenshot (from the project's own assets). */
  image: { src: string; alt: string; width: number; height: number };
  problem: string[];
  /** Trace diagram definition — stages light up in order on scroll. */
  spanLabel: string;
  stages: TraceStage[];
  annotations: string[];
  how: string[];
  tradeoffs: Tradeoff[];
  /**
   * "What broke" is first-class but never invented. Until Ken documents the
   * incident, the section renders an honest pending state.
   */
  broke: { incident: string; fix: string } | null;
  results: { value: string; label: string }[];
  resultsNote?: string;
  stack: string[];
  links: { repo?: string; live?: string };
  /** Eval scoreboard — parked until a real eval set exists (2026-06-10). */
  evalBoard?: boolean;
};

/** Case-study content dates (git-derived) — bump `modified` when editing copy.
    Feeds TechArticle JSON-LD and sitemap lastModified. */
export const caseStudyDates = {
  published: "2026-06-10",
  modified: "2026-06-11",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "lexinsight",
    name: "LexInSight",
    lead: "Legal RAG over Philippine law — dual-mode chat, live in beta.",
    role: "Full-stack — RAG core, realtime chat, database architecture",
    status: "In progress (beta)",
    icon: "/images/icons/lexinsight.webp",
    // Image association comes from Ken's original site data (this file was
    // LexInSight's project image there) — caption describes only what's visible.
    image: {
      src: "/images/hero/lexinsight.webp",
      alt: "The LexInSight team at CodeKada — The Innovation Hackathon (DevKada × KMC, Makati, Nov 2025)",
      width: 2048,
      height: 1150,
    },
    problem: [
      "Philippine legal knowledge sits behind expensive consultations. Individuals, small businesses, and student organizations navigate compliance requirements blind — the documents are public, but reading them like a lawyer isn't.",
      "LexInSight is a legal assistant over Philippine law: ask in plain language, get answers grounded in retrieved statute text — with a compliance mode that checks documents you upload against the requirements that apply to them.",
    ],
    spanLabel: "SPAN · RETRIEVAL PIPELINE",
    stages: [
      { id: "query", label: "Query", sub: "plain language" },
      { id: "embed", label: "Embed", sub: "query vector" },
      { id: "retrieve", label: "Retrieve", sub: "pgvector · RLS-scoped" },
      { id: "generate", label: "Generate", sub: "grounded answer" },
      { id: "stream", label: "Stream", sub: "realtime channel" },
    ],
    annotations: [
      "Every retrieval is scoped by Postgres Row Level Security — tenant isolation lives in the database, not in application code.",
      "Compliance mode checks up to three uploaded documents (5MB each) against retrieved Philippine legal requirements.",
    ],
    how: [
      "Next.js App Router front to back in TypeScript. Supabase provides Postgres, auth, and realtime; documents are chunked and embedded into pgvector, so rows, vectors, and access policies live in one database.",
      "Chat runs in two modes: general legal Q&A, and a compliance mode that accepts up to three uploaded documents (5MB each) and checks them against retrieved Philippine legal requirements. Answers stream over a realtime channel.",
    ],
    tradeoffs: [
      {
        title: "pgvector inside Postgres, not a dedicated vector database",
        body: "Keeping vectors next to relational rows means Row Level Security covers retrieval too, and there's one backup, one connection pool, one source of truth. The cost is raw similarity-search performance at scale — acceptable for a corpus of statutes; revisit if the corpus grows by orders of magnitude.",
      },
      {
        title: "Tenant isolation in the database, not the app layer",
        body: "RLS policies mean a leaked query can't cross tenants even if application code has a bug. The cost: policies are harder to write and debug than `where` clauses, and every new table needs its policy thought through.",
      },
      {
        title: "Two modes, one retrieval pipeline",
        body: "General legal Q&A and compliance document-checking share the same retrieval stack instead of living as separate tools — one corpus, one ranking path to maintain. The cost is prompting that has to adapt per mode, and a single pipeline whose failures affect both surfaces.",
      },
    ],
    broke: null,
    results: [
      { value: "Live", label: "public beta — lexinsights.vercel.app" },
      { value: "2", label: "chat modes — general & compliance" },
      { value: "3×5MB", label: "documents checked per compliance run" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "RLS",
      "Realtime",
      "Zustand",
      "Tailwind CSS",
    ],
    links: {
      repo: "https://github.com/KpG782/Lexinsights",
      live: "https://lexinsights.vercel.app",
    },
  },
  {
    slug: "beacon",
    name: "Beacon",
    lead: "Research that compounds — an agent with persistent memory, shipped solo.",
    role: "Solo build — agent, memory layer, full stack",
    status: "Live · built for Vercel Zero to Agent Hackathon 2026",
    icon: "/images/icons/beacon.svg",
    image: {
      src: "/images/projects/beacon.webp",
      alt: "Beacon's landing page — durable research agent, built for Vercel Zero to Agent 2026",
      width: 2048,
      height: 1347,
    },
    problem: [
      "Most AI research tools reset every session: no memory, no continuity, no sense of what you already learned. Every conversation starts at zero, and the tenth research session is no smarter than the first.",
      "Beacon is a research agent whose memory persists — findings from one session are retrievable in the next, so research builds on itself instead of repeating.",
    ],
    spanLabel: "SPAN · COMPOUND LOOP",
    stages: [
      { id: "intent", label: "Intent", sub: "research question" },
      { id: "plan", label: "Plan", sub: "structured framework" },
      { id: "recall", label: "Recall", sub: "memory read" },
      { id: "research", label: "Research", sub: "generate + validate" },
      { id: "commit", label: "Commit", sub: "memory write" },
    ],
    annotations: [
      "The loop closes: what stage 5 writes, stage 3 retrieves next session. The agent's tenth session starts where the ninth ended.",
      "Structured frameworks keep research repeatable — the same question type follows the same validation path every time.",
    ],
    how: [
      "Next.js and the Vercel AI SDK drive the agent loop in TypeScript. Research follows structured frameworks rather than freeform prompting, and every session's findings are written to a vector memory store that future sessions retrieve from.",
      "Built end-to-end solo — agent design, memory layer, and UI — and shipped for the Vercel Zero to Agent Hackathon 2026.",
    ],
    tradeoffs: [
      {
        title: "Persistent memory over stateless chat",
        body: "Statelessness is simpler — no storage, no retrieval relevance problems, no stale-memory risk. Beacon takes the harder path because the entire premise is continuity: the value of session N is that sessions 1 through N−1 are still in play.",
      },
      {
        title: "Structured frameworks over a freeform agent",
        body: "A freeform agent feels more magical demo-to-demo but produces unrepeatable research. Frameworks constrain the agent to validation paths that can be trusted — and make its memory entries consistent enough to retrieve usefully later.",
      },
    ],
    broke: null,
    results: [
      { value: "Solo", label: "designed, built, and shipped end-to-end" },
      { value: "Live", label: "deployed and usable today" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "RAG",
      "Vector memory",
      "Tailwind CSS",
    ],
    links: {
      repo: "https://github.com/KpG782/Beacon",
      live: "https://beacon-mu-murex.vercel.app/",
    },
  },
  {
    slug: "pacebeats",
    name: "Pacebeats",
    lead: "1st Runner-Up — InfoTech Olympics 2025 (University of Makati), Android App Development: Productivity.",
    role: "Lead — WearOS app, recommendation engine, architecture",
    status: "Shipped · team of 4",
    icon: "/images/icons/pacebeats.svg",
    image: {
      src: "/images/hero/pacebeats.webp",
      alt: "The Pacebeats team taking 1st Runner-Up at InfoTech Olympics 2025",
      width: 1280,
      height: 720,
    },
    problem: [
      "Workout music doesn't react to the body. Runners pick a playlist before the run and live with it — the music has no idea whether you're warming up, pushing a sprint, or cooling down.",
      "Pacebeats reads live heart rate and inter-beat intervals from a Galaxy Watch 6 and adapts the playlist to your actual physiological state, in real time.",
    ],
    spanLabel: "SPAN · BIOMETRIC PIPELINE",
    stages: [
      { id: "sense", label: "Sense", sub: "HR + IBI · Watch 6" },
      { id: "map", label: "Map", sub: "pace → BPM rules" },
      { id: "score", label: "Score", sub: "content-based ML" },
      { id: "queue", label: "Queue", sub: "playlist update" },
      { id: "play", label: "Play", sub: "Spotify SDK" },
    ],
    annotations: [
      "Sensing runs on the watch (Kotlin, Health Services API); the phone syncs via the Data Layer API and owns playback.",
      "The whole sensing pipeline is shaped by one constraint: 8+ hours of battery on the watch.",
    ],
    how: [
      "A WearOS app written in Kotlin against the Health Services API streams heart rate and inter-beat intervals; GPS tracks pace. The companion Android app receives the stream over the Data Layer API and drives playback through the Spotify SDK.",
      "Recommendations are hybrid: deterministic pace-to-BPM mapping picks the tempo band, then content-based ML scoring over the user's listening patterns ranks tracks inside it. A React/TypeScript dashboard and Supabase backend close the loop. MVVM throughout.",
    ],
    tradeoffs: [
      {
        title: "Hybrid recommender — rules pick the band, ML ranks within it",
        body: "Pure ML can recommend a great song at the wrong tempo, and wrong tempo is the one unforgivable failure in a pacing app. Deterministic pace→BPM rules make tempo errors impossible; ML only spends its judgment where mistakes are survivable — track choice within the band.",
      },
      {
        title: "Sense on the watch, decide on the phone",
        body: "Running the recommender on the watch would cut sync latency but eat the battery that sensing needs. Splitting the pipeline — watch senses, phone decides — was what made the 8+ hour battery target reachable.",
      },
      {
        title: "Spotify SDK over a custom player",
        body: "Owning playback would allow finer crossfade control, but it means licensing, offline caching, and a music catalog. Integrating Spotify traded polish at the edges for a real catalog on day one.",
      },
    ],
    broke: null,
    results: [
      { value: "1st Runner-Up", label: "InfoTech Olympics 2025 · Android App Development: Productivity" },
      { value: "8+ hrs", label: "watch battery with live sensing" },
      { value: "Real-time", label: "playlist adaptation to heart rate" },
    ],
    stack: [
      "Kotlin",
      "WearOS",
      "Health Services API",
      "Data Layer API",
      "Spotify SDK",
      "React",
      "TypeScript",
      "Supabase",
      "MVVM",
    ],
    links: {
      repo: "https://github.com/KpG782/pacebeats-release-files",
      live: "https://www.pacebeats.top/",
    },
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
