import React, { useRef } from "react";
import { abilities } from "../constants/index.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";

// "Why work with me" value band — the 3 beliefs a hiring manager needs in 60s.
// Repurposed from the old template feature grid and retuned to Ledger Navy tokens.
const FeatureCards = () => (
  <section
    id="why"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-secondary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// why work with me"
        title="Why teams hire me"
        description="The short version a hiring manager needs — proof I ship, proof others trust it, and the range to own it end to end."
      />

      <div className="mt-12 md:mt-16 grid-3-cols gap-6">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} ability={ability} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = ({ ability, index }) => {
  const cardRef = useRef(null);
  const { imgPath, title, desc } = ability;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 6;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gradient-frame p-7 md:p-8 flex flex-col gap-4 transition-transform duration-300 will-change-transform group"
      role="article"
      aria-labelledby={`feature-title-${index}`}
      tabIndex={0}
    >
      {/* Icon */}
      <div
        className="size-14 flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "var(--accent-soft)" }}
      >
        <img
          src={imgPath}
          alt=""
          className="w-7 h-7 object-contain"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <h3
        id={`feature-title-${index}`}
        className="text-xl md:text-2xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>

      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
};

export default FeatureCards;
