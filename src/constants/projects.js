// =============================================================================
// PROJECTS — normalized, reusable project template layer.
//
// Source content stays in data.js (no transcription drift). This file maps it
// into ONE clean schema the new Works + Featured Highlights sections consume.
//
// To ADD a new project (incl. iOS): push one object onto `extraProjects` below
// using the shape documented there — it flows into the grid + filters with no
// component changes.
// =============================================================================

import { PROJECTS } from "./data.js";
import { awards } from "./resume.js";

/** Default category per source tab (overridable per project in META). */
const TAB_CATEGORY = ["Full-Stack", "Web", "Frontend", "Other"];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[–—].*$/, "") // drop subtitle after en/em dash
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** First sentence of a description, used as a fallback tagline. */
const firstSentence = (s = "") => {
  const cleaned = s.replace(/^[^A-Za-z0-9]+/, ""); // strip leading emoji/symbols
  const match = cleaned.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : cleaned).trim();
};

/**
 * Per-project overlay matched by a unique substring of the title.
 * `featured: true` promotes a project into Featured Highlights + a large card.
 * `awardId` links to the structured award in resume.js.
 */
const META = [
  {
    key: "ARS",
    id: "ars",
    category: "Mobile",
    featured: true,
    tagline:
      "Emergency roadside assistance connecting stranded motorists to nearby mechanics in real time.",
    awardId: "best-paper",
    metrics: [
      { label: "Paper score", value: "97%" },
      { label: "Built with", value: "Flutter · Firebase" },
    ],
  },
  {
    key: "FlowFit",
    id: "flowfit",
    category: "Mobile",
    featured: true,
    tagline:
      "AI-powered fitness buddy helping kids (7–12) build healthy habits with a whale companion.",
    awardId: "coldstart-champion",
    metrics: [
      { label: "Result", value: "Champion" },
      { label: "Sprint", value: "5-day hackathon" },
    ],
  },
  {
    key: "Pacebeats – Smart",
    id: "pacebeats",
    category: "Mobile",
    featured: true,
    tagline:
      "Biometric music recommender that adapts playlists to your real-time heart rate on Galaxy Watch.",
    awardId: "infotech-olympics",
    metrics: [
      { label: "Result", value: "1st Runner-Up" },
      { label: "Wearable", value: "Galaxy Watch 6" },
    ],
  },
  {
    key: "HerbaLens",
    id: "herbalens",
    category: "AI/ML",
    featured: true,
    tagline:
      "AI medicinal-plant recognition bridging Filipino herbal knowledge with computer vision.",
    awardId: "dost-tapi",
    metrics: [
      { label: "Result", value: "Top 10 / 53" },
      { label: "AI", value: "TensorFlow · CV" },
    ],
  },
  {
    key: "LexInSight",
    id: "lexinsight",
    category: "AI/ML",
    featured: false,
    tagline:
      "AI legal-compliance assistant for Philippine law, powered by RAG and vector search.",
    metrics: [
      { label: "Stack", value: "Next.js 16 · RAG" },
      { label: "Backend", value: "Supabase · pgvector" },
    ],
  },
  {
    key: "CampusCare",
    id: "campuscare",
    category: "AI/ML",
    featured: false,
    tagline:
      "Student wellness platform with DistilBERT mood analysis and counselor booking.",
    metrics: [{ label: "AI", value: "DistilBERT" }],
  },
];

const normalize = (p, tabIndex) => {
  const meta = META.find((m) => p.title.includes(m.key)) || {};
  const award = meta.awardId ? awards.find((a) => a.id === meta.awardId) : null;
  const isRepo = p.link && p.link.includes("github.com");
  return {
    id: meta.id || slugify(p.title),
    title: p.title,
    tagline: meta.tagline || firstSentence(p.desc),
    category: meta.category || TAB_CATEGORY[tabIndex] || "Other",
    featured: !!meta.featured,
    award, // structured award object or null
    role: meta.role || p.myRole || null,
    stack: p.techStack || [],
    metrics: meta.metrics || [],
    summary: p.desc,
    features: p.features || [],
    technicalHighlights: p.technicalHighlights || [],
    achievements: p.achievements || [],
    team: p.members || [],
    img: p.img,
    alt: p.alt || p.title,
    links: {
      repo: isRepo ? p.link : null,
      live: p.demoLink && p.demoLink !== "#" ? p.demoLink : !isRepo ? p.link : null,
    },
    duration: p.duration || null,
    status: p.status || null,
    _tab: tabIndex,
  };
};

/**
 * Append NEW projects here (e.g. iOS work). Shape (only `title` required):
 * {
 *   id, title, tagline, category: "iOS"|"AI/ML"|"Mobile"|"Web"|"Full-Stack"|"Other",
 *   featured: false, stack: [], summary, features: [], metrics: [],
 *   img, alt, links: { repo, live }, role, status
 * }
 */
export const extraProjects = [];

/** Flat, normalized list — the single interface for all project UI. */
export const projects = [
  ...PROJECTS.flatMap((tab, tabIndex) => tab.map((p) => normalize(p, tabIndex))),
  ...extraProjects,
];

/** Award-winning projects for the Featured Highlights section. */
export const featuredProjects = projects.filter((p) => p.featured);

/** Distinct categories (for filter chips), "All" first. */
export const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Helper for filtered grids. */
export const projectsByCategory = (category) =>
  !category || category === "All"
    ? projects
    : projects.filter((p) => p.category === category);
