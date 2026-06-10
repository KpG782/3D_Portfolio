import { caseStudies } from "@/data/case-studies";
import { nowBuilding, shipLog } from "@/data/projects";
import { awards, certifications } from "@/data/awards";
import { lab } from "@/data/lab";
import { talk, communities } from "@/data/talks";
import { site, heroChips } from "@/data/site";

export type Chunk = { id: string; source: string; text: string };

/**
 * Retrieval corpus assembled from the same data files that render the site —
 * the chat can only say what the site says. Upgrade path: embed these chunks
 * into Supabase pgvector and swap `retrieve()`; the shape stays the same.
 */
function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];
  const add = (id: string, source: string, text: string) =>
    chunks.push({ id, source, text: text.trim() });

  add(
    "identity",
    "About Ken",
    `${site.name} (${site.brand}) is an ${site.role} based in ${site.location}. ${site.positioning} Status: ${site.status}. Email: ${site.email}. ${site.linkedInFollowers} followers on LinkedIn. Proof: ${heroChips.join(" · ")}.`,
  );
  add(
    "experience",
    "Experience",
    "Ken works at Romega Solutions as an AI Full-Stack Engineer (Jul 2025–present, remote, part-time). Past roles: Software Engineer at CodeVF (real-time collaboration, WebSockets), AI Workflow Automation Engineer at University of Makati (n8n), Lead Software Engineer on Pacebeats, freelance full-stack web (8+ client sites), Flutter developer (5+ cross-platform apps), and technical support at Concentrix. Education: BS Computer Science at University of Makati, expected 2026.",
  );
  add(
    "teamos",
    "TeamOS (internal ops hub)",
    "TeamOS is the portfolio codename for an internal operations platform Ken built solo in about 3 months for a distributed digital services team — the client is not named publicly. It replaced 4+ separate SaaS tools with one hub: project management and ticketing (kanban, sprints, comments, activity feeds), attendance with live presence and a policy-driven weekly overtime cap with admin approval, a recruiting ATS with a public application form, automated resume parsing via n8n, and a consent-gated (double opt-in) public talent pool, a full LMS with server-graded quizzes, cohort assignments, and auto-generated PDF certificates, plus LLM-powered daily executive briefings and AI status-report drafting that land in human review queues. Scale: 46 pages, 56 API route handlers, 31 Postgres tables, ~42K lines of TypeScript. He led the migration off a third-party PM SaaS — SQLite to Supabase Postgres with Drizzle ORM, custom JWT to Supabase Auth + Google OAuth — and shipped four-tier RBAC with middleware route guards. The system is internal; an architecture walkthrough is available on request.",
  );

  for (const item of shipLog) {
    add(
      `log-${item.id}`,
      item.title,
      `${item.title}: ${item.lead}${item.body ? ` ${item.body}` : ""} Stack: ${item.stack.join(", ")}.${item.repo ? ` Repo: ${item.repo}.` : ""}${item.live ? ` Live: ${item.live}.` : ""}`,
    );
  }
  add("now-building", "Now building", nowBuilding.body);

  for (const cs of caseStudies) {
    add(
      `${cs.slug}-overview`,
      cs.name,
      `${cs.name} — ${cs.lead} Role: ${cs.role}. Status: ${cs.status}.${cs.links.repo ? ` Repo: ${cs.links.repo}.` : ""}${cs.links.live ? ` Live: ${cs.links.live}.` : ""}`,
    );
    cs.problem.forEach((p, i) => add(`${cs.slug}-problem-${i}`, cs.name, p));
    cs.how.forEach((p, i) => add(`${cs.slug}-how-${i}`, cs.name, p));
    cs.annotations.forEach((p, i) => add(`${cs.slug}-note-${i}`, cs.name, p));
    cs.tradeoffs.forEach((t, i) =>
      add(`${cs.slug}-tradeoff-${i}`, cs.name, `Trade-off — ${t.title}: ${t.body}`),
    );
    add(
      `${cs.slug}-results`,
      cs.name,
      `${cs.name} results: ${cs.results.map((r) => `${r.value} (${r.label})`).join("; ")}.${cs.resultsNote ? ` ${cs.resultsNote}` : ""} Stack: ${cs.stack.join(", ")}.`,
    );
  }

  add(
    "awards",
    "Awards",
    `Awards: ${awards.map((a) => `${a.place} — ${a.event} (${a.project})`).join("; ")}.`,
  );
  add(
    "certs",
    "Certifications",
    `Certifications: ${certifications.map((c) => c.name).join("; ")}.`,
  );
  add(
    "lab",
    "The lab",
    `${lab.intro} Hardware: ${lab.nodes.map((n) => `${n.name} (${n.spec}) — ${n.runs}`).join("; ")}.`,
  );
  add(
    "talk",
    "Talks",
    `Ken's first conference talk: "${talk.title}" at ${talk.event}, hosted by ${talk.host} (${talk.venue}, ${talk.year}). ${talk.blurb} Takeaway: ${talk.takeaway} Communities: ${communities.map((c) => c.name).join(", ")}.`,
  );

  return chunks;
}

export const corpus: Chunk[] = buildCorpus();
