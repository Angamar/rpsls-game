import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

export const heroPopAnimation = {
  initial: { scale: 0.8, rotate: -4, opacity: 0 },
  animate: {
    scale: 1,
    rotate: [4, -2],
    opacity: 1,
  },
  transition: {
    duration: ANIMATION_DURATIONS.HERO_POP,
    ease: [0.23, 1, 0.32, 1],
  },
};
