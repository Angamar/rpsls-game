export const cardVariants = {
  selected: {
    scale: 1.02,
    borderWidth: '0.5rem',
    borderStyle: 'solid',
    borderColor: '#90caf9',
    backgroundColor: '#f5faff',
    zIndex: 10,
    y: '-1.5rem',
    // rotateY: 0,
    transition: { duration: 0.4 },
  },
  unselected: {
    scale: 1,
    border: 'none',
    backgroundColor: '#fff',
    zIndex: 1,
    // rotateY: 0,
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
  borderColor: ['#90caf9', '#1976d2', '#90caf9'],
  transition: {
    borderColor: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

export const cardHover = {
  y: -4,
  boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
  zIndex: 5,
};

export const cardTap = {
  scale: 0.96,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
};

export const cardTransition = { type: 'spring', stiffness: 300, damping: 20 };
