export const cardVariants = {
  selected: {
    scale: 1.02,
    border: '0.5rem solid #90caf9',
    backgroundColor: '#f5faff',
    zIndex: 10,
  },
  unselected: {
    scale: 1,
    border: 'none',
    backgroundColor: '#fff',
    zIndex: 1,
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
