import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { featuredBuild } from "@/data/projects";

/**
 * The only cards on the page — three flagship traces plus the champion
 * build. Rendered without a reveal animation on purpose: this block can
 * intersect the initial viewport, and late-fading fold content re-fires LCP.
 * Hover motion is transform-only inside overflow-hidden (no layout shift).
 */

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video overflow-hidden border-b border-white/10">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}

export default function CaseStudyCards() {
  return (
    <div id="case-studies" className="grid gap-4 sm:grid-cols-2">
      {caseStudies.map((cs) => (
        <Link
          key={cs.slug}
          href={`/work/${cs.slug}`}
          data-track="project_card_click"
          data-track-id={cs.slug}
          className="glass group flex flex-col overflow-hidden transition-colors duration-200 hover:border-pulse/40"
        >
          <CardImage src={cs.image.src} alt="" />
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <p className="station-label flex items-center gap-2">
                <img
                  src={cs.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] rounded-[4px]"
                />
                [ TRACE · {cs.name.toUpperCase()} ]
              </p>
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

      <a
        href={featuredBuild.repo}
        target="_blank"
        rel="noopener noreferrer"
        data-track="project_card_click"
        data-track-id={featuredBuild.id}
        className="glass group flex flex-col overflow-hidden transition-colors duration-200 hover:border-brass/40"
      >
        <CardImage src={featuredBuild.image!.src} alt="" />
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <p className="station-label flex items-center gap-2">
              <img
                src={featuredBuild.icon}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-[4px]"
              />
              [ BUILD · {featuredBuild.title.toUpperCase()} ]
            </p>
            <p className="mt-3 text-[15px] leading-snug font-semibold text-signal md:text-base">
              {featuredBuild.lead}
            </p>
          </div>
          <p className="mt-5 font-mono text-xs text-brass">view the build ↗</p>
        </div>
      </a>
    </div>
  );
}
