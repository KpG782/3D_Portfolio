import React from 'react';
import TitleHeader from "../components/TitleHeader.jsx";
import { testimonials } from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const Testimonials = () => {
    const { theme } = useTheme();
    
    return (
        <section id="testimonials" className="section-padding flex-center"
            style={theme === 'light' ? { backgroundColor: '#f9fafb' } : {}}>
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="Peer Testimonials"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {testimonials.map(({ imgPath, name, mentions, review }, index) => (
                        <GlowCard key={index} card={{ review }}>
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={imgPath}
                                    alt={name}
                                    className="w-12 h-12 object-cover rounded-full shrink-0"
                                />
                                <div className="min-w-0">
                                    <p className="font-bold text-sm sm:text-base"
                                        style={theme === 'light' ? { color: '#111827' } : { color: '#fff' }}>
                                        {name}
                                    </p>
                                    <p className="text-xs sm:text-sm truncate"
                                        style={theme === 'light' ? { color: '#6b7280' } : { color: 'rgba(255, 255, 255, 0.5)' }}>
                                        {mentions}
                                    </p>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
