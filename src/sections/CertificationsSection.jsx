import React, { useState } from "react";
import { certifications } from "../constants/certifications.js";
import TitleHeader from "../components/TitleHeader.jsx";

const CertificationModal = ({ cert, isOpen, onClose, isHoverMode }) => {
  if (!isOpen || !cert) return null;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      if (!isHoverMode) {
        document.body.style.overflow = "hidden";
      }
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isHoverMode]);

  // Auto-close after 2 seconds in hover mode
  React.useEffect(() => {
    let autoCloseTimeout;
    if (isOpen && isHoverMode) {
      autoCloseTimeout = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => {
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
      }
    };
  }, [isOpen, isHoverMode, onClose]);

  const handleViewCredential = () => {
    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={isHoverMode ? null : onClose}
      onMouseLeave={isHoverMode ? onClose : null}
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
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Certificate Image */}
        <div className="w-full h-full flex items-center justify-center p-6 bg-gray-800/50 min-h-[60vh]">
          <img
            src={cert.imagePath}
            alt={cert.name}
            className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Certificate Name and Action */}
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

        {/* Hover Mode Indicator */}
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
};

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(false);
  const [hoverTimeoutId, setHoverTimeoutId] = useState(null);

  const handleCertClick = (cert) => {
    // Clear any pending hover timeout
    if (hoverTimeoutId) {
      clearTimeout(hoverTimeoutId);
      setHoverTimeoutId(null);
    }
    setSelectedCert(cert);
    setIsModalOpen(true);
    setIsHoverMode(false); // Click mode - stays open
  };

  const handleCertHover = (cert) => {
    // Clear any existing timeout
    if (hoverTimeoutId) {
      clearTimeout(hoverTimeoutId);
    }

    // Set a delay before opening modal on hover (500ms)
    const timeoutId = setTimeout(() => {
      setSelectedCert(cert);
      setIsModalOpen(true);
      setIsHoverMode(true); // Hover mode - closes automatically after 2s
    }, 500);

    setHoverTimeoutId(timeoutId);
  };

  const handleCertLeave = () => {
    // Clear timeout if user leaves before modal opens
    if (hoverTimeoutId) {
      clearTimeout(hoverTimeoutId);
      setHoverTimeoutId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsHoverMode(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  const CertificationCard = ({ cert }) => {
    return (
      <div
        className="flex-none marquee-item cursor-pointer group relative"
        onClick={() => handleCertClick(cert)}
        onMouseEnter={() => handleCertHover(cert)}
        onMouseLeave={handleCertLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCertClick(cert);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${cert.name}`}
      >
        {/* Certificate aspect ratio: width wider than height (landscape) */}
        <div className="relative overflow-hidden rounded-xl border-2 border-gray-700 group-hover:border-blue-500/50 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 w-96 h-72">
          <img
            src={cert.imagePath}
            alt={cert.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Info */}
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
        
        /* Infinite loop marquee animation */
        .marquee {
          position: relative;
          overflow: hidden;
          --gap: 3rem;
        }
        
        .marquee-box {
          display: flex;
          gap: var(--gap);
          animation: scroll 40s linear infinite;
          will-change: transform;
        }
        
        .marquee:hover .marquee-box {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .marquee-box {
            animation: scroll 30s linear infinite;
          }
        }
      `}</style>

      <section
        id="certifications"
        className="bg-black overflow-hidden py-10 md:py-16"
      >
        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
            title={"Certifications & Achievements"}
            sub={"Professional Credentials & Recognition"}
          />

          {/* Horizontal Scrolling Section */}
          <div className="relative mt-8 md:mt-12">
            {/* Gradient Edges */}
            <div className="gradient-edge" />
            <div className="gradient-edge" />

            {/* Marquee Animation - Infinite loop */}
            <div className="marquee h-72">
              <div className="marquee-box">
                {certifications.map((cert) => (
                  <CertificationCard key={cert.id} cert={cert} />
                ))}
                {certifications.map((cert) => (
                  <CertificationCard key={`${cert.id}-duplicate`} cert={cert} />
                ))}
              </div>
            </div>
          </div>

          {/* Hint text */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              <span className="text-blue-400">Hover</span> to quick preview
              (auto-closes in 2s) •{" "}
              <span className="text-purple-400">Click</span> to lock view and
              access credential
            </p>
          </div>
        </div>

        {/* Modal */}
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
