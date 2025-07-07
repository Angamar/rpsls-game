import { motion } from 'framer-motion';
import { Page } from '../../types';
import styles from './Menu.module.css';
import PlayButton from '../../components/PlayButton';
import LoopingTextBanner from '../../components/LoopingTextBanner';
import GameTitle from '../../components/GameTitle';
import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

interface MenuProps {
  onPageChange: (page: number) => void;
}

const Menu = ({ onPageChange }: MenuProps) => {
  return (
    <section className={styles.menuSection} data-testid="section_menu">
      <LoopingTextBanner position="top" />
      <GameTitle />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: ANIMATION_DURATIONS.GAME_START_BUTTON_FLOAT,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.05, y: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <PlayButton variant="hero" onClick={() => onPageChange(Page.Game)}>
          PLAY!
        </PlayButton>
      </motion.div>
      <LoopingTextBanner position="bottom" />
    </section>
  );
};

export default Menu;
