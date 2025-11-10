import React, { Suspense, useRef, useState } from "react";
import { words } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Close video"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Minimize Hint/Indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-center gap-3 text-white/80 animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <p className="text-sm font-medium">
                💡 <span className="text-blue-400">Tip:</span> Click minimize (—) to continue browsing while listening
              </p>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
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
        width: '400px',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Draggable Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-2 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">Ken's Introduction</span>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-auto"
          src="https://www.youtube.com/embed/nze_7ezndes?autoplay=1&controls=1"
          title="Ken Patrick Garcia - Introduction"
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

// 3D Model Component
function KenModel(props) {
  const { scene } = useGLTF("/models/ken3d-optimized.glb");
  const modelRef = useRef();

  // Notify parent when loaded
  React.useEffect(() => {
    if (props.onLoad) props.onLoad();
  }, [props]);

  // Subtle rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return <primitive ref={modelRef} object={scene} {...props} />;
}

// Preload the model
useGLTF.preload("/models/ken3d-optimized.glb");

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useGSAP(() => {
    const animateElement = (selector, from, delay = 0, stagger = 0) => {
      gsap.fromTo(selector, from, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay,
        stagger,
        ease: "power2.out",
      });
    };

    animateElement(".hero-text h1", { y: 50, opacity: 0 }, 0, 0.2);
    animateElement(".hero-profile", { scale: 0.8, opacity: 0 }, 0.5);
    animateElement(".hero-description", { y: 30, opacity: 0 }, 0.6);
    animateElement(".hero-buttons", { y: 30, opacity: 0 }, 0.8);
    animateElement(".hero-social", { x: -30, opacity: 0 }, 1, 0.1);
    animateElement(".hero-quick-stat", { y: 30, opacity: 0 }, 1.2, 0.15);
  });

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/resume/Ken_Patrick_Garcia_Resume.pdf";
    link.download = "Ken_Patrick_Garcia_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      href: "https://www.linkedin.com/in/kenpatrickgarcia123",
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
      id="hero"
      className="relative overflow-hidden min-h-screen bg-black text-white pt-20 md:pt-24 lg:pt-20"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 z-10 w-auto max-w-md md:max-w-lg lg:max-w-xl pointer-events-none">
        <img
          src="/images/bg.png"
          alt="background"
          className="w-full h-auto opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-5 md:px-10 lg:px-20 gap-8 md:gap-12">
        {/* Profile Images - Top on mobile, Right on tablet/desktop */}
        <figure className="w-full md:w-1/2 flex items-center justify-center md:order-2">
          <div className="hero-profile relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
            
            {/* 3D Model */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-gray-900 to-black">
                
                {/* Loading Overlay */}
                {!modelLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-900/50 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-white text-sm font-medium">Loading 3D Model...</p>
                  </div>
                )}

                <Canvas
                  camera={{ position: [0, 0, 4.5], fov: 50 }}
                  className="w-full h-full"
                >
                  <Suspense fallback={
                    <mesh>
                      <sphereGeometry args={[1, 32, 32]} />
                      <meshStandardMaterial color="#4a5568" wireframe />
                    </mesh>
                  }>
                    {/* Lighting */}
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                    <directionalLight position={[-5, 5, 5]} intensity={0.8} />
                    <pointLight position={[0, 5, 3]} intensity={1} />
                    <hemisphereLight intensity={0.5} groundColor="#000000" />
                    <spotLight
                      position={[0, 8, 5]}
                      angle={0.5}
                      penumbra={0.8}
                      intensity={1.2}
                      castShadow
                    />

                    {/* 3D Model */}
                    <KenModel 
                      scale={3.5} 
                      position={[0, -0.5, 0]} 
                      onLoad={() => setModelLoaded(true)}
                    />

                    {/* Controls */}
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 2}
                    />
                  </Suspense>
                </Canvas>
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                3D Model
              </div>
            </div>

            {/* Real Picture */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <img
                src="/images/2x2.jpg"
                alt="Ken Patrick Garcia"
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                Available for Work
              </div>
            </div>

          </div>
        </figure>

        {/* Content - Bottom on mobile, Left on tablet/desktop */}
        <header className="w-full md:w-1/2 flex flex-col justify-center md:order-1">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Shaping
                <span className="slide inline-block">
                  <span className="wrapper inline-flex items-center flex-wrap">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text}-${index}`}
                        className="flex items-center gap-1 md:gap-2 lg:gap-3 pb-2 ml-2 md:ml-3"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-1 md:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                        />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                into Real Projects
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                that Deliver{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Results
                </span>
              </h1>
            </div>

            <p className="hero-description text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl">
              Hi, I'm{" "}
              <span className="text-white font-semibold">
                Ken Patrick Garcia
              </span>{" "}
              — a passionate Full-Stack Developer from the Philippines 🇵🇭,
              crafting innovative solutions with modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={scrollToWork}
                className="w-full sm:w-auto h-12 md:h-14 lg:h-16 px-6 md:px-8 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg text-sm md:text-base"
              >
                See my Work
              </button>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto h-12 md:h-14 lg:h-16 px-6 md:px-8 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                Watch Introduction
              </button>
              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto h-12 md:h-14 lg:h-16 px-6 md:px-8 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="hero-social group relative p-2.5 md:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors"
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

            {/* Quick Stats */}
            <div className="pt-4 md:pt-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md">
                {[
                  {
                    num: "20+",
                    label: "Projects",
                    colors: "from-blue-400 to-purple-500",
                  },
                  {
                    num: "3+",
                    label: "Years Exp",
                    colors: "from-purple-400 to-pink-500",
                  },
                  {
                    num: "15+",
                    label: "Tech Stack",
                    colors: "from-pink-400 to-red-500",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="hero-quick-stat text-center group hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <div
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.colors} bg-clip-text text-transparent`}
                    >
                      {stat.num}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default Hero;
