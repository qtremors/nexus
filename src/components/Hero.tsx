'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import styles from './Hero.module.css';
import BlackholeBackground from './BlackholeBackground';
import PlanetBackground from './PlanetBackground';

const spaceships = [
  { id: 1, name: 'Github', url: 'https://github.com/qtremors', image: '/ship2.png' },
  { id: 2, name: 'Portfolio (TUI)', url: 'https://qtremors.github.io/tremors/indextui.html', image: '/ship1.png' },
  { id: 3, name: 'Portfolio', url: 'https://qtremors.github.io/tremors/', image: '/ship1.png' },
  { id: 4, name: 'LinkedIn', url: 'https://www.linkedin.com/in/aman-singh-0a1938301', image: '/ship2.png' },
];



const REVEAL_DURATION = 1.0;
const EXIT_DURATION = 1.5;
const ROTATION_DURATION = 0.4;

const spaceshipVariants: Variants = {

  hidden: {
    y: '-50vh',
    x: 0,
    opacity: 0,
    scale: 0.3,
    rotate: 0,
  },

  visible: (i: number) => ({
    y: 0,
    x: (i - (spaceships.length - 1) / 2) * 140,
    opacity: 1,
    scale: 1,
    transition: {
      duration: REVEAL_DURATION,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),

  exit: (i: number) => ({
    rotate: [null, 180, 180],
    y: [null, 0, '-45vh'],
    x: [null, null, 0],
    opacity: [null, 1, 0],
    scale: [null, 1, 0.3],

    transition: {
      duration: EXIT_DURATION + ROTATION_DURATION,
      
      delay: (spaceships.length - 1 - i) * 0.5,

      times: [0, ROTATION_DURATION / (EXIT_DURATION + ROTATION_DURATION), 1],

      ease: ['circOut', 'easeIn'],
    },
  }),
};

const Hero = () => {
  const [isDeployed, setIsDeployed] = useState(false);

  const handleStationClick = () => {
    setIsDeployed((prev) => !prev);
  };

  return (
    <section className={styles.heroContainer}>
      <BlackholeBackground />
      <PlanetBackground />
      <div className={styles.stationSystem}>
        <motion.button
          className={styles.spaceStation}
          onClick={handleStationClick}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle spaceships"
        >
          <Image
            src="/spacestation.png"
            alt="Space Station"
            fill
            sizes="150px"
            priority
          />
        </motion.button>

        <div className={styles.spaceshipContainer}>
          <AnimatePresence>
            {isDeployed &&
              spaceships.map((ship, index) => (
                <motion.a
                  key={ship.id}
                  href={ship.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.spaceship}
                  title={ship.name}
                  custom={index}
                  variants={spaceshipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.15, y: -10 }}
                >
                  <Image src={ship.image} alt={ship.name} fill sizes="80px" />
                </motion.a>
              ))}
          </AnimatePresence>
        </div>
      </div>

       <Link href="/projects" className={styles.wormholeLink} aria-label="Navigate to projects page">
        <motion.div
          className={styles.wormholeImageContainer}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            opacity: { delay: 0.8, duration: 1 },
            scale: { delay: 0.8, duration: 1 },
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.3 },
          }}
        >
            <Image
                src="/wormhole.png"
                alt="Navigate to projects"
                className={styles.wormholeImage}
                fill
                sizes="100px"
            />
        </motion.div>
        <span className={styles.wormholeText}></span>
      </Link>
    </section>
  );
};

export default Hero;