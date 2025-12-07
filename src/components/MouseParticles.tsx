"use client";

import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  opacity: number;
  size: number;
}

export default function MouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create 2-3 particles per mouse move
      const particleCount = Math.floor(Math.random() * 2) + 2;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Add slight random offset to spread particles
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        const char = Math.random() > 0.5 ? "0" : "1";
        const size = Math.random() * 8 + 10; // 10-18px

        newParticles.push({
          id: particleIdRef.current++,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          char,
          opacity: 1,
          size,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animate particles (fade out and move)
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            opacity: particle.opacity - 0.05,
            y: particle.y - 1, // Move up slightly
          }))
          .filter((particle) => particle.opacity > 0)
      );
    }, 50); // Update every 50ms

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => {
        // Vary colors slightly for more visual interest
        const colorIntensity = particle.opacity;
        const glowColor =
          particle.char === "0"
            ? `rgba(0, 106, 78, ${colorIntensity * 0.8})` // Dark green
            : `rgba(74, 44, 90, ${colorIntensity * 0.8})`; // Dark purple

        return (
          <span
            key={particle.id}
            className="absolute font-mono select-none"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              fontSize: `${particle.size}px`,
              transform: "translate(-50%, -50%)",
              color: particle.char === "0" ? "#006a4e" : "#4a2c5a",
              textShadow: `0 0 ${particle.size * 0.5}px ${glowColor}, 0 0 ${
                particle.size
              }px ${glowColor}`,
              transition: "opacity 0.1s linear",
              fontWeight: "bold",
            }}
          >
            {particle.char}
          </span>
        );
      })}
    </div>
  );
}
