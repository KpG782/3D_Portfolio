import SectionHeader from "../components/ui/SectionHeader.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";
import { techCategories, techLegend } from "../constants/techstack.js";

/**
 * Tech Stack — categorized, icon-backed, résumé-true.
 * Solid chips = shipping in production today; dashed accent chips = actively
 * growing. Data lives in constants/techstack.js (one line per tool).
 */

const TechChip = ({ name, icon: Icon, status }) => {
  const growing = status === "growing";
  return (
    <li
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
      style={{
        backgroundColor: growing ? "transparent" : "var(--bg-card)",
        border: growing
          ? "1px dashed color-mix(in srgb, var(--accent) 55%, transparent)"
          : "1px solid var(--border-primary)",
        color: growing ? "var(--accent)" : "var(--text-secondary)",
      }}
      title={growing ? techLegend.growing : techLegend.core}
    >
      <Icon aria-hidden="true" className="w-4 h-4 shrink-0" />
      <span className="whitespace-nowrap">{name}</span>
    </li>
  );
};

const TechStack = () => (
  <section id="skills" className="w-full section-padding">
    <div className="max-w-6xl mx-auto md:px-10 px-5">
      <SectionHeader
        eyebrow="// tech stack"
        title="Tools I Ship With"
        description="The full stack behind my AI engineering work — grouped the way I actually use it, from LLM pipelines to the cloud they run on."
      />

      {/* Legend */}
      <RevealOnScroll className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 mono-meta">
          <span
            aria-hidden="true"
            className="inline-block w-3 h-3 rounded"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          />
          {techLegend.core}
        </span>
        <span className="flex items-center gap-2 mono-meta">
          <span
            aria-hidden="true"
            className="inline-block w-3 h-3 rounded"
            style={{
              border:
                "1px dashed color-mix(in srgb, var(--accent) 55%, transparent)",
            }}
          />
          {techLegend.growing}
        </span>
      </RevealOnScroll>

      <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
        {techCategories.map((cat, i) => (
          <RevealOnScroll
            key={cat.id}
            delay={Math.min(i * 0.05, 0.2)}
            className="glass-surface rounded-2xl p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-theme-tertiary">
              {cat.label}
            </h3>
            <p className="mt-2 text-sm text-theme-secondary leading-relaxed">
              {cat.blurb}
            </p>
            <ul
              className="mt-4 flex flex-wrap gap-2"
              aria-label={`${cat.label} tools`}
            >
              {cat.items.map((item) => (
                <TechChip key={`${cat.id}-${item.name}`} {...item} />
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
