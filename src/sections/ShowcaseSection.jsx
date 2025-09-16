import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader.jsx";
import { PROJECTS } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { label: "Full Stack Applications & Websites" },
  { label: "Sample Full Stack Design for Clients" },
  { label: "Frontend Development" },
  { label: "Other Projects" },
];



const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  // Handle escape key
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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-[9999] p-3 sm:p-4 pt-16 sm:pt-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ paddingTop: "80px" }} // Ensure it's below the navbar
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl max-h-[calc(100vh-100px)] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2
              id="modal-title"
              className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 pr-4 leading-tight"
            >
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Image */}
          <div className="mb-6">
            <img
              src={project.img}
              alt={project.alt}
              className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                  Description
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                  Key Features
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    aria-label={`View source code for ${project.title}`}
                  >
                    View Code
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-lg"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-black px-2 py-1 rounded text-xs font-medium border border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap">
                  <span className="font-semibold text-gray-900 mr-2">
                    Category:
                  </span>
                  <span className="text-gray-700">{project.category}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="font-semibold text-gray-900 mr-2">
                    Duration:
                  </span>
                  <span className="text-gray-700">{project.duration}</span>
                </div>
                <div className="flex flex-wrap items-center">
                  <span className="font-semibold text-gray-900 mr-2">
                    Status:
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : project.status === "Delivered"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap">
                  <span className="font-semibold text-gray-900 mr-2">
                    Team:
                  </span>
                  <span className="text-gray-700">
                    {project.members.join(", ")}
                  </span>
                </div>
              </div>
            </div>
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
    setSelectedProject(null);
  };

  const handleKeyDown = (e, project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(project);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="app-showcase py-8 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 bg-black-300 overflow-hidden"
      aria-labelledby="work-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <TitleHeader title="Featured Projects" sub="💼 My Work & Portfolio" />
        </div>
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-6 sm:mb-8 lg:mb-12 gap-2 sm:gap-3 px-1 sm:px-2">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              className={`px-2 py-2 sm:px-3 sm:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-primary ${
                activeTab === idx
                  ? "bg-blue-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-black-100 hover:bg-gray-50 hover:shadow-md"
              }`}
              onClick={() => setActiveTab(idx)}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`tabpanel-${idx}`}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid - Fixed overflow and responsive spacing */}
        <div
          className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {PROJECTS[activeTab].map((project, idx) => (
            <article
              key={project.title}
              className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-primary w-full overflow-hidden"
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
            >
              <div className="flex flex-col sm:flex-row h-auto sm:h-48 lg:h-56 xl:h-64">
                {/* Image Section */}
                <div className="w-full sm:w-2/5 h-40 sm:h-full overflow-hidden rounded-t-lg sm:rounded-l-xl sm:rounded-tr-none flex-shrink-0">
                  <img
                    src={project.img}
                    alt={project.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content Section - Fixed overflow */}
                <div className="w-full sm:w-3/5 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col justify-between min-h-0 overflow-hidden">
                  <div className="flex-1 min-h-0">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-blue-primary bg-blue-50 px-2 py-1 rounded border border-blue-100 whitespace-nowrap">
                        {project.category}
                      </span>
                    </div>

                    {/* Title with proper truncation */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-black-100 leading-tight overflow-hidden">
                      <span className="line-clamp-2 break-words">
                        {project.title}
                      </span>
                    </h3>

                    {/* Description with proper truncation */}
                    <div className="mb-3 overflow-hidden">
                      <p className="text-black-200 text-xs sm:text-sm leading-relaxed line-clamp-2 break-words">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tech stack with overflow handling */}
                    <div className="flex flex-wrap gap-1 mb-3 overflow-hidden">
                      {project.techStack.slice(0, 3).map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="text-xs bg-gray-100 text-black-200 px-2 py-1 rounded font-medium whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs text-black-200 font-medium whitespace-nowrap">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Fixed overflow */}
                  <div className="flex justify-between items-center mt-auto pt-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm font-medium text-black-200 hidden sm:block truncate mr-2">
                      View Details
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 text-black-200 hover:bg-gray-200 hover:text-black-100 transition-colors px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-primary whitespace-nowrap"
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
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg transform hover:scale-105 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View live demo of ${project.title}`}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default ShowcaseSection;
