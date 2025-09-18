
'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";



const StarsBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadAbsorbersPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("particles.js loaded", container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      
      absorbers: [
        {
          opacity: 0,
          position: {
            x: 50,
            y: 0,
          },
          size: {
            value: 225,
            limit:225,
          },
        },
      ],


      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 5,
            duration: 2,
            opacity: 1,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.05,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 300,
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -8,
        }}
      />
    );
  }

  return <></>;
};

export default StarsBackground;