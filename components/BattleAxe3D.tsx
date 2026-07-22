"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Individual component representing the Battle Axe assembly
function AxeAssembly({ isHovered, setIsHovered }: { isHovered: boolean, setIsHovered: (h: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftBladeRef = useRef<THREE.Mesh>(null);
  const rightBladeRef = useRef<THREE.Mesh>(null);
  
  // Track cursor coordinates
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smoothly interpolate towards mouse position for responsive tilt
    const targetRotationY = mouse.current.x * 0.4 + time * 0.15; // slow idle spin + cursor influence
    const targetRotationX = -mouse.current.y * 0.3 + 0.1; // cursor pitch
    const targetRotationZ = mouse.current.x * 0.15; // cursor roll

    // Lerp rotation for buttery smoothness
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.08);

    // Hover effect: slight scale up and rapid rotation pulse on click/hover
    const targetScale = isHovered ? 1.15 : 1.0;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.15));
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -0.2, 0]} 
      scale={[1, 1, 1]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* 1. THE MAIN SHAFT (HANDLE) */}
      <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 3.4, 16]} />
        <meshStandardMaterial 
          color="#16121e" 
          metalness={0.95} 
          roughness={0.15} 
          bumpScale={0.05}
        />
      </mesh>

      {/* 2. GRIP / LEATHER WRAP (Lower half of shaft) */}
      <mesh castShadow position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 1.2, 16]} />
        <meshStandardMaterial 
          color="#521424" // Dark crimson leather grip
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>
      
      {/* Gold metallic bands separating the grip */}
      <mesh castShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh castShadow position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* 3. AXE TOP COLLAR & ORNAMENTATION */}
      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Glowing Runic Power Core in the center */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#f21449" 
          emissive="#f21449" 
          emissiveIntensity={2.5} 
          toneMapped={false}
        />
      </mesh>

      {/* Glowing Energy Rings around the core */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 8, 32]} />
        <meshStandardMaterial 
          color="#300460" 
          emissive="#f21449" 
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 4. THE SPEAR TOP (SPIKE) */}
      <mesh castShadow position={[0, 1.6, 0]}>
        <coneGeometry args={[0.05, 0.4, 16]} />
        <meshStandardMaterial color="#e5e5e5" metalness={1.0} roughness={0.1} />
      </mesh>
      
      {/* Decorative runic band on the spike */}
      <mesh position={[0, 1.45, 0]}>
        <torusGeometry args={[0.045, 0.01, 8, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* 5. DUAL CRESCENT BLADES */}
      
      {/* LEFT BLADE UNIT */}
      <group position={[-0.1, 1.2, 0]}>
        {/* Blade bracket connection */}
        <mesh castShadow position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
          <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Curved blade (Constructed using styled geometries for perfect procedural design) */}
        <mesh ref={leftBladeRef} castShadow position={[-0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.03, 3, 1, false, 0, Math.PI]} />
          <meshStandardMaterial 
            color="#d4d4d8" 
            metalness={1.0} 
            roughness={0.08} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Blade cutting edge insert */}
        <mesh castShadow position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.9, 0.04, 0.01]} />
          <meshStandardMaterial 
            color="#f4f4f5" 
            metalness={1.0} 
            roughness={0.02} 
          />
        </mesh>

        {/* Glowing runic inlay along the blade curve */}
        <mesh position={[-0.35, 0, 0.02]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.3, 0.01, 4, 16, Math.PI]} />
          <meshStandardMaterial 
            color="#f21449" 
            emissive="#f21449" 
            emissiveIntensity={3.0} 
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* RIGHT BLADE UNIT */}
      <group position={[0.1, 1.2, 0]}>
        {/* Blade bracket connection */}
        <mesh castShadow position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
          <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Curved blade */}
        <mesh ref={rightBladeRef} castShadow position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.03, 3, 1, false, 0, Math.PI]} />
          <meshStandardMaterial 
            color="#d4d4d8" 
            metalness={1.0} 
            roughness={0.08} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Blade cutting edge insert */}
        <mesh castShadow position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.9, 0.04, 0.01]} />
          <meshStandardMaterial 
            color="#f4f4f5" 
            metalness={1.0} 
            roughness={0.02} 
          />
        </mesh>

        {/* Glowing runic inlay along the blade curve */}
        <mesh position={[0.35, 0, 0.02]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.3, 0.01, 4, 16, Math.PI]} />
          <meshStandardMaterial 
            color="#f21449" 
            emissive="#f21449" 
            emissiveIntensity={3.0} 
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* 6. BOTTOM POMMEL (WEIGHT) */}
      <mesh castShadow position={[0, -1.75, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={1.0} roughness={0.1} />
      </mesh>
      
      {/* Decorative spike on the pommel */}
      <mesh castShadow position={[0, -1.9, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.03, 0.15, 12]} />
        <meshStandardMaterial color="#16121e" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

// Main exported Canvas component
export default function BattleAxe3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-full relative group cursor-pointer" id="battle-axe-3d-canvas-container">
      {/* Floating hints */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-wider font-bold text-white/60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 z-20 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#F21449] animate-pulse" />
        Move cursor to swing battle axe
      </div>

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* LIGHTING SETUP */}
        <ambientLight intensity={1.2} />
        
        {/* Core spotlight focused on the battle axe */}
        <spotLight 
          position={[5, 10, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4} 
          castShadow 
        />
        
        {/* Backlight for edge definition */}
        <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#300460" />
        
        {/* Colorful fill lights (Crimson & Violet aura) */}
        <pointLight position={[-2, 1, 2]} intensity={3} color="#f21449" />
        <pointLight position={[2, -1, 2]} intensity={2.5} color="#300460" />

        {/* Levitation / Float effect */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <AxeAssembly isHovered={isHovered} setIsHovered={setIsHovered} />
        </Float>

        {/* Divine Sparkles particles radiating from the axe */}
        <Sparkles 
          count={isHovered ? 80 : 45} 
          scale={[1.8, 3.2, 1.8]} 
          color={isHovered ? "#f21449" : "#a855f7"} 
          size={isHovered ? 3 : 1.8} 
          speed={isHovered ? 1.5 : 0.6}
        />
      </Canvas>
    </div>
  );
}
