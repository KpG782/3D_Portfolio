import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";
import TagList from "../components/ui/Chip.jsx";
import { journey } from "../constants/resume.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Journey — interactive storytelling timeline. A winding SVG spine draws
 * itself as you scroll (ScrollTrigger scrub on stroke-dashoffset) while the
 * chapter cards alternate left/right of the path. Data: `journey` in resume.js.
 * Honors prefers-reduced-motion (path renders fully drawn, no scrub).
 */

// One wave of the spine per chapter. ViewBox is 100 wide × 200 per chapter;
// preserveAspectRatio="none" stretches it to the real content height, so the
// curve always spans exactly from the first card to the last.
const buildSpinePath = (chapters) => {
  let d = "M 50 0";
  for (let i = 0; i < chapters; i += 1) {
    const y = i * 200;
    const sway = i % 2 === 0 ? 90 : 10; // bulge right, then left
    d += ` C ${sway} ${y + 60}, ${sway} ${y + 140}, 50 ${y + 200}`;
  }
  return d;
};

const JourneySection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const spineD = buildSpinePath(journey.length);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        path.style.strokeDashoffset = "0";
        return;
      }

      path.style.strokeDashoffset = `${length}`;
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      aria-label="Career journey"
      className="w-full section-padding overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto md:px-10 px-5">
        <SectionHeader
          eyebrow="// the journey"
          title="From First Line to AI Engineer"
          description="Five chapters, one through-line: ship real things, then level up. Scroll to draw the path."
        />

        <div ref={sectionRef} className="relative mt-14 md:mt-20">
          {/* Scroll-drawn SVG spine — center on desktop, left rail on mobile */}
          <svg
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox={`0 0 100 ${journey.length * 200}`}
            className="absolute inset-y-0 w-16 md:w-28 h-full pointer-events-none left-1 md:left-1/2 md:-translate-x-1/2"
          >
            {/* faint full track so the route is visible before it's drawn */}
            <path
              d={spineD}
              fill="none"
              stroke="var(--border-primary)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={pathRef}
              d={spineD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative space-y-14 md:space-y-24">
            {journey.map((chapter, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={chapter.id}
                  className={`relative flex md:w-1/2 pl-14 md:pl-0 ${
                    left
                      ? "md:pr-14 md:mr-auto md:justify-end md:text-right"
                      : "md:pl-14 md:ml-auto"
                  }`}
                >
                  {/* node dot pinned to the spine (left rail on mobile, center on desktop) */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 w-3.5 h-3.5 rounded-full left-[36px] -translate-x-1/2 ${
                      left
                        ? "md:left-auto md:right-0 md:translate-x-1/2"
                        : "md:left-0 md:-translate-x-1/2"
                    }`}
                    style={{
                      backgroundColor: "var(--accent)",
                      boxShadow: "0 0 0 5px var(--accent-soft)",
                    }}
                  />
                  <RevealOnScroll
                    className="glass-surface rounded-2xl p-6 w-full max-w-xl"
                    delay={0.05}
                  >
                    <span className="eyebrow">{chapter.year}</span>
                    <h3 className="mt-2 text-xl md:text-2xl font-semibold text-theme-primary">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 text-theme-secondary leading-relaxed">
                      {chapter.story}
                    </p>
                    <TagList
                      tags={chapter.tech}
                      tone="muted"
                      className={`mt-4 ${left ? "md:justify-end" : ""}`}
                      label={`${chapter.title} technologies`}
                    />
                    {chapter.proof && (
                      <p className="mono-meta mt-4">{chapter.proof}</p>
                    )}
                  </RevealOnScroll>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
