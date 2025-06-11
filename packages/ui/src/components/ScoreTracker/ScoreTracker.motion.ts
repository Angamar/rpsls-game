import type { Variants } from 'framer-motion';

export const asideVariants = {
  initial: (baseHeight: number) => ({
    x: -20,
    opacity: 0,
    height: baseHeight,
  }),
  animate: (finalHeight: number) => ({
    x: 0,
    opacity: 1,
    height: finalHeight,
  }),
};

export const asideTransition = {
  x: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
  opacity: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
  height: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    duration: 0.6,
  },
};

export const victoryCountVariants = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.2, 1] },
};

export const victoryCountTransition = {
  duration: 0.3,
};

export const historyItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

export const historyItemTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const historyItemHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const newHistoryItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -30,
    scale: 0.5,
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: [0.5, 1.2, 1],
    rotateX: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.6,
    transition: { duration: 0.3 },
  },
};

export const newHistoryItemTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
  duration: 0.6,
};

export const iconSpinVariants = {
  initial: (isNewest: boolean) => ({
    rotateY: isNewest ? -180 : 0,
  }),
  animate: {
    rotateY: 0,
  },
};

export const getIconSpinTransition = (isNewest: boolean, index: number) => ({
  duration: 0.5,
  delay: isNewest ? 0.2 : index * 0.05,
});

export const historyListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const centerScoreVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    filter: 'blur(20px)',
  },
  animate: {
    opacity: [0, 0.15, 0.08, 0],
    scale: [0.5, 1.2, 1, 1],
    filter: ['blur(20px)', 'blur(2px)', 'blur(5px)', 'blur(10px)'],
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.5 },
  },
};

export const centerScoreTransition = {
  duration: 2.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const getHistoryItemKey = (originalIndex: number) => `result_${originalIndex}`;

export const calculateDynamicHeight = (
  displayResultsLength: number,
  baseHeight: number = 140,
  itemHeight: number = 48,
) => {
  const calculatedHeight = baseHeight + displayResultsLength * itemHeight;
  return Math.min(calculatedHeight);
};
