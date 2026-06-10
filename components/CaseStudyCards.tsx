import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

/**
 * The only cards on the page — three flagship traces. Rendered without a
 * reveal animation on purpose: this block can intersect the initial
 * viewport, and late-fading fold content re-fires LCP.
 */
export default function CaseStudyCards() {
  return (
    <div id="case-studies" className="grid gap-4 md:grid-cols-3">
      {caseStudies.map((cs) => (
        <Link
          key={cs.slug}
          href={`/work/${cs.slug}`}
          data-track="project_card_click"
          data-track-id={cs.slug}
          className="glass group flex flex-col overflow-hidden transition-colors duration-200 hover:border-pulse/40"
        >
          <div className="relative aspect-video border-b border-white/10">
            <Image
              src={cs.image.src}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <p className="station-label">[ TRACE · {cs.name.toUpperCase()} ]</p>
              <p className="mt-3 text-[15px] leading-snug font-semibold text-signal md:text-base">
                {cs.lead}
              </p>
            </div>
            <p className="mt-5 font-mono text-xs text-pulse">
              follow the request →
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
