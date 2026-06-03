import { education, awards } from "../constants/resume.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import TagList from "../components/ui/Chip.jsx";
import Badge from "../components/ui/Badge.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";

const ColumnLabel = ({ children }) => (
  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-theme-tertiary mb-6">
    {children}
  </h3>
);

const EducationAwards = () => (
  <section
    id="education"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-secondary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// credentials"
        title="Education & Awards"
        description="Where I studied, and the competitions and research that recognized the work."
      />

      <div className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Education */}
        <RevealOnScroll>
          <ColumnLabel>Education</ColumnLabel>
          <div className="space-y-6">
            {education.map((ed) => (
              <article key={ed.id} className="glass-surface rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h4 className="text-lg md:text-xl font-semibold text-theme-primary">
                    {ed.school}
                  </h4>
                  <span className="mono-meta">{ed.period}</span>
                </div>
                <p className="mt-1 text-theme-secondary">
                  {ed.degree} · {ed.major}
                </p>
                <p className="mono-meta mt-1">{ed.location}</p>
                {ed.coursework.length > 0 && (
                  <TagList tags={ed.coursework} tone="muted" className="mt-4" label="Coursework" />
                )}
              </article>
            ))}
          </div>
        </RevealOnScroll>

        {/* Awards */}
        <RevealOnScroll delay={0.1}>
          <ColumnLabel>Awards &amp; Honors</ColumnLabel>
          <ul className="space-y-4">
            {awards.map((a) => (
              <li key={a.id} className="gradient-frame p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge icon={a.icon}>{a.place}</Badge>
                  <span className="mono-meta">{a.year}</span>
                </div>
                <p className="mt-3 font-medium text-theme-primary">{a.event}</p>
                {a.detail && <p className="mono-meta mt-1">{a.detail}</p>}
                <a
                  href="#work"
                  className="mt-2 inline-block text-sm text-theme-tertiary hover:text-theme-primary transition-colors focus-ring-brand rounded"
                >
                  Project: <span className="text-theme-secondary">{a.project}</span> →
                </a>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

export default EducationAwards;
