import React, {useRef} from 'react'
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);



    useGSAP(() => {
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50, opacity: 0
                },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100'
                    }
                }
            )
        })

        gsap.fromTo(sectionRef.current,
            {opacity:0},
            {opacity: 1, duration: 1.5}
        )
    }, []);
    return (
        <section id={"work"} ref={sectionRef} className={"app-showcase"}>
            <div className={"w-full"}>
                <div className={"showcaselayout"}>
                    {/*LEFT*/}
                    <div className={"first-project-wrapper"} ref={project1Ref}>
                        <div className={"image-wrapper"}>
                            <img src={"/images/project1.png"} alt={"CampusCare"}/>
                        </div>
                        <div className={"text-content"}>
                            <h2>CampusCare – Your Student Wellness Partner</h2>
                            <p className={"text-white-50 md:text-xl"}>
                                A mobile-first guidance counseling platform built using Flutter and Firebase, designed to help students book appointments, chat with counselors, and access wellness tools.
                            </p>
                        </div>
                    </div>

                    {/*RIGHT*/}
                    <div className={"project-list-wrapper overflow-hidden"}>
                        {/*1st right*/}
                        <div className={"project"} ref={project2Ref}>
                            <div className={"image-wrapper bg-[#ffefdb]"}>
                                <img src={"/images/project2.png"} alt={"Hotel Reservation System"}/>
                            </div>
                            <h2>Hotel Booking & Reservation System</h2>
                        </div>

                        {/* 2nd right */}
                        <div className="project" ref={project3Ref}>
                            <div className="image-wrapper bg-[#ffe7eb] w-full h-auto">
                                <img
                                    src="/images/project33.png"
                                    alt="Admin Web"
                                    className="w-full h-auto object-contain sm:object-cover"
                                />
                            </div>
                            <h2>CampusCare Admin Dashboard</h2>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default ShowcaseSection
