import React, { memo, useState, useEffect } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  motion,
  useReducedMotion,
} from "framer-motion";
import { PROJECTS } from "../constants/data.js";
import TitleHeader from "../components/TitleHeader.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectCard = memo(
  ({
    project,
    index,
    theme,
    shouldReduceMotion,
    onSelect,
    onKeyDown,
  }) => (
    <motion.article
      className="group rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-[transform,box-shadow] duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden relative"
      style={
        theme === "light"
          ? {
              background: "linear-gradient(to bottom right, #ffffff, #f3f4f6)",
              border: "1px solid #d1d5db",
              contentVisibility: "auto",
              containIntrinsicSize: "360px",
            }
          : {
              background: "linear-gradient(to bottom right, #1f2937, #111827)",
              border: "1px solid #374151",
              contentVisibility: "auto",
              containIntrinsicSize: "360px",
            }
      }
      onClick={() => onSelect(project)}
      onKeyDown={(e) => onKeyDown(e, project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      variants={shouldReduceMotion ? undefined : cardVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
    >
      <div className="absolute inset-0 award-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="flex flex-col sm:flex-row h-auto sm:h-56 lg:h-64 xl:h-72">
        <div className="relative w-full sm:w-2/5 h-48 sm:h-full overflow-hidden flex-shrink-0">
          <img
            src={project.img}
            alt={project.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            sizes="(min-width: 1280px) 20rem, (min-width: 640px) 40vw, 100vw"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-blue-400/30">
              {project.category}
            </span>
          </div>
        </div>

        <div className="w-full sm:w-3/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
          <div className="flex-1 space-y-3">
            <h3
              className="text-base sm:text-lg lg:text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors"
              style={theme === "light" ? { color: "#111827" } : { color: "#fff" }}
            >
              <span className="line-clamp-2 break-words">
                {project.title}
              </span>
            </h3>

            <p
              className="text-xs sm:text-sm leading-relaxed line-clamp-2"
              style={theme === "light" ? { color: "#6b7280" } : { color: "#9ca3af" }}
            >
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="text-xs backdrop-blur-sm px-2.5 py-1 rounded-md font-medium transition-colors"
                  style={
                    theme === "light"
                      ? {
                          backgroundColor: "#e5e7eb",
                          border: "1px solid #d1d5db",
                          color: "#374151",
                        }
                      : {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid #374151",
                          color: "#d1d5db",
                        }
                  }
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

          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={
              theme === "light"
                ? { borderTop: "1px solid #e5e7eb" }
                : { borderTop: "1px solid rgba(55, 65, 81, 0.5)" }
            }
          >
            <span
              className="text-xs sm:text-sm font-medium group-hover:text-blue-400 transition-colors hidden sm:flex"
              style={theme === "light" ? { color: "#6b7280" } : { color: "#9ca3af" }}
            >
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
    </motion.article>
  ),
  (prev, next) =>
    prev.project === next.project &&
    prev.index === next.index &&
    prev.theme === next.theme &&
    prev.shouldReduceMotion === next.shouldReduceMotion
);

const ProjectModal = ({ project, isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project ? (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src={project.img}
                  alt={project.alt}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const ShowcaseSection = () => {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <LazyMotion features={domAnimation}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
      `}</style>

      <motion.section
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
        style={
          theme === "light"
            ? { backgroundColor: "#f9fafb" }
            : { backgroundColor: "#000" }
        }
        aria-labelledby="work-heading"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div className="max-w-7xl mx-auto py-2 relative z-10" variants={sectionVariants}>
          <TitleHeader
            title={"Award-Winning Projects"}
            sub={"My Work & Portfolio"}
          />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12"
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {PROJECTS[activeTab].map((project, idx) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={idx}
                theme={theme}
                shouldReduceMotion={shouldReduceMotion}
                onSelect={handleCardClick}
                onKeyDown={handleKeyDown}
              />
            ))}
          </motion.div>

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
        </motion.div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </motion.section>
    </LazyMotion>
  );
};

export default ShowcaseSection;
