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
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 rounded-lg p-10 flex flex-col items-center justify-center"
                    >
                        <div className="text-blue-400 text-4xl mb-4">
                            {iconMap[item.icon]}
                        </div>
                        <div className="counter-number text-white text-5xl font-bold mb-2">
                            <CountUp suffix={item.suffix} end={item.value} />
                        </div>
                        <div className="text-white-50 text-lg text-center">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;
