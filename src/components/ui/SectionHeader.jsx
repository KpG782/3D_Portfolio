import RevealOnScroll from "./RevealOnScroll.jsx";

/**
 * Section header: mono eyebrow (branch `.eyebrow`) + heading + optional description.
 * Consistent rhythm across the new résumé-driven sections.
 *
 * Props: eyebrow, title, description, align ("center"|"left")
 */
const SectionHeader = ({ eyebrow, title, description, align = "center", className = "" }) => {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center mx-auto";

  return (
    <RevealOnScroll className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-semibold tracking-tight text-3xl md:text-5xl text-theme-primary">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-theme-secondary text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
};

export default SectionHeader;
