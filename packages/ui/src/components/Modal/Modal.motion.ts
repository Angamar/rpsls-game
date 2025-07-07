import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

export const backdropVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(4px)',
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_BACKDROP_SHOW,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_BACKDROP_HIDE,
      ease: 'easeIn',
    },
  },
};

export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: ANIMATION_DURATIONS.MODAL_CONTENT_HIDE,
      ease: 'easeIn',
    },
  },
};
