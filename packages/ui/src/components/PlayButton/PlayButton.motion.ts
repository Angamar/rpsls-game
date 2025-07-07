import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

export const playButtonHover = { scale: 1.05, boxShadow: '0 6px 14px rgba(0,0,0,0.15)' };
export const playButtonTransition = {
  duration: ANIMATION_DURATIONS.PLAY_BUTTON,
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
  scale: 1.1,
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
  background: 'linear-gradient(135deg, #ff6a3d, #e02a8f)',
};

export const heroButtonTap = {
  scale: 0.95,
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
};

export const heroButtonAnimate = {
  y: [0, -6, 0],
};

export const heroButtonTransition = {
  duration: ANIMATION_DURATIONS.HERO_BUTTON,
  ease: 'easeOut',
};
