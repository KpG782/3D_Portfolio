import React, { useRef } from "react";

const GlowCard = ({ card, children, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    // Get the mouse position relative to card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Calculate the angle from the center of the card
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", angle + 60);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset glow effect when mouse leaves
    card.style.setProperty("--start", 0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card card-border timeline-card rounded-xl p-6 sm:p-8 md:p-10 mb-5 break-inside-avoid-column transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500"
      role="article"
      aria-label={`Review card ${index + 1}`}
    >
      {/* Glow effect */}
      <div className="glow pointer-events-none" aria-hidden="true" />

      {/* Star rating */}
      <div
        className="flex items-center gap-1 mb-4 sm:mb-5"
        role="img"
        aria-label="5 star rating"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <img
            src="/images/star.png"
            key={i}
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5"
            loading="lazy"
          />
        ))}
        <span className="sr-only">5 out of 5 stars</span>
      </div>

      {/* Review text */}
      {card.review && (
        <div className="mb-4 sm:mb-5">
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {card.review}
          </p>
        </div>
      )}

      {/* Children content */}
      {children}
    </div>
  );
};

export default GlowCard;
