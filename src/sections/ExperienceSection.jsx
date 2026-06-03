import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "../constants/resume.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import TagList from "../components/ui/Chip.jsx";
import { StatusBadge } from "../components/ui/Badge.jsx";
import { SiN8N, SiFlutter, SiKotlin, SiReact, SiSocketdotio } from "react-icons/si";
import { FaRobot, FaMicrochip, FaHeadset, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Role-matched icon per experience node (keyed by exp.icon in resume.js).
const EXP_ICONS = {
  robot: FaRobot,
  socket: SiSocketdotio,
  n8n: SiN8N,
  kotlin: SiKotlin,
  react: SiReact,
  microchip: FaMicrochip,
  flutter: SiFlutter,
  headset: FaHeadset,
  code: FaCode,
};

const ExpIcon = ({ name }) => {
  const Icon = EXP_ICONS[name] || FaCode;
  return (
    <Icon
      className="size-5 md:size-6"
      style={{ color: "var(--accent)" }}
      aria-hidden="true"
    />
  );
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ExperienceSection = () => {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      // Draw the vertical timeline line as the section scrolls.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Reveal each role.
      gsap.utils.toArray(".exp-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="experience"
      className="w-full section-padding"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="// my track"
          title="Experience"
          description="Six roles across AI, full-stack, real-time systems, and field operations — most recent first."
        />

        <div ref={rootRef} className="relative mt-12 md:mt-16 max-w-4xl mx-auto">
          {/* timeline rail */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-0.5 origin-top"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span
              ref={lineRef}
              className="block h-full w-full origin-top"
              style={{ background: "var(--accent-gradient)" }}
            />
          </span>

          <ul className="space-y-8 md:space-y-12">
            {experiences.map((exp) => (
              <li key={exp.id} className="exp-item relative pl-14 md:pl-20">
                {/* node with company logo */}
                <span
                  aria-hidden="true"
                  className="glass-surface absolute left-0 top-4 grid place-items-center size-10 md:size-12 rounded-full"
                  style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, transparent)" }}
                >
                  <ExpIcon name={exp.icon} />
                </span>

                <article className="gradient-frame p-5 md:p-7">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-theme-primary">
                      {exp.role}
                    </h3>
                    <span className="text-theme-tertiary text-lg">@ {exp.company}</span>
                    {exp.current && <StatusBadge className="ml-1">Current</StatusBadge>}
                  </div>

                  <p className="mono-meta mt-1.5">
                    {exp.period} · {exp.location} · {exp.type}
                  </p>

                  <TagList tags={exp.stack} tone="muted" className="mt-3" label="Tech used" />

                  <ul className="mt-4 space-y-2.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-theme-secondary text-sm md:text-base leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
