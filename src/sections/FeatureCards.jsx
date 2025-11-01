import React, { useRef } from "react";
import { abilities } from "../constants/index.js";

const FeatureCards = () => {
  return (
    <div className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols gap-6">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} ability={ability} index={index} />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ ability, index }) => {
  const cardRef = useRef(null);
  const { imgPath, title, desc } = ability;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Calculate angle for glow effect
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);

    // Calculate tilt effect
    const maxTilt = 8;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--start", 0);
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card card-border rounded-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl focus-within:scale-[1.02] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 group cursor-pointer"
      role="article"
      aria-labelledby={`feature-title-${index}`}
      tabIndex={0}
    >
      {/* Glow effect */}
      <div className="glow pointer-events-none" aria-hidden="true" />

      {/* Icon container with hover effect */}
      <div className="size-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
        <img
          src={imgPath}
          alt=""
          className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* Title with gradient on hover */}
      <h3
        id={`feature-title-${index}`}
        className="text-white text-2xl font-semibold mt-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent"
      >
        {title}
      </h3>

      {/* Description with improved readability */}
      <p className="text-white-50 text-lg leading-relaxed transition-colors duration-300 group-hover:text-white-70">
        {desc}
      </p>

      {/* Subtle bottom indicator */}
      <div className="mt-auto pt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-sm font-medium">Learn more</span>
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default FeatureCards;
