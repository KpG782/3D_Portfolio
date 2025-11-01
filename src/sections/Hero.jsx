import React from "react";
import { words } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
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
      href: "https://www.facebook.com/kenpatrickgarcia123",
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen bg-black text-white pt-20 md:pt-24 lg:pt-24"
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
        {/* Profile Image - Top on mobile, Right on tablet/desktop */}
        <figure className="w-full md:w-1/2 flex items-center justify-center md:order-2">
          <div className="hero-profile relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <img
              src="/images/ken.jpg"
              alt="Ken Patrick Garcia"
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
              <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
              Available for Work
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
                    {words.map((word) => (
                      <span
                        key={word.text}
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
    </section>
  );
};

export default Hero;
