import React, { memo, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { profile } from "../constants/resume.js";

// Neural Network Background Component
const NeuralNetworkBackground = memo(({ theme }) => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let lastFrameTime = 0;
    let isDocumentVisible = document.visibilityState === "visible";
    let isSectionVisible = true;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const maxConnectionDistance = isMobile ? 120 : 160;
    const maxConnectionDistanceSq = maxConnectionDistance * maxConnectionDistance;
    const maxDepthDistance = isMobile ? 110 : 140;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 32) {
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY,
          isActive: true,
        };
        lastMouseUpdate = now;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    sectionObserver.observe(section);

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Enhanced Particle class with 3D depth and chain reaction
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 500 + 100; // Depth for 3D effect
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.2;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.baseX = this.x;
        this.baseY = this.y;
        this.energy = 0; // For chain reaction effect
      }

      update() {
        // Mouse interaction - repulsion with chain reaction
        if (mouseRef.current.isActive) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distanceSq = dx * dx + dy * dy;
          const maxDistance = 150;
          const maxDistanceSq = maxDistance * maxDistance;

          if (distanceSq < maxDistanceSq && distanceSq > 0) {
            const distance = Math.sqrt(distanceSq);
            const force = (1 - distance / maxDistance) * 2;
            this.vx += (dx / distance) * force * 0.1;
            this.vy += (dy / distance) * force * 0.1;
            this.energy = Math.max(this.energy, force * 5); // Build energy
          }
        }

        // Chain reaction - spread energy to nearby particles
        if (this.energy > 0.1) {
          for (const other of particles) {
            if (other === this) continue;
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq < 10000 && distanceSq > 0) {
              const distance = Math.sqrt(distanceSq);
              const energyTransfer = this.energy * 0.3 * (1 - distance / 100);
              other.vx += (dx / distance) * energyTransfer * 0.05;
              other.vy += (dy / distance) * energyTransfer * 0.05;
              other.energy = Math.max(other.energy, energyTransfer * 0.7);
            }
          }
          this.energy *= 0.92; // Decay energy
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        if (this.z < 100 || this.z > 600) this.vz *= -1;

        // Apply damping for smooth movement
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vz *= 0.98;

        // Calculate size based on depth (3D perspective)
        const scale = 300 / this.z;
        this.radius = this.baseRadius * scale * (1 + this.energy * 0.2);
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Color intensity based on depth and energy
        const depthOpacity = (600 - this.z) / 500;
        const baseColor = theme === 'light' ? '31, 78, 122' : '96, 140, 196';
        const opacity = (theme === 'light' ? 0.8 : 0.5) * depthOpacity * (1 + this.energy * 0.5);
        
        ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
        ctx.fill();

        // Add glow effect based on energy
        if (this.energy > 0.1) {
          ctx.shadowBlur = 15 * this.energy;
          ctx.shadowColor = theme === 'light' ? 'rgba(31, 78, 122, 0.8)' : 'rgba(96, 140, 196, 0.8)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = prefersReducedMotion
      ? 10
      : Math.min(
          Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 28000 : 24000)),
          isMobile ? 26 : 42
        );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const centerParticles = prefersReducedMotion ? 0 : isMobile ? 4 : 6;
    for (let i = 0; i < centerParticles; i++) {
      const p = new Particle();
      p.x = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
      p.y = canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
      particles.push(p);
    }

    const animate = (timestamp = 0) => {
      if (!isDocumentVisible || !isSectionVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (timestamp - lastFrameTime < 40) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      // Draw connections with depth-based opacity
      for (let i = 0; i < particles.length; i += 1) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = Math.abs(p1.z - p2.z);
          const distanceSq = dx * dx + dy * dy;

          // Only connect particles at similar depths and close distance
          if (distanceSq < maxConnectionDistanceSq && dz < maxDepthDistance) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const avgDepth = (p1.z + p2.z) / 2;
            const depthOpacity = (600 - avgDepth) / 500;
            const opacity = ((1 - distance / maxConnectionDistance) * 0.42) * depthOpacity;
            
            ctx.strokeStyle = theme === 'light'
              ? `rgba(31, 78, 122, ${opacity})`
              : `rgba(96, 140, 196, ${opacity * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={sectionRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ opacity: theme === 'light' ? 0.5 : 0.42 }}
      />
    </div>
  );
});

// Video Modal Component
const VideoModal = ({ isOpen, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

  // Handle drag start
  const handleMouseDown = (e) => {
    if (!isMinimized) return; // Only draggable when minimized

    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Add global mouse event listeners
  React.useEffect(() => {
    // Handle dragging
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Keep within viewport bounds
      const maxX = window.innerWidth - 400;
      const maxY = window.innerHeight - 250;

      setPosition({
        x: Math.max(20, Math.min(newX, maxX)),
        y: Math.max(20, Math.min(newY, maxY)),
      });
    };

    // Handle drag end
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Reset position when toggling minimize
  React.useEffect(() => {
    if (isMinimized) {
      setPosition({ x: window.innerWidth - 420, y: window.innerHeight - 270 });
    }
  }, [isMinimized]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  // Fullscreen Modal
  if (!isMinimized) {
    return (
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with controls */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center">
            <h3 className="text-white font-semibold">Ken's Introduction</h3>
            <div className="flex gap-2">
              {/* Minimize Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Minimize video"
                title="Minimize"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Close video"
                title="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/nze_7ezndes?autoplay=1"
              title="Ken Patrick Garcia - Introduction"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Minimize Hint/Indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-center gap-3 text-white/80 animate-pulse">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <p className="text-sm font-medium">
                💡 <span className="text-blue-400">Tip:</span> Click minimize
                (—) to continue browsing while listening
              </p>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Minimized Floating Player (PiP)
  return (
    <div
      ref={videoRef}
      className="fixed z-[9999] shadow-2xl rounded-xl overflow-hidden border-2 border-white/20 transition-all duration-300 hover:border-white/40"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "400px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Draggable Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-2 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">
            Ken's Introduction
          </span>
        </div>
        <div className="flex gap-1">
          {/* Maximize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            className="bg-white/10 hover:bg-white/20 text-white rounded p-1.5 transition-all duration-200"
            aria-label="Maximize video"
            title="Maximize"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="bg-white/10 hover:bg-red-500/50 text-white rounded p-1.5 transition-all duration-200"
            aria-label="Close video"
            title="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div
        className="relative w-full bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-auto"
          src="https://www.youtube.com/embed/nze_7ezndes?autoplay=1&controls=1"
          title="Ken Patrick Garcia - Introduction"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Drag Hint */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
        Drag to move
      </div>
    </div>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          [
            ".hero-profile",
            ".hero-text",
            ".hero-description",
            ".hero-buttons",
            ".hero-social",
            ".hero-quick-stat",
          ],
          {
            clearProps: "all",
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }
        );
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.65,
          ease: "power2.out",
        },
      });

      timeline
        .from(".hero-profile", {
          opacity: 0,
          scale: 0.92,
          y: 18,
        })
        .from(
          ".hero-text",
          {
            opacity: 0,
            y: 28,
            stagger: 0.1,
          },
          "-=0.35"
        )
        .from(
          ".hero-description, .hero-buttons",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".hero-social, .hero-quick-stat",
          {
            opacity: 0,
            y: 16,
            stagger: 0.05,
            duration: 0.45,
          },
          "-=0.2"
        );
    },
    { scope: heroRef }
  );

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://github.com/KpG782",
      label: "GitHub",
      path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    },
    {
      href: "https://www.linkedin.com/in/ken-patrick-garcia-ba5430285/",
      label: "LinkedIn",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      href: "mailto:kenpatrickgarcia123@gmail.com",
      label: "Email",
      path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      stroke: true,
    },
    {
      href: "https://www.frontendmentor.io/profile/KpG782",
      label: "Frontend Mentor",
      path: "M12.1706 1.2719C12.0668 1.15036 11.9331 1.15036 11.8293 1.2719L1.52945 12.5856C1.42561 12.7072 1.42561 12.8556 1.52945 12.9771L11.8293 24.2908C11.9331 24.4124 12.0668 24.4124 12.1706 24.2908L22.4705 12.9771C22.5743 12.8556 22.5743 12.7072 22.4705 12.5856L12.1706 1.2719Z M12 3.40678L20.7988 12.7814L12 22.156L3.20115 12.7814L12 3.40678Z M12 8.72542L6.83789 12.7814L12 16.8374L17.162 12.7814L12 8.72542Z",
    },
    {
      href: "https://www.facebook.com/kenpatrickgarcia123",
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden min-h-[80vh] md:min-h-[88vh] flex items-center pt-24 sm:pt-28 md:pt-28 pb-12 md:pb-16"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Neural Network Background */}
      <NeuralNetworkBackground theme={theme} />
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 z-10 w-auto max-w-md md:max-w-lg lg:max-w-xl pointer-events-none opacity-20">
        <img
          src="/images/bg.webp"
          alt="background"
          className="w-full h-auto"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-5 md:px-10 lg:px-20 gap-10 md:gap-14">
        {/* Profile Image - Top on mobile, Right on tablet/desktop */}
        <figure className="w-full md:w-1/2 flex items-center justify-center md:order-2">
          <div className="hero-profile relative flex flex-col items-center gap-5 w-full max-w-[360px]">
            {/* Photo — clean front-facing headshot */}
            <img
              src="/images/2x2.webp"
              alt="Ken Patrick Garcia"
              width={440}
              height={440}
              className="w-full aspect-square rounded-2xl object-cover"
              style={{
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-lg)",
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />

            {/* whoami terminal */}
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
              aria-hidden="true"
            >
              <div
                className="flex items-center gap-1.5 px-3 py-2.5"
                style={{ borderBottom: "1px solid var(--border-primary)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
                <span className="font-mono text-[11px] ml-2" style={{ color: "var(--text-tertiary)" }}>
                  ken@portfolio ~ %
                </span>
              </div>
              <div
                className="px-4 py-3.5 font-mono text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--accent)" }}>$</span> whoami
                <br />
                <span style={{ color: "var(--text-tertiary)" }}>
                  Ken Patrick Garcia — AI Full-Stack Engineer
                </span>
                <br />
                <span style={{ color: "var(--accent)" }}>$</span> status
                <br />
                &gt; <span style={{ color: "var(--accent)" }}>● open to roles</span> · ships production AI
              </div>
            </div>
          </div>
        </figure>

        {/* Content - Bottom on mobile, Left on tablet/desktop */}
        <header className="w-full md:w-1/2 flex flex-col justify-center md:order-1">
          <div className="flex flex-col gap-5">
            <span className="chip w-fit">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Open to Full-Stack / AI roles
            </span>

            <h1 className="hero-text font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Ken Patrick Garcia
            </h1>
            <p
              className="hero-text text-xl sm:text-2xl font-semibold -mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              AI Engineer — I ship production AI systems
            </p>

            <p
              className="hero-description text-base sm:text-lg max-w-xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I turn LLMs into production products — RAG pipelines, autonomous AI agents,
              and n8n automations that run real business workflows. Full-stack across web
              and mobile, from prototype to deploy. Based in Manila 🇵🇭.
            </p>

            {/* Capability chips */}
            <div className="hero-description flex flex-wrap gap-2">
              {["LLM & RAG", "AI Agents", "MCP / Tool-use", "React / Next.js", "iOS & Android", "n8n Automation"].map(
                (cap) => (
                  <span key={cap} className="chip">
                    {cap}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                onClick={scrollToWork}
                className="btn-primary w-full sm:w-auto text-sm md:text-base focus-ring-brand"
              >
                See my Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="btn-ghost w-full sm:w-auto group text-sm md:text-base focus-ring-brand"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  style={{ color: "var(--accent)" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                Watch Introduction
              </button>
              {profile.resume && (
                <a
                  href={profile.resume}
                  download
                  className="btn-ghost w-full sm:w-auto text-sm md:text-base focus-ring-brand"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Résumé
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="hero-social flex flex-wrap gap-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group p-2.5 md:p-3 rounded-lg transition-all duration-300 hover:scale-110 focus-ring-brand"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                  }}
                  aria-label={social.label}
                >
                  <svg
                    className="w-5 h-5 transition-colors"
                    style={{ color: "var(--text-tertiary)" }}
                    fill={social.stroke ? "none" : "currentColor"}
                    stroke={social.stroke ? "currentColor" : undefined}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule={social.stroke ? undefined : "evenodd"}
                      clipRule={social.stroke ? undefined : "evenodd"}
                      strokeLinecap={social.stroke ? "round" : undefined}
                      strokeLinejoin={social.stroke ? "round" : undefined}
                      strokeWidth={social.stroke ? 2 : undefined}
                      d={social.path}
                    />
                  </svg>
                </a>
              ))}
            </div>

            {/* Proof line */}
            <p className="font-mono text-xs pt-2" style={{ color: "var(--text-tertiary)" }}>
              Production AI @ Romega · 5 awards · Beacon &amp; Kudlit · 24 projects shipped
            </p>
          </div>
        </header>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;
