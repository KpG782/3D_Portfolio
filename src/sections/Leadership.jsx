import { leadership } from "../constants/resume.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";

const Leadership = () => (
  <section
    id="leadership"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-primary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// community"
        title="Leadership & Community"
        description="Where I organize, mentor, and give back beyond shipping code."
      />

      <div className="mt-12 md:mt-16 grid-3-cols">
        {leadership.map((l, i) => (
          <RevealOnScroll
            as="article"
            key={l.id}
            delay={i * 0.08}
            className="gradient-frame p-6 md:p-7 flex flex-col"
          >
            <h3 className="text-lg md:text-xl font-semibold text-theme-primary">{l.org}</h3>
            <span className="chip mt-3 w-fit">{l.role}</span>
            <p className="mono-meta mt-3">
              {l.period} · {l.location}
            </p>
            <p className="mt-4 text-theme-secondary text-sm md:text-base leading-relaxed">
              {l.detail}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default Leadership;
