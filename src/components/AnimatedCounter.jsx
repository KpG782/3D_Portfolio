import React from "react";
import { counterItems } from "../constants/index.js";
import CountUp from "react-countup";
import { FaCode, FaLaptopCode, FaLayerGroup, FaUsers } from "react-icons/fa";

const iconMap = {
    code: <FaCode />,
    laptop: <FaLaptopCode />,
    layers: <FaLayerGroup />,
    users: <FaUsers />,
};

const AnimatedCounter = () => {
    return (
        <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols gap-6">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 rounded-lg p-6 md:p-10 flex flex-col items-center justify-center"
                    >
                        {/* Icon + Count in a row */}
                        <div className="flex items-center gap-2 text-white text-4xl font-bold mb-1">
                            <span className="text-blue-400 text-3xl">{iconMap[item.icon]}</span>
                            <CountUp suffix={item.suffix} end={item.value} />
                        </div>

                        {/* Label below */}
                        <div className="text-white-50 text-sm md:text-lg text-center">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;
