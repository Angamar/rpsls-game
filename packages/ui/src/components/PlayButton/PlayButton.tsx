import { motion } from 'framer-motion';
import Typography from '../Typography';
import styles from './PlayButton.module.css';
import { playButtonAnimate, playButtonHover, playButtonTap } from './PlayButton.motion';

type PlayButtonProps = {
  onClick?: () => void;
};

const PlayButton = ({ onClick }: PlayButtonProps) => (
  <motion.button
    className={styles.playButton}
    animate={playButtonAnimate}
    whileHover={playButtonHover}
    whileTap={playButtonTap}
    onClick={onClick}
  >
    <Typography variant="h3" as="span">
      PLAY
    </Typography>
  </motion.button>
);

export default PlayButton;
