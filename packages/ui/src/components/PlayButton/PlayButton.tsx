import { motion } from 'framer-motion';
import Typography from '../Typography';
import styles from './PlayButton.module.css';
import { ButtonVariant } from '../../types';
import clsx from 'clsx';
import {
  playButtonAnimate,
  playButtonHover,
  playButtonTap,
  heroButtonAnimate,
  heroButtonHover,
  heroButtonTap,
  heroButtonTransition,
} from './PlayButton.motion';

type PlayButtonProps = {
  variant?: 'hero' | 'regular';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const PlayButton = ({ onClick, children, className, variant }: PlayButtonProps) => (
  <motion.button
    data-testId="button_play"
    className={clsx(styles.playButton, variant === ButtonVariant.Hero && styles.hero, className)}
    animate={variant === ButtonVariant.Hero ? heroButtonAnimate : playButtonAnimate}
    whileHover={variant === ButtonVariant.Hero ? heroButtonHover : playButtonHover}
    whileTap={variant === ButtonVariant.Hero ? heroButtonTap : playButtonTap}
    transition={variant === ButtonVariant.Hero ? heroButtonTransition : undefined}
    onClick={onClick}
  >
    <Typography
      data-testId="label_button"
      variant={variant === ButtonVariant.Hero ? 'heroButtonText' : 'buttonText'}
      as="span"
    >
      {children || 'Play'}
    </Typography>
  </motion.button>
);

export default PlayButton;
