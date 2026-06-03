/**
 * Badge — award / status pill with an inline SVG icon (no emoji, no lucide).
 * `icon`: "medal" | "trophy" | "award"  (maps from award.icon in resume.js)
 */

const Trophy = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Medal = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
    <path d="M11 12 5.12 2.2" />
    <path d="m13 12 5.88-9.8" />
    <path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" />
    <path d="M12 18v-2h-.5" />
  </svg>
);

const ICONS = { medal: Medal, trophy: Trophy, award: Medal };

const Badge = ({ icon = "award", children, className = "" }) => {
  const Icon = ICONS[icon] || Medal;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium ${className}`}
      style={{
        color: "var(--accent)",
        backgroundColor: "var(--accent-soft)",
        borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
      }}
    >
      <Icon className="size-3.5 shrink-0" />
      <span>{children}</span>
    </span>
  );
};

/** Pulsing "Open to work" availability indicator. */
export const StatusBadge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium ${className}`}
    style={{
      color: "var(--accent)",
      backgroundColor: "var(--accent-soft)",
      borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
    }}
  >
    <span className="relative flex size-2" aria-hidden="true">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span className="relative inline-flex size-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
    </span>
    {children}
  </span>
);

export default Badge;
