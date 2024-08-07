"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { loadFull } from "tsparticles";

function ParticleComps() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: {
            enable: true,
            zIndex: -10,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: theme === "dark" ? "#bbb" : "#000",
            },
            links: {
              color: theme === "dark" ? "#999" : "#000",
              distance: 150,
              enable: true,
              opacity: 0.8,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 100,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
}

export default ParticleComps;
