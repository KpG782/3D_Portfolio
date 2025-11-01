import React, { useRef, useState } from "react";
import { counterItems } from "../constants/index.js";
import CountUp from "react-countup";
import { FaCode, FaLaptopCode, FaLayerGroup, FaUsers } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  code: <FaCode />,
  laptop: <FaLaptopCode />,
  layers: <FaLayerGroup />,
  users: <FaUsers />,
};

const AnimatedCounter = () => {
  const containerRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".counter-card");

    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            if (!startCounting) setStartCounting(true);
          },
        },
      });
    });
  }, []);

  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32" ref={containerRef}>
      <div className="mx-auto grid-4-cols gap-6">
        {counterItems.map((item, index) => (
          <CounterCard
            key={index}
            item={item}
            index={index}
            startCounting={startCounting}
          />
        ))}
      </div>
    </div>
  );
};

const CounterCard = ({ item, index, startCounting }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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
    const maxTilt = 10;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--start", 0);
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="counter-card card card-border bg-black-200/50 backdrop-blur-sm rounded-xl p-6 md:p-10 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer relative overflow-hidden"
      role="article"
      aria-label={`${item.value}${item.suffix} ${item.label}`}
    >
      {/* Glow effect */}
      <div className="glow pointer-events-none" aria-hidden="true" />

      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-xl"
        aria-hidden="true"
      />

      {/* Floating particles effect */}
      <div
        className="absolute inset-0 overflow-hidden rounded-xl"
        aria-hidden="true"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400/30 rounded-full 
                            ${isHovered ? "animate-float" : "opacity-0"}`}
            style={{
              left: `${20 + i * 30}%`,
              bottom: "0",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Icon with animated background */}
      <div className="relative z-10 mb-4">
        <div className="relative">
          <div
            className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/40 transition-all duration-300 group-hover:scale-150"
            aria-hidden="true"
          />
          <div className="relative size-16 md:size-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <span className="text-blue-400 text-3xl md:text-4xl group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110">
              {iconMap[item.icon]}
            </span>
          </div>
        </div>
      </div>

      {/* Counter with enhanced styling */}
      <div className="relative z-10 flex items-baseline gap-1 text-white text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
        {startCounting ? (
          <CountUp
            end={item.value}
            suffix={item.suffix}
            duration={2.5}
            enableScrollSpy
            scrollSpyOnce
            className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          />
        ) : (
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            0{item.suffix}
          </span>
        )}
      </div>

      {/* Label with hover effect */}
      <div className="relative z-10 text-white-50 text-sm md:text-base text-center font-medium group-hover:text-white-70 transition-colors duration-300 px-2">
        {item.label}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/50 transition-all duration-500"
        aria-hidden="true"
      />
    </div>
  );
};

export default AnimatedCounter;
