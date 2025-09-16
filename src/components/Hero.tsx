
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styles from './Hero.module.css';

const projects = [
  { id: 1, name: 'Portfolio (TUI)', url: 'https://qtremors.github.io/tremors/indextui.html', icon: '🌆' },
  { id: 2, name: 'LinkedIn', url: 'www.linkedin.com/in/aman-singh-0a1938301', icon: '🤵' },
  { id: 3, name: 'Portfolio', url: 'https://qtremors.github.io/tremors/', icon: '🏙️' },
  { id: 4, name: 'Github', url: 'https://github.com/qtremors', icon: '⚙️' },
];

const ORBIT_RADIUS = 150;
const ORBIT_DURATION = 20;
const REVEAL_DURATION = 1.5;


const orbitSystemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: 'easeIn',
      when: 'afterChildren',
    },
  },
};

const moonVariants = {
  hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
  visible: (i: number) => {
    const finalAngle = (i / projects.length) * 360;
    const xKeyframes = [0];
    const yKeyframes = [0];
    const steps = 20;

    for (let j = 1; j <= steps; j++) {
      const progress = j / steps;
      const angle = (finalAngle + 90) * progress - 90;
      const radius = ORBIT_RADIUS * progress;
      xKeyframes.push(radius * Math.cos(angle * (Math.PI / 180)));
      yKeyframes.push(radius * Math.sin(angle * (Math.PI / 180)));
    }

    return {
      x: xKeyframes,
      y: yKeyframes,
      scale: 1,
      opacity: 1,
      transition: { duration: REVEAL_DURATION, ease: 'easeOut' },
    };
  },
  exit: (i: number) => ({
    x: 0,
    y: 0,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: 'easeIn',
      delay: (projects.length - i) * 0.05,
    },
  }),
};

const Hero = () => {
  const [isActive, setIsActive] = useState(false);
  const rotationControls = useAnimation();

  const startOrbit = () => {
    rotationControls.start({
      rotate: 360,
      transition: {
        duration: ORBIT_DURATION,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (isActive) {
      const revealFinishTime = REVEAL_DURATION * 1000;
      const orbitStartTimer = setTimeout(startOrbit, revealFinishTime);

      return () => {
        clearTimeout(orbitStartTimer);
        rotationControls.stop();
      };
    } else {
      rotationControls.stop();
    }
  }, [isActive, rotationControls]);

  const handlePlanetClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.planetSystem}>
        <motion.button
          className={styles.planet}
          onClick={handlePlanetClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          👾
        </motion.button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.orbitSystem}
              variants={orbitSystemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className={styles.rotationWrapper}
                animate={rotationControls}
              >
                {projects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.moon}
                    title={project.name}
                    custom={index}
                    variants={moonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={() => rotationControls.stop()}
                    onMouseLeave={() => {
                      if (isActive) {
                        startOrbit();
                      }
                    }}
                  >
                    {project.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;