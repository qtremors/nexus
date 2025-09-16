// hooks/useOrbitAnimation.ts

import { useState } from 'react';
import { useAnimation } from 'framer-motion';

interface AnimationParams {
  orbitDuration: number;
  revealDuration: number;
}

export const useOrbitAnimation = ({ orbitDuration, revealDuration }: AnimationParams) => {
  const [animationState, setAnimationState] = useState('idle');
  
  const rotationControls = useAnimation();
  const travelControls = useAnimation();

  const startOrbit = () => {
    rotationControls.start({
      rotate: 360,
      transition: { duration: orbitDuration, ease: 'linear', repeat: Infinity },
    });
  };

  const startJourney = (onComplete: () => void) => {
    travelControls.start({
      y: -600,
      opacity: 0,
      transition: { duration: orbitDuration * 2, ease: 'easeInOut' },
    }).then(onComplete);
  };

  const handlePlanetClick = (onComplete: () => void) => {
    if (animationState === 'idle') {
      setAnimationState('active');
      setTimeout(() => {
        startOrbit();
        startJourney(onComplete);
      }, revealDuration * 1000);
    }
  };
  
  const handleMoonHoverStart = () => rotationControls.stop();
  const handleMoonHoverEnd = () => {
    if (animationState === 'active') startOrbit();
  };
  
  const handlePlanetHoverStart = () => travelControls.stop();
  const handlePlanetHoverEnd = () => {
    if (animationState === 'active') startJourney(() => {});
  };

  return {
    animationState,
    rotationControls,
    travelControls,
    handlePlanetClick,
    handleMoonHoverStart,
    handleMoonHoverEnd,
    handlePlanetHoverStart,
    handlePlanetHoverEnd,
  };
};