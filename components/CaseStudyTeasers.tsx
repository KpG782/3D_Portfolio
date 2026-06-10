import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import InView from "./InView";

export default function CaseStudyTeasers() {
  return (
    <InView className="reveal">
      <div className="grid gap-4 md:grid-cols-3">
        {caseStudies.map((cs, i) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            data-track="project_card_click"
            data-track-id={`teaser-${cs.slug}`}
            className="panel-card group flex flex-col justify-between p-6 transition-colors duration-200 hover:border-pulse/40"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div>
              <p className="station-label">[ TRACE · {cs.name.toUpperCase()} ]</p>
              <p className="mt-3 text-lg leading-snug font-semibold text-signal">
                {cs.lead}
              </p>
            </div>
            <p className="mt-6 font-mono text-xs text-pulse">
              follow the request →
            </p>
          </Link>
        ))}
      </div>
    </InView>
  );
}
