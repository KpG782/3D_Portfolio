import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TraceDiagram from "@/components/TraceDiagram";
import EvalBoard from "@/components/EvalBoard";
import ScrollDepth from "@/components/ScrollDepth";
import InView from "@/components/InView";
import ChatLauncher from "@/components/chat/ChatLauncher";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — case study`,
    description: cs.lead,
    alternates: { canonical: `/work/${cs.slug}` },
  };
}

function StudySection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <InView className="reveal mt-14 md:mt-20">
      <h2 className="station-label">{label}</h2>
      <div className="mt-5">{children}</div>
    </InView>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1152px] px-5 pt-32 pb-10 md:px-8 md:pt-40">
        <div className="request-rail pl-6 md:pl-10">
          <p className="station-label">[ TRACE · {cs.name.toUpperCase()} ]</p>
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-bold md:text-5xl">
            {cs.lead}
          </h1>
          <p className="mt-5 font-mono text-xs leading-relaxed text-telemetry">
            {cs.role}
            <span className="mx-2 text-white/20">|</span>
            {cs.status}
          </p>

          <StudySection label="[ THE PROBLEM ]">
            {cs.problem.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-signal/90">
                {p}
              </p>
            ))}
          </StudySection>

          <StudySection label="[ HOW IT WORKS ]">
            <TraceDiagram
              spanLabel={cs.spanLabel}
              stages={cs.stages}
              annotations={cs.annotations}
            />
            {cs.how.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-signal/90">
                {p}
              </p>
            ))}
            {cs.evalBoard ? (
              <div className="mt-8">
                <EvalBoard />
              </div>
            ) : null}
          </StudySection>

          <StudySection label="[ TRADE-OFFS I MADE ]">
            <ol className="space-y-6">
              {cs.tradeoffs.map((t, i) => (
                <li key={t.title} className="panel-card p-5 md:p-6">
                  <p className="font-mono text-xs text-pulse">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-signal/85">
                    {t.body}
                  </p>
                </li>
              ))}
            </ol>
          </StudySection>

          <StudySection label="[ WHAT BROKE ]">
            {cs.broke ? (
              <div className="panel-card border-l-2 !border-l-fault/70 p-5 md:p-6">
                <p className="font-mono text-xs text-fault">INCIDENT</p>
                <p className="mt-2 leading-relaxed text-signal/90">
                  {cs.broke.incident}
                </p>
                <p className="mt-4 font-mono text-xs text-pass">FIX</p>
                <p className="mt-2 leading-relaxed text-signal/90">
                  {cs.broke.fix}
                </p>
              </div>
            ) : (
              <div className="panel-card border-l-2 !border-l-warn/60 p-5 md:p-6">
                <p className="font-mono text-xs text-warn">
                  INCIDENT NOTE · PENDING
                </p>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-telemetry">
                  Every system here has broken at least once. This section gets
                  written from the engineer's incident notes, not generated —
                  the honest version is coming.
                </p>
              </div>
            )}
          </StudySection>

          <StudySection label="[ RESULTS ]">
            <dl className="grid gap-4 sm:grid-cols-3">
              {cs.results.map((r) => (
                <div key={r.label} className="panel-card p-5">
                  <dt className="order-2 mt-1 text-xs leading-snug text-telemetry">
                    {r.label}
                  </dt>
                  <dd className="font-mono text-2xl font-semibold text-signal">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
            {cs.resultsNote ? (
              <p className="mt-4 font-mono text-xs leading-relaxed text-telemetry">
                <span className="text-warn">▸</span> {cs.resultsNote}
              </p>
            ) : null}
          </StudySection>

          <StudySection label="[ STACK ]">
            <ul className="flex flex-wrap gap-2">
              {cs.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
              {cs.links.repo ? (
                <a
                  href={cs.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pulse hover:underline"
                >
                  repository ↗
                </a>
              ) : null}
              {cs.links.live ? (
                <a
                  href={cs.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pulse hover:underline"
                >
                  live ↗
                </a>
              ) : null}
            </div>
          </StudySection>

          <div className="mt-16 border-t border-white/8 pt-8">
            <Link
              href={`/work/${next.slug}`}
              className="font-mono text-sm text-pulse hover:underline"
            >
              next trace: {next.name} →
            </Link>
            <span className="mx-3 text-white/20">|</span>
            <Link
              href="/#case-studies"
              className="font-mono text-sm text-telemetry hover:text-signal"
            >
              all case studies
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollDepth slug={cs.slug} />
      <ChatLauncher />
    </>
  );
}
