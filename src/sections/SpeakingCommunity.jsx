import { useState } from "react";
import { talks, communities, leadership } from "../constants/resume.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import RevealOnScroll from "../components/ui/RevealOnScroll.jsx";

/** Small mic badge for milestone talks (no emoji — inline SVG). */
const MicBadge = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold w-fit"
    style={{
      backgroundColor: "var(--accent-soft)",
      color: "var(--accent)",
      border: "1px solid color-mix(in srgb, var(--accent) 28%, transparent)",
    }}
  >
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
    </svg>
    {children}
  </span>
);

/** Talk photo with a tasteful fallback until a real stage photo is added. */
const TalkMedia = ({ photo, alt }) => {
  const [ok, setOk] = useState(true);

  if (photo && ok) {
    return (
      <img
        src={photo}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover aspect-[4/3]"
        onError={() => setOk(false)}
      />
    );
  }

  return (
    <div
      className="w-full h-full aspect-[4/3] flex flex-col items-center justify-center gap-3 text-center px-6"
      style={{ background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-card))" }}
    >
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm7-3a7 7 0 0 1-14 0m7 7v3"
        />
      </svg>
      <p className="mono-meta">
        Add a stage photo at
        <br />
        {photo}
      </p>
    </div>
  );
};

const SpeakingCommunity = () => (
  <section
    id="community"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-primary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// speaking & community"
        title="Speaking & Community"
        description="I stopped just attending events — I started building with everything they teach, and sharing it on stage."
      />

      {/* Talks */}
      <div className="mt-12 md:mt-16 flex flex-col gap-10">
        {talks.map((t, i) => (
          <RevealOnScroll
            as="article"
            key={t.id}
            delay={i * 0.08}
            className="gradient-frame overflow-hidden grid md:grid-cols-2"
          >
            <div className="min-h-[220px]">
              <TalkMedia photo={t.photo} alt={`${t.title} — ${t.event}`} />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              {t.first && <MicBadge>First Speakership</MicBadge>}
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-theme-primary">
                {t.title}
              </h3>
              <p className="mono-meta mt-2">
                {t.event} · {t.host} · {t.venue}
              </p>
              <p className="mt-4 text-theme-secondary text-sm md:text-base leading-relaxed">
                {t.blurb}
              </p>
              {t.takeaway && (
                <p
                  className="mt-5 text-base md:text-lg font-medium text-theme-primary"
                  style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "0.875rem" }}
                >
                  “{t.takeaway}”
                </p>
              )}
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Community wall (text-based — no logo assets required) */}
      <div className="mt-16 md:mt-20">
        <p className="mono-meta text-center">// builds in public across</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {communities.map((c) => (
            <li key={c.name}>
              <span className="chip">
                {c.name}
                {c.note && (
                  <span
                    style={{
                      marginLeft: 6,
                      color: "var(--accent)",
                      fontWeight: 700,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Leadership & service (folded in from the old standalone section) */}
      <div className="mt-16 md:mt-20 grid-3-cols">
        {leadership.map((l, i) => (
          <RevealOnScroll
            as="article"
            key={l.id}
            delay={i * 0.08}
            className="gradient-frame p-6 flex flex-col"
          >
            <h4 className="text-lg font-semibold text-theme-primary">{l.org}</h4>
            <span className="chip mt-3 w-fit">{l.role}</span>
            <p className="mono-meta mt-3">
              {l.period} · {l.location}
            </p>
            <p className="mt-3 text-theme-secondary text-sm leading-relaxed">{l.detail}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default SpeakingCommunity;
