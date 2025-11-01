import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../constants/data.js";
import TitleHeader from "../components/TitleHeader.jsx";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { label: "Full Stack Applications" },
  { label: "Client Projects" },
  { label: "Frontend Development" },
  { label: "Other Projects" },
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
                aria-label={`View live demo of ${project.title}`}
              >
                View Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowcaseSection = () => {
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
      `}</style>

      <section
        id="work"
        ref={sectionRef}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
        aria-labelledby="work-heading"
      >
        <div className="max-w-7xl mx-auto py-2">
          <TitleHeader
            title={"Featured Projects"}
            sub={"My Work & Portfolio"}
          />

          {/* Tabs without Icons */}
          <div className="flex flex-wrap justify-center mt-4 mb-8 sm:mb-12 gap-2 sm:gap-3">
            {TABS.map((tab, idx) => (
              <button
                key={tab.label}
                className={`px-4 py-2.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeTab === idx
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                    : "bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 hover:text-white border border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setActiveTab(idx)}
                role="tab"
                aria-selected={activeTab === idx}
                aria-controls={`tabpanel-${idx}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {PROJECTS[activeTab].map((project, idx) => (
              <article
                key={project.title}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 hover:border-blue-500/50 overflow-hidden"
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => handleCardClick(project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
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
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full sm:w-3/5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                    <div className="flex-1 space-y-3">
                      {/* Title */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                        <span className="line-clamp-2 break-words">
                          {project.title}
                        </span>
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="text-xs bg-white/5 backdrop-blur-sm border border-gray-700 text-gray-300 px-2.5 py-1 rounded-md font-medium hover:bg-white/10 transition-colors"
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
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50">
                      <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-blue-400 transition-colors hidden sm:flex">
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
                            aria-label={`View live demo of ${project.title}`}
                          >
                            Live →
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
