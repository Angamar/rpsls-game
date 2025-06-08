import { motion } from 'framer-motion';
import Typography from '../Typography';
import styles from './PlayButton.module.css';
import clsx from 'clsx';
import { playButtonAnimate, playButtonHover, playButtonTap } from './PlayButton.motion';

type PlayButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const PlayButton = ({ onClick, children, className }: PlayButtonProps) => (
  <motion.button
    className={clsx(styles.playButton, className)}
    animate={playButtonAnimate}
    whileHover={playButtonHover}
    whileTap={playButtonTap}
    onClick={onClick}
  >
    <Typography variant="h3" as="span">
      {children || 'Play'}
    </Typography>
  </motion.button>
);

export default PlayButton;
