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

export const heroButtonHover = {
  scale: 1.1, // Slight zoom effect
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)', // Enhance shadow
  background: 'linear-gradient(135deg, #ff6a3d, #e02a8f)', // Brighten gradient
};

export const heroButtonTap = {
  scale: 0.95, // Press-down effect
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Reduce shadow
};

export const heroButtonAnimate = {
  y: [0, -6, 0], // Subtle bounce animation
};

export const heroButtonTransition = {
  duration: 0.3, // Smooth transition for hover and tap
  ease: 'easeOut', // Natural deceleration effect
};
