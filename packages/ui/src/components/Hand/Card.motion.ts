import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

export const cardVariants = {
  unselected: (cardIndex: number, isDueling: boolean) => ({
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    y: isDueling ? 0 : [0, -8, 0], // Stop floating when dueling
    boxShadow: '0px 0px 0px rgba(255, 215, 0, 0)',
    border: '3px solid transparent',
    transition: {
      y: isDueling
        ? { duration: 0 }
        : {
            duration:
              ANIMATION_DURATIONS.COMPUTER_CARD_Y_BASE +
              cardIndex * ANIMATION_DURATIONS.COMPUTER_CARD_Y_DELAY_MULTIPLIER,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cardIndex * ANIMATION_DURATIONS.COMPUTER_CARD_Y_DELAY_MULTIPLIER,
          },
    },
  }),
  selected: (isDueling: boolean) => ({
    zIndex: 10,
    rotateY: isDueling ? 0 : [0, 5, -5, 0],
    rotateX: isDueling ? 0 : [0, -5, 5, 0],
    scale: isDueling ? 1 : 1.1,
    y: isDueling ? 0 : -35,
    boxShadow: isDueling
      ? '0px 0px 0px rgba(255, 215, 0, 0)'
      : ['0 0 0 2px #90caf9', '0 0 0 8px #1976d2', '0 0 0 2px #90caf9'],
    transition: {
      rotateY: isDueling
        ? { duration: 0 }
        : {
            duration: ANIMATION_DURATIONS.CARD_ROTATION_Y,
            repeat: Infinity,
            ease: 'easeInOut',
          },
      rotateX: isDueling
        ? { duration: 0 }
        : {
            duration: ANIMATION_DURATIONS.CARD_ROTATION_X,
            repeat: Infinity,
            ease: 'easeInOut',
          },
      boxShadow: isDueling
        ? { duration: 0 }
        : {
            duration: ANIMATION_DURATIONS.CARD_SCALE_GLOW,
            repeat: Infinity,
            ease: 'easeInOut',
          },
      scale: {
        duration: isDueling
          ? ANIMATION_DURATIONS.CARD_SCALE_TRANSITION_DUELING
          : ANIMATION_DURATIONS.CARD_SCALE_TRANSITION,
      },
      y: {
        duration: isDueling
          ? ANIMATION_DURATIONS.CARD_Y_TRANSITION_DUELING
          : ANIMATION_DURATIONS.CARD_Y_TRANSITION,
      },
    },
  }),
};

export const getFanRotation = (index: number, totalCards: number) => {
  const maxRotation = 15; //degrees
  const centerIndex = (totalCards - 1) / 2;
  const rotationStep = maxRotation / (totalCards - 1);
  return (index - centerIndex) * rotationStep;
};

export const computerCardVariants = {
  unselected: (cardIndex: number, isDueling: boolean) => ({
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    y: isDueling ? 0 : [0, -8, 0],
    transition: {
      y: isDueling
        ? { duration: 0 }
        : {
            duration:
              ANIMATION_DURATIONS.COMPUTER_CARD_Y_BASE +
              cardIndex * ANIMATION_DURATIONS.COMPUTER_CARD_Y_DELAY_MULTIPLIER,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cardIndex * ANIMATION_DURATIONS.COMPUTER_CARD_Y_DELAY_MULTIPLIER,
          },
    },
  }),
};

export const getHoverAnimation = (isDisabled: boolean) => {
  return {
    scale: 1.05,
    filter: !isDisabled ? 'brightness(1.1)' : 'brightness(1)',
    transition: {
      duration: ANIMATION_DURATIONS.CARD_HOVER,
      ease: 'easeOut',
    },
  };
};

export const pulsingBorderAnimation = {
  boxShadow: ['0 0 0 0px #90caf9', '0 0 0 8px #1976d2', '0 0 0 0px #90caf9'],
  transition: {
    boxShadow: {
      duration: ANIMATION_DURATIONS.CARD_PULSING_BORDER,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

export const playerCardHover = {
  y: -4,
  boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
  zIndex: 5,
  transition: {
    duration: ANIMATION_DURATIONS.CARD_HOVER,
  },
};

export const computerCardHover = {
  y: -4,
  boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
  transition: {
    duration: ANIMATION_DURATIONS.CARD_HOVER,
  },
};

export const cardTap = {
  scale: 0.96,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
};

export const cardTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  duration: ANIMATION_DURATIONS.CARD_HOVER,
};
