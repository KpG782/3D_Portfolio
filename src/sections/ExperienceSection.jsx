import React from "react";
import TitleHeader from "../components/TitleHeader.jsx";
import { expCards } from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../contexts/ThemeContext.jsx";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const { theme } = useTheme();
  
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inout",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        xPercent: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className={"w-full md:mt-40 mt-20 section-padding xl:px-0"}
      style={theme === 'light' ? { backgroundColor: '#ffffff' } : {}}
    >
      <div className={"w-full h-full md:px-20 px-5"}>
        <TitleHeader
          title={"From Web Dev to AI Engineering"}
          sub={"My Engineering Journey"}
        />

        <div className={"mt-32 relative"}>
          <div className={"relative z-50 xl:space-y-32 space-y-10"}>
            {expCards.map((card, index) => (
              <div key={card.title} className={"exp-card-wrapper"}>
                <div className={"xl:w-2/6"}>
                  <GlowCard index={index} card={card}>
                    <div style={card.imgPath.includes('exp5') ? { backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '12px' } : {}}>
                      <img 
                        src={card.imgPath} 
                        alt={card.title}
                        style={card.imgPath.includes('exp5') ? { width: '70%', height: 'auto', margin: '0 auto', display: 'block' } : {}}
                      />
                    </div>
                  </GlowCard>
                </div>

                {/*right side*/}
                <div className={"xl:w-4/6"}>
                  <div className={"flex items-start"}>
                    <div className={"timeline-wrapper"}>
                      <div className={"timeline"} />
                      <div className={"gradient-line w-1 h-full"} />
                    </div>

                    <div
                      className={
                        "expText flex xl:gap-20 md:gap-10 gap-5 relative z-20"
                      }
                    >
                      <div className={"timeline-logo"}>
                        <img 
                          src={card.logoPath} 
                          alt="logo"
                          style={card.logoPath.includes('python') || card.logoPath.includes('node') ? { width: '60%', height: 'auto' } : {}}
                        />
                      </div>
                      <div>
                        <h1 className={"font-semibold text-3xl"}
                          style={theme === 'light' ? { color: '#111827' } : { color: '#fff' }}>
                          {card.title}
                        </h1>
                        <p className={"my-5"}
                          style={theme === 'light' ? { color: '#6b7280' } : { color: 'rgba(255, 255, 255, 0.5)' }}>
                          📅 {card.date}
                        </p>
                        <p className={"italic"}
                          style={theme === 'light' ? { color: '#3b82f6' } : { color: '#839cb5' }}>
                          Responsibilities
                        </p>
                        <ul
                          className={
                            "list-disc ms-5 mt-5 flex flex-col gap-5"
                          }
                          style={theme === 'light' ? { color: '#374151' } : { color: '#fff' }}
                        >
                          {card.responsibilities.map((responsibility) => (
                            <li key={responsibility} className={"text-lg"}>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ExperienceSection;
