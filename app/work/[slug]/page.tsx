import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TraceDiagram from "@/components/TraceDiagram";
import EvalBoard from "@/components/EvalBoard";
import ScrollDepth from "@/components/ScrollDepth";
import InView from "@/components/InView";
import ChatLauncher from "@/components/chat/ChatLauncher";
import { caseStudies, caseStudyDates, getCaseStudy } from "@/data/case-studies";
import { site } from "@/data/site";

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
  // openGraph/twitter must be overridden per page — Next merges metadata
  // per top-level field, so without these every share card carried the
  // homepage title. og:image comes from the opengraph-image file convention.
  const shareTitle = `${cs.name} — case study · ${site.name}`;
  return {
    title: `${cs.name} — case study`,
    description: cs.lead,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${cs.slug}`,
      siteName: site.brand,
      title: shareTitle,
      description: cs.lead,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: cs.lead,
    },
  };
}

function StudySection({
  label,
  children,
  reveal = true,
}: {
  label: string;
  children: React.ReactNode;
  /** First section sits in the initial viewport — revealing it late re-fires LCP. */
  reveal?: boolean;
}) {
  if (!reveal) {
    return (
      <div className="mt-14 md:mt-20">
        <h2 className="station-label">{label}</h2>
        <div className="mt-5">{children}</div>
      </div>
    );
  }
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

  // Server-rendered so AI crawlers (no JS execution) see it in initial HTML.
  // author/publisher resolve to the Person node in the root layout's graph.
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${site.url}/work/${cs.slug}#article`,
        headline: `${cs.name} — case study`,
        description: cs.lead,
        url: `${site.url}/work/${cs.slug}`,
        image: `${site.url}${cs.image.src}`,
        datePublished: caseStudyDates.published,
        dateModified: caseStudyDates.modified,
        author: { "@id": `${site.url}/#person` },
        publisher: { "@id": `${site.url}/#person` },
        isPartOf: { "@id": `${site.url}/#website` },
        keywords: cs.stack.join(", "),
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/work/${cs.slug}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${site.url}/`,
          },
          { "@type": "ListItem", position: 2, name: cs.name },
        ],
      },
    ],
  };

  return (
    <>
      <Nav />
      <main
        id="main-content"
        className="mx-auto max-w-[1152px] px-5 pt-32 pb-10 md:px-8 md:pt-40"
      >
        <div className="request-rail pl-6 md:pl-10">
          <p className="station-label flex items-center gap-2">
            <img
              src={cs.icon}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-[4px]"
            />
            [ TRACE · {cs.name.toUpperCase()} ]
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-bold md:text-5xl">
            {cs.lead}
          </h1>
          <p className="mt-5 font-mono text-xs leading-relaxed text-telemetry">
            {cs.role}
            <span className="mx-2 text-white/20">|</span>
            {cs.status}
          </p>

          <StudySection label="[ THE PROBLEM ]" reveal={false}>
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
            <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={cs.image.src}
                alt={cs.image.alt}
                width={cs.image.width}
                height={cs.image.height}
                sizes="(min-width: 1152px) 66rem, 100vw"
                className="w-full"
              />
              <figcaption className="border-t border-white/8 bg-panel px-4 py-2.5 font-mono text-[11px] leading-relaxed text-telemetry">
                <span className="text-pulse">[ SCREEN · {cs.name.toUpperCase()} ]</span>{" "}
                {cs.image.alt}
              </figcaption>
            </figure>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <ScrollDepth slug={cs.slug} />
      <ChatLauncher />
    </>
  );
}
