import React, { Suspense, useState } from 'react'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Room} from "./HeroModels/Room.jsx";
import HeroLights from "./HeroModels/HeroLights.jsx";
import Particles from "./HeroModels/Patricles.jsx";

const ContactExperience = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white text-sm font-medium">Loading 3D Room...</p>
                </div>
            )}

            <Canvas shadows camera={{position: [0, 0, 15], fov: 45}}>
                <Suspense fallback={null}>
                    {/* Lights */}
                    <HeroLights/>
                    
                    {/* Sparkles/Particles */}
                    <Particles count={100}/>

                    <OrbitControls
                        enableZoom={true}          // ✅ Allow zooming in/out
                        enablePan={true}           // ✅ Allow panning (X/Y dragging)
                        enableRotate={true}        // ✅ Allow rotation
                        zoomSpeed={0.6}            // Smooth zoom speed
                        panSpeed={0.5}             // Controlled pan speed
                        rotateSpeed={0.4}          // Smooth rotation speed
                        minDistance={8}            // Minimum zoom - prevent getting too close
                        maxDistance={20}           // Maximum zoom - keep room visible
                        minPolarAngle={Math.PI / 6}   // Limit top view (30°)
                        maxPolarAngle={Math.PI / 2.2} // Limit bottom view (≈82°)
                        minAzimuthAngle={-Math.PI / 3} // Limit left rotation (-60°)
                        maxAzimuthAngle={Math.PI / 3}  // Limit right rotation (+60°)
                        enableDamping={true}       // Smooth damping (inertia)
                        dampingFactor={0.08}       // Moderate damping
                        maxTargetRadius={5}        // Limit pan distance from center
                    />

                    {/* Room with Desktop */}
                    <group 
                        scale={1} 
                        position={[0, -3.5, 0]} 
                        rotation={[0, -Math.PI / 4, 0]}
                        onPointerOver={() => setIsLoading(false)}
                    >
                        <Room />
                    </group>
                </Suspense>
            </Canvas>
        </div>
    )
}
export default ContactExperience
