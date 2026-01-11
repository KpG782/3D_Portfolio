import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../constants/data.js";
import TitleHeader from "../components/TitleHeader.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

gsap.registerPlugin(ScrollTrigger);

// Chatbot Constellation Background Component
const ChatbotConstellationBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bubbles = [];

    // Chat snippets for bubbles
    const chatTexts = ['Hello', 'AI', 'GPT', 'RAG', 'LLM', 'Fine-tune', 'NLP', 'ML', '💬', '🤖', '✨'];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          isActive: true
        };
        lastMouseUpdate = now;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Chat Bubble class
    class ChatBubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 300 + 100; // Depth
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.15;
        this.baseRadius = Math.random() * 20 + 15;
        this.radius = this.baseRadius;
        this.text = chatTexts[Math.floor(Math.random() * chatTexts.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.typingPhase = Math.random() * Math.PI * 2;
        this.energy = 0;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        // Mouse interaction - elastic repulsion
        if (mouseRef.current.isActive) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 3;
            this.vx += (dx / distance) * force * 0.15;
            this.vy += (dy / distance) * force * 0.15;
            this.energy = Math.max(this.energy, force * 4);
          }
        }

        // Chain reaction - ripple effect to connected bubbles
        if (this.energy > 0.1) {
          bubbles.forEach(other => {
            if (other !== this) {
              const dx = this.x - other.x;
              const dy = this.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                const energyTransfer = this.energy * 0.4 * (1 - distance / 150);
                other.vx += (dx / distance) * energyTransfer * 0.08;
                other.vy += (dy / distance) * energyTransfer * 0.08;
                other.energy = Math.max(other.energy, energyTransfer * 0.6);
              }
            }
          });
          this.energy *= 0.9; // Faster decay for snappier feel
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Bounce off edges with padding
        const padding = this.radius;
        if (this.x < padding || this.x > canvas.width - padding) this.vx *= -0.8;
        if (this.y < padding || this.y > canvas.height - padding) this.vy *= -0.8;
        if (this.z < 100 || this.z > 400) this.vz *= -1;

        // Apply damping (elastic feel)
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vz *= 0.98;

        // Update animations
        this.pulsePhase += 0.03;
        this.typingPhase += 0.08;
        this.rotation += this.rotationSpeed;

        // Calculate size based on depth
        const scale = 250 / this.z;
        this.radius = this.baseRadius * scale * (1 + this.energy * 0.15);
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.1 + 1;
        const typingDots = Math.floor((Math.sin(this.typingPhase) + 1) * 1.5);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * 0.3);

        // Bubble shadow
        ctx.beginPath();
        ctx.ellipse(2, 2, this.radius * pulse, this.radius * pulse * 0.9, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fill();

        // Bubble body with gradient
        const gradient = ctx.createRadialGradient(
          -this.radius * 0.3, -this.radius * 0.3, 0,
          0, 0, this.radius * pulse
        );
        
        if (theme === 'light') {
          gradient.addColorStop(0, 'rgba(96, 165, 250, 0.85)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.7)');
        } else {
          gradient.addColorStop(0, 'rgba(147, 197, 253, 0.7)');
          gradient.addColorStop(1, 'rgba(96, 165, 250, 0.5)');
        }

        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius * pulse, this.radius * pulse * 0.9, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bubble border
        ctx.strokeStyle = theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(147, 197, 253, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Energy glow
        if (this.energy > 0.1) {
          ctx.shadowBlur = 20 * this.energy;
          ctx.shadowColor = theme === 'light' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(147, 197, 253, 0.8)';
          ctx.stroke();
        }
        ctx.shadowBlur = 0;

        // Bubble tail (speech bubble pointer)
        ctx.beginPath();
        ctx.moveTo(this.radius * 0.6, this.radius * 0.7);
        ctx.lineTo(this.radius * 0.8, this.radius * 1.2);
        ctx.lineTo(this.radius * 0.3, this.radius * 0.9);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(147, 197, 253, 0.4)';
        ctx.stroke();

        // Text or typing indicator
        const depthOpacity = (400 - this.z) / 300;
        if (this.energy > 0.5 || Math.random() > 0.7) {
          // Typing indicator (three dots)
          ctx.fillStyle = theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)';
          const dotSpacing = 6;
          for (let i = 0; i < 3; i++) {
            if (i < typingDots) {
              ctx.beginPath();
              ctx.arc((i - 1) * dotSpacing, 0, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else {
          // Text content
          ctx.fillStyle = theme === 'light' 
            ? `rgba(255, 255, 255, ${0.95 * depthOpacity})` 
            : `rgba(255, 255, 255, ${0.9 * depthOpacity})`;
          ctx.font = `bold ${Math.max(10, this.radius * 0.4)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.text, 0, 0);
        }

        ctx.restore();
      }
    }

    // Initialize bubbles
    const bubbleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 40);
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new ChatBubble());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sort bubbles by depth
      bubbles.sort((a, b) => b.z - a.z);

      // Update and draw bubbles
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      // Draw conversation threads (curved lines between nearby bubbles)
      bubbles.forEach((b1, i) => {
        bubbles.slice(i + 1).forEach(b2 => {
          const dx = b1.x - b2.x;
          const dy = b1.y - b2.y;
          const dz = Math.abs(b1.z - b2.z);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180 && dz < 80) {
            const avgDepth = (b1.z + b2.z) / 2;
            const depthOpacity = (400 - avgDepth) / 300;
            const opacity = ((1 - distance / 180) * 0.3) * depthOpacity;

            // Curved line (Bezier curve)
            ctx.beginPath();
            ctx.moveTo(b1.x, b1.y);
            const midX = (b1.x + b2.x) / 2 + (Math.random() - 0.5) * 30;
            const midY = (b1.y + b2.y) / 2 + (Math.random() - 0.5) * 30;
            ctx.quadraticCurveTo(midX, midY, b2.x, b2.y);
            
            ctx.strokeStyle = theme === 'light' 
              ? `rgba(59, 130, 246, ${opacity})` 
              : `rgba(147, 197, 253, ${opacity * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto w-full h-full"
      style={{ opacity: theme === 'light' ? 0.5 : 0.4 }}
    />
  );
};

const TABS = [
  { label: "Featured Projects" },
];

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 p-4 sm:p-6 z-10">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-2">
                {project.category}
              </span>
              <h2
                id="modal-title"
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight"
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl p-2 rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden group">
            <img
              src={project.img}
              alt={project.alt}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors">
              <p className="text-gray-400 text-xs mb-1">Status</p>
              <p
                className={`text-sm sm:text-base font-semibold ${
                  project.status === "Completed"
                    ? "text-green-400"
                    : project.status === "Delivered"
                    ? "text-blue-400"
                    : "text-yellow-400"
                }`}
              >
                {project.status}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors">
              <p className="text-gray-400 text-xs mb-1">Duration</p>
              <p className="text-sm sm:text-base font-semibold text-white">
                {project.duration}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-colors col-span-2">
              <p className="text-gray-400 text-xs mb-1">Team</p>
              <p className="text-sm sm:text-base font-semibold text-white truncate">
                {project.members.join(", ")}
              </p>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Description
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-300 text-sm"
                  >
                    <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 px-3 py-2 rounded-lg text-sm font-medium border border-blue-500/20 hover:border-blue-400/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none bg-white/10 backdrop-blur-sm border border-gray-600 text-white px-6 py-3 rounded-lg hover:bg-white/20 hover:border-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-center"
                aria-label={`View source code for ${project.title}`}
              >
                View Source Code
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold shadow-lg hover:shadow-blue-500/50 text-center"
                aria-label={`View ${project.title}`}
              >
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowcaseSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(() => {
    cardRefs.current = cardRefs.current.slice(0, PROJECTS[activeTab].length);

    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.1 * (index + 1),
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
            },
          }
        );
      }
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
  }, [activeTab]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleKeyDown = (e, project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(project);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3);
            transform: scale(1.02);
          }
        }
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .award-shimmer {
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(59, 130, 246, 0.2) 50%,
            transparent 75%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .award-card-hover:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <section
        id="work"
        ref={sectionRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
        style={theme === 'light' ? { backgroundColor: '#f9fafb' } : { backgroundColor: '#000' }}
        aria-labelledby="work-heading"
      >
        {/* Chatbot Constellation Background */}
        <ChatbotConstellationBackground theme={theme} />

        <div className="max-w-7xl mx-auto py-2 relative z-10">
          <TitleHeader
            title={"Award-Winning Projects"}
            sub={"My Work & Portfolio"}
          />

          {/* Cards Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12"
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {PROJECTS[activeTab].map((project, idx) => (
              <article
                key={project.title}
                className="group rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden relative award-card-hover"
                style={theme === 'light' ? {
                  background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
                  border: '1px solid #d1d5db'
                } : {
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  border: '1px solid #374151'
                }}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => handleCardClick(project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                {/* Blue Shimmer Effect on Hover */}
                <div className="absolute inset-0 award-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex flex-col sm:flex-row h-auto sm:h-56 lg:h-64 xl:h-72">
                  {/* Image Section */}
                  <div className="relative w-full sm:w-2/5 h-48 sm:h-full overflow-hidden flex-shrink-0">
                    <img
                      src={project.img}
                      alt={project.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-blue-400/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full sm:w-3/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Title */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors"
                        style={theme === 'light' ? { color: '#111827' } : { color: '#fff' }}>
                        <span className="line-clamp-2 break-words">
                          {project.title}
                        </span>
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed line-clamp-2"
                        style={theme === 'light' ? { color: '#6b7280' } : { color: '#9ca3af' }}>
                        {project.desc}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="text-xs backdrop-blur-sm px-2.5 py-1 rounded-md font-medium transition-colors"
                            style={theme === 'light' ? {
                              backgroundColor: '#e5e7eb',
                              border: '1px solid #d1d5db',
                              color: '#374151'
                            } : {
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid #374151',
                              color: '#d1d5db'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs text-blue-400 font-semibold flex items-center">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-3"
                      style={theme === 'light' ? { borderTop: '1px solid #e5e7eb' } : { borderTop: '1px solid rgba(55, 65, 81, 0.5)' }}>
                      <span className="text-xs sm:text-sm font-medium group-hover:text-blue-400 transition-colors hidden sm:flex"
                        style={theme === 'light' ? { color: '#6b7280' } : { color: '#9ca3af' }}>
                        Click to view details →
                      </span>
                      <div className="flex gap-2 w-full sm:w-auto">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none bg-white/5 backdrop-blur-sm border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white hover:border-gray-500 transition-all px-3 py-2 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View source code for ${project.title}`}
                          >
                            Code
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 px-3 py-2 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 text-center"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${project.title}`}
                          >
                            View →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {PROJECTS[activeTab].length === 0 && (
            <div className="text-center py-16 sm:py-20">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-400">
                New projects in this category are currently in development
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </section>
    </>
  );
};

export default ShowcaseSection;
