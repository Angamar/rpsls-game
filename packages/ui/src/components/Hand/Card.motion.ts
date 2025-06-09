export const cardVariants = {
  selected: {
    scale: 1.02,
    zIndex: 10,
    y: -24,
    transition: { duration: 0.4 },
  },
  unselected: {
    scale: 1,
    zIndex: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  faceUp: {
    rotateY: 0,
  },
  faceDown: {
    rotateY: 180,
  },
};

export const pulsingBorderAnimation = {
  boxShadow: ['0 0 0 0px #90caf9', '0 0 0 8px #1976d2', '0 0 0 0px #90caf9'],
  transition: {
    boxShadow: {
      duration: 2,
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
};

export const computerCardHover = {
  y: -4,
  boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
};

export const cardTap = {
  scale: 0.96,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
};

export const cardTransition = { type: 'spring', stiffness: 300, damping: 20 };
