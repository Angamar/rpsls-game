export const playButtonHover = { scale: 1.05, boxShadow: '0 6px 14px rgba(0,0,0,0.15)' };
export const playButtonTransition = {
  duration: 1.5,
  repeat: Infinity,
  repeatType: 'loop',
  ease: 'easeInOut',
} as const;
export const playButtonAnimate = {
  y: [0, -4, 0],
};

export const playButtonTap = {
  scale: 0.96,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
};
