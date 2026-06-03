/**
 * Chip — mono tag using the branch's chip classes.
 *   tone="muted"  -> neutral `.chip-muted` (dense tech-tag lists)
 *   tone="accent" -> brand `.chip`
 * TagList — renders an array with optional `max` + "+N" overflow.
 */

export const Chip = ({ children, tone = "muted", className = "" }) => (
  <span className={`${tone === "accent" ? "chip" : "chip-muted"} ${className}`}>
    {children}
  </span>
);

const TagList = ({ tags = [], max, tone = "muted", className = "", label = "Technologies" }) => {
  if (!tags.length) return null;
  const shown = max ? tags.slice(0, max) : tags;
  const overflow = max ? tags.length - shown.length : 0;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {shown.map((t) => (
        <li key={t}>
          <Chip tone={tone}>{t}</Chip>
        </li>
      ))}
      {overflow > 0 && (
        <li>
          <Chip tone={tone}>+{overflow}</Chip>
        </li>
      )}
    </ul>
  );
};

export default TagList;
