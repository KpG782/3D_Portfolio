import SectionHeader from "../components/ui/SectionHeader.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";

// Colophon — documents the "Ledger Navy" design system that drives this site.
// Swatches/type read from live CSS tokens, so they adapt with the theme toggle.

const swatches = [
  { name: "Primary", token: "--accent-2", note: "Navy" },
  { name: "Accent", token: "--accent", note: "Honey" },
  { name: "Surface", token: "--bg-card", note: "Card" },
  { name: "Ink", token: "--text-primary", note: "Text" },
  { name: "Hairline", token: "--border-primary", note: "Border" },
];

const typeSamples = [
  { name: "Fraunces", label: "Display / headings", font: "var(--font-display)" },
  { name: "Inter", label: "Body / UI", font: "var(--font-sans)" },
  { name: "JetBrains Mono", label: "Code / meta", font: "var(--font-mono)" },
];

const a11y = [
  "WCAG 2.1 AA contrast — body text ≥ 4.5:1, UI ≥ 3:1",
  "Visible focus rings on every interactive element",
  "Respects prefers-reduced-motion",
  "Semantic HTML, ARIA labels, and a skip-to-content link",
  "Fully keyboard navigable with 44px+ touch targets",
  "Light & dark themes — both pass AA",
];

const Check = () => (
  <svg
    className="w-4 h-4 mt-0.5 flex-shrink-0"
    style={{ color: "var(--accent)" }}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const DesignSystem = () => (
  <section
    id="design-system"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-secondary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// colophon"
        title="Design System"
        description="This portfolio runs on a small, accessible design system I call “Ledger Navy” — themeable CSS tokens, a three-voice type scale, and WCAG 2.1 AA built in, not bolted on."
      />

      <div className="mt-12 md:mt-16 grid lg:grid-cols-3 gap-6">
        {/* Palette */}
        <RevealOnScroll as="article" className="gradient-frame p-6 md:p-7">
          <h3 className="mono-meta">// palette</h3>
          <p className="mt-2 text-theme-secondary text-sm leading-relaxed">
            Navy primary + honey accent over warm-slate neutrals. Every pairing is
            contrast-checked, and the tokens flip cleanly between light and dark.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {swatches.map((s) => (
              <li key={s.token} className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: `var(${s.token})`,
                    border: "1px solid var(--border-primary)",
                  }}
                />
                <span className="text-sm font-medium text-theme-primary">{s.name}</span>
                <span className="mono-meta ml-auto">{s.note}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Typography */}
        <RevealOnScroll as="article" delay={0.08} className="gradient-frame p-6 md:p-7">
          <h3 className="mono-meta">// typography</h3>
          <p className="mt-2 text-theme-secondary text-sm leading-relaxed">
            Three voices: a serif for display, a clean sans for reading, and a
            monospace for code and metadata.
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {typeSamples.map((t) => (
              <li key={t.name} className="flex items-baseline gap-4">
                <span
                  className="text-3xl leading-none flex-shrink-0 w-10 text-theme-primary"
                  style={{ fontFamily: t.font }}
                  aria-hidden="true"
                >
                  Aa
                </span>
                <span className="flex flex-col">
                  <span
                    className="text-base font-medium text-theme-primary"
                    style={{ fontFamily: t.font }}
                  >
                    {t.name}
                  </span>
                  <span className="mono-meta">{t.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Accessibility */}
        <RevealOnScroll as="article" delay={0.16} className="gradient-frame p-6 md:p-7">
          <h3 className="mono-meta">// accessibility</h3>
          <p className="mt-2 text-theme-secondary text-sm leading-relaxed">
            Accessibility is a baseline, not a feature. What that means here:
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {a11y.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-theme-secondary">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>

      <p className="mt-10 text-center mono-meta">
        Built with React + Vite · Tailwind v4 · Three.js · GSAP — design tokens live in{" "}
        <span style={{ color: "var(--accent)" }}>src/index.css</span>
      </p>
    </div>
  </section>
);

export default DesignSystem;
