// =============================================================================
// TECH STACK — categorized, icon-backed, résumé-true.
// Each item: { name, icon (react-icons component), status }
//   status: "core"    -> shipping with it in production today
//           "growing" -> actively learning / next on the roadmap
// Add a tool = add one line. Icons come from Simple Icons via react-icons/si.
// =============================================================================

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiKotlin,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiMysql,
  SiOpenai,
  SiClaude,
  SiGooglegemini,
  SiN8N,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiHuggingface,
  SiLangchain,
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiThreedotjs,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiExpo,
  SiFlutter,
  SiDart,
  SiSwift,
  SiAndroidstudio,
  SiWearos,
  SiNodedotjs,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiSocketdotio,
  SiAmazonwebservices,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiAnthropic,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { TbBrandVscode, TbDatabaseCog, TbPlugConnected } from "react-icons/tb";

export const techCategories = [
  {
    id: "ai-engineering",
    label: "AI Engineering",
    blurb:
      "What I ship at Romega — production RAG pipelines, AI agents, and workflow automation.",
    items: [
      { name: "OpenAI API", icon: SiOpenai, status: "core" },
      { name: "Claude API", icon: SiClaude, status: "core" },
      { name: "Google Gemini", icon: SiGooglegemini, status: "core" },
      { name: "RAG Pipelines", icon: TbDatabaseCog, status: "core" },
      { name: "ChromaDB", icon: TbDatabaseCog, status: "core" },
      { name: "n8n", icon: SiN8N, status: "core" },
      { name: "LangChain", icon: SiLangchain, status: "growing" },
      { name: "Hugging Face", icon: SiHuggingface, status: "growing" },
      { name: "MCP Servers", icon: TbPlugConnected, status: "growing" },
    ],
  },
  {
    id: "ml-data",
    label: "Machine Learning & Data",
    blurb:
      "The ML foundation behind HerbaLens, Pacebeats recommendations, and my coursework.",
    items: [
      { name: "Python", icon: SiPython, status: "core" },
      { name: "TensorFlow", icon: SiTensorflow, status: "core" },
      { name: "Scikit-learn", icon: SiScikitlearn, status: "core" },
      { name: "Computer Vision", icon: SiOpencv, status: "core" },
      { name: "Pandas", icon: SiPandas, status: "core" },
      { name: "NumPy", icon: SiNumpy, status: "core" },
      { name: "Recommendation Systems", icon: TbDatabaseCog, status: "core" },
      { name: "Data Engineering", icon: TbDatabaseCog, status: "growing" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    blurb: "Day-to-day languages across AI, web, and mobile work.",
    items: [
      { name: "Python", icon: SiPython, status: "core" },
      { name: "TypeScript", icon: SiTypescript, status: "core" },
      { name: "JavaScript", icon: SiJavascript, status: "core" },
      { name: "Kotlin", icon: SiKotlin, status: "core" },
      { name: "SQL", icon: SiPostgresql, status: "core" },
      { name: "HTML5", icon: SiHtml5, status: "core" },
      { name: "CSS3", icon: SiCss3, status: "core" },
      { name: "PHP", icon: SiPhp, status: "core" },
      { name: "Swift", icon: SiSwift, status: "growing" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & 3D",
    blurb:
      "Interfaces I design and build — including this site (React 19 + Three.js + GSAP).",
    items: [
      { name: "React", icon: SiReact, status: "core" },
      { name: "Next.js", icon: SiNextdotjs, status: "core" },
      { name: "Astro", icon: SiAstro, status: "core" },
      { name: "Three.js", icon: SiThreedotjs, status: "core" },
      { name: "TailwindCSS", icon: SiTailwindcss, status: "core" },
      { name: "Framer Motion", icon: SiFramer, status: "core" },
      { name: "Vite", icon: SiVite, status: "core" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile & Wearables",
    blurb:
      "Cross-platform and on-body — Pacebeats shipped as Kotlin Android + WearOS.",
    items: [
      { name: "React Native", icon: SiReact, status: "core" },
      { name: "Expo", icon: SiExpo, status: "core" },
      { name: "Flutter", icon: SiFlutter, status: "core" },
      { name: "Dart", icon: SiDart, status: "core" },
      { name: "Kotlin Android", icon: SiAndroidstudio, status: "core" },
      { name: "WearOS", icon: SiWearos, status: "core" },
      { name: "iOS (SwiftUI)", icon: SiSwift, status: "growing" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Database",
    blurb:
      "APIs, realtime, and data layers behind the apps — REST, sockets, and Postgres.",
    items: [
      { name: "Node.js", icon: SiNodedotjs, status: "core" },
      { name: "PostgreSQL", icon: SiPostgresql, status: "core" },
      { name: "Supabase", icon: SiSupabase, status: "core" },
      { name: "Firebase", icon: SiFirebase, status: "core" },
      { name: "Prisma ORM", icon: SiPrisma, status: "core" },
      { name: "Socket.io", icon: SiSocketdotio, status: "core" },
      { name: "MySQL", icon: SiMysql, status: "core" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    blurb:
      "Getting things live and keeping them live — CI/CD, containers, and cloud.",
    items: [
      { name: "AWS", icon: SiAmazonwebservices, status: "core" },
      { name: "Docker", icon: SiDocker, status: "core" },
      { name: "GitHub Actions", icon: SiGithubactions, status: "core" },
      { name: "Vercel", icon: SiVercel, status: "core" },
      { name: "Git", icon: SiGit, status: "core" },
      { name: "Kubernetes", icon: SiKubernetes, status: "growing" },
      { name: "Google Cloud", icon: SiGooglecloud, status: "growing" },
      { name: "Azure", icon: VscAzure, status: "growing" },
    ],
  },
  {
    id: "ai-workflow",
    label: "AI-Assisted Workflow",
    blurb:
      "How I build faster — agentic coding tools wired into a disciplined review loop.",
    items: [
      { name: "Claude Code", icon: SiAnthropic, status: "core" },
      { name: "Cursor", icon: TbBrandVscode, status: "core" },
      { name: "GitHub Copilot", icon: SiGithub, status: "core" },
      { name: "OpenAI Codex", icon: SiOpenai, status: "core" },
      { name: "v0", icon: SiVercel, status: "core" },
      { name: "Qwen", icon: TbPlugConnected, status: "core" },
    ],
  },
];

/** Legend copy used by the TechStack section. */
export const techLegend = {
  core: "Shipping with it now",
  growing: "Actively growing",
};
