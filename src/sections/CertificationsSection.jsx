import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { certifications } from "../constants/certifications.js";
import TitleHeader from "../components/TitleHeader.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const CertificationModal = memo(function CertificationModal({
  cert,
  isOpen,
  onClose,
  isHoverMode,
}) {
  useEffect(() => {
    if (!isOpen || !cert) return undefined;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    if (!isHoverMode) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [cert, isHoverMode, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isHoverMode) return undefined;

    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isHoverMode, isOpen, onClose]);

  if (!isOpen || !cert) return null;

  const handleViewCredential = () => {
    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={isHoverMode ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <div
        className="relative bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="w-full h-full flex items-center justify-center p-6 bg-gray-800/50 min-h-[60vh]">
          <img
            src={cert.imagePath}
            alt={cert.name}
            className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2
              id="cert-modal-title"
              className="text-base sm:text-lg md:text-xl font-bold text-white text-center sm:text-left flex-1"
            >
              {cert.name}
            </h2>
            {cert.credentialUrl && (
              <button
                onClick={handleViewCredential}
                className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
              >
                View Credential
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {isHoverMode && (
          <div className="absolute top-3 left-3 bg-blue-500/90 text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
            <svg
              className="w-2.5 h-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            Preview (Auto-close 2s)
          </div>
        )}
      </div>
    </div>
  );
});

const CertificationCard = memo(function CertificationCard({
  cert,
  theme,
  onClick,
  onHoverStart,
  onHoverEnd,
}) {
  return (
    <div
      className="flex-none cursor-pointer group relative select-none"
      onClick={() => onClick(cert)}
      onMouseEnter={() => onHoverStart(cert)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(cert)}
      onBlur={onHoverEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(cert);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${cert.name}`}
    >
      <div
        className="relative overflow-hidden rounded-xl border-2 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 w-96 h-72"
        style={
          theme === "light"
            ? {
                background: "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
                borderColor: "#d1d5db",
              }
            : {
                background: "linear-gradient(to bottom right, #1f2937, #111827)",
                borderColor: "#374151",
              }
        }
      >
        <img
          src={cert.imagePath}
          alt={cert.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          draggable="false"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm sm:text-base font-semibold text-center line-clamp-2 mb-2">
            {cert.name}
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-400 text-xs sm:text-sm">
            <span>Hover to preview • Click to lock</span>
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

const CertificationsSection = () => {
  const { theme } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const isVisibleRef = useRef(true);
  const resumeTimeoutRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const doubledCertifications = useMemo(
    () => [...certifications, ...certifications],
    []
  );

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const scheduleAutoScrollResume = useCallback(() => {
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPointerActive(false);
      setIsDragging(false);
      isDraggingRef.current = false;
    }, 1400);
  }, [clearResumeTimeout]);

  const closeModal = useCallback(() => {
    clearHoverTimeout();
    setIsModalOpen(false);
    setIsHoverMode(false);
    window.setTimeout(() => setSelectedCert(null), 180);
    scheduleAutoScrollResume();
  }, [clearHoverTimeout, scheduleAutoScrollResume]);

  const handleCertClick = useCallback(
    (cert) => {
      if (isDraggingRef.current) return;

      clearHoverTimeout();
      setSelectedCert(cert);
      setIsHoverMode(false);
      setIsModalOpen(true);
      setIsPointerActive(true);
      clearResumeTimeout();
    },
    [clearHoverTimeout, clearResumeTimeout]
  );

  const handleCertHover = useCallback(
    (cert) => {
      if (isDraggingRef.current || isModalOpen) return;

      clearHoverTimeout();
      setIsPointerActive(true);
      clearResumeTimeout();

      hoverTimeoutRef.current = setTimeout(() => {
        setSelectedCert(cert);
        setIsHoverMode(true);
        setIsModalOpen(true);
      }, 350);
    },
    [clearHoverTimeout, clearResumeTimeout, isModalOpen]
  );

  const handleCertLeave = useCallback(() => {
    clearHoverTimeout();
    if (!isModalOpen) {
      scheduleAutoScrollResume();
    }
  }, [clearHoverTimeout, isModalOpen, scheduleAutoScrollResume]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    let lastTime = 0;
    const pixelsPerSecond = 26;

    const step = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      const canScroll =
        !isPointerActive &&
        !isModalOpen &&
        isVisibleRef.current &&
        document.visibilityState === "visible";

      if (canScroll) {
        const loopWidth = container.scrollWidth / 2;
        const nextScrollLeft =
          container.scrollLeft + (pixelsPerSecond * delta) / 1000;

        container.scrollLeft =
          nextScrollLeft >= loopWidth ? nextScrollLeft - loopWidth : nextScrollLeft;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isModalOpen, isPointerActive]);

  useEffect(() => {
    certifications.forEach((cert) => {
      const image = new Image();
      image.src = cert.imagePath;
    });
  }, []);

  useEffect(() => {
    return () => {
      clearHoverTimeout();
      clearResumeTimeout();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [clearHoverTimeout, clearResumeTimeout]);

  const handlePointerDown = useCallback((clientX) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    clearHoverTimeout();
    clearResumeTimeout();
    setIsPointerActive(true);
    setIsDragging(false);
    isDraggingRef.current = false;
    dragStartXRef.current = clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
  }, [clearHoverTimeout, clearResumeTimeout]);

  const handlePointerMove = useCallback((clientX) => {
    const container = scrollContainerRef.current;
    if (!container || !isPointerActive) return;

    const delta = clientX - dragStartXRef.current;
    if (Math.abs(delta) > 6) {
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    if (isDraggingRef.current) {
      container.scrollLeft = dragStartScrollLeftRef.current - delta;
    }
  }, [isPointerActive]);

  const handlePointerUp = useCallback(() => {
    scheduleAutoScrollResume();
  }, [scheduleAutoScrollResume]);

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

        .scroll-container {
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: auto;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-container.is-dragging {
          cursor: grabbing;
        }

        .gradient-edge-left,
        .gradient-edge-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          pointer-events: none;
          z-index: 10;
        }

        .gradient-edge-left {
          left: 0;
        }

        .gradient-edge-right {
          right: 0;
        }
      `}</style>

      <section
        id="certifications"
        ref={sectionRef}
        className="overflow-hidden py-10 md:py-16"
        style={theme === "light" ? { backgroundColor: "#ffffff" } : { backgroundColor: "#000" }}
      >
        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
            title={"Certifications & Achievements"}
            sub={"Professional Credentials & Recognition"}
          />

          <div className="relative mt-8 md:mt-12">
            <div
              className="gradient-edge-left"
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(to right, #ffffff, transparent)"
                    : "linear-gradient(to right, black, transparent)",
              }}
            />
            <div
              className="gradient-edge-right"
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(to left, #ffffff, transparent)"
                    : "linear-gradient(to left, black, transparent)",
              }}
            />

            <div
              ref={scrollContainerRef}
              className={`scroll-container h-72 ${isDragging ? "is-dragging" : ""}`}
              onMouseEnter={() => {
                setIsPointerActive(true);
                clearResumeTimeout();
              }}
              onMouseLeave={() => {
                handleCertLeave();
                handlePointerUp();
              }}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={handlePointerUp}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              onTouchEnd={handlePointerUp}
            >
              <div className="flex gap-12 w-max pr-12">
                {doubledCertifications.map((cert, index) => (
                  <CertificationCard
                    key={`${cert.id}-${index}`}
                    cert={cert}
                    theme={theme}
                    onClick={handleCertClick}
                    onHoverStart={handleCertHover}
                    onHoverEnd={handleCertLeave}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p
              className="text-sm"
              style={theme === "light" ? { color: "#6b7280" } : { color: "#9ca3af" }}
            >
              <span className="text-blue-400">Auto-scrolling</span> • Drag to
              control • <span className="text-purple-400">Hover</span> to
              preview • <span className="text-green-400">Click</span> to lock
              view
            </p>
          </div>
        </div>

        <CertificationModal
          cert={selectedCert}
          isOpen={isModalOpen}
          onClose={closeModal}
          isHoverMode={isHoverMode}
        />
      </section>
    </>
  );
};

export default CertificationsSection;
