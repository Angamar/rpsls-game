import { motion } from 'framer-motion';
import Typography from '../Typography';
import styles from './GameTitle.module.css';
import typographyStyles from '../Typography/Typography.module.css';
import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

const AnimatedWord = ({
  word,
  className,
  delay,
}: {
  word: string;
  className: string;
  delay: number;
}) => (
  <motion.span
    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
    transition={{
      duration: ANIMATION_DURATIONS.GAME_TITLE_WORD,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  >
    <Typography variant="menuHero" className={className}>
      {word}
    </Typography>
  </motion.span>
);

export default function GameTitle() {
  return (
    <section className={styles.gameTitleSection} data-testid="section_game_title">
      <AnimatedWord word="Rock" className={typographyStyles.rock} delay={0} />
      <AnimatedWord
        word="Paper"
        className={typographyStyles.paper}
        delay={ANIMATION_DURATIONS.GAME_TITLE_WORD_DELAY}
      />
      <AnimatedWord
        word="Scissors"
        className={typographyStyles.scissors}
        delay={ANIMATION_DURATIONS.GAME_TITLE_WORD_DELAY * 2}
      />
      <AnimatedWord
        word="Lizard"
        className={typographyStyles.lizard}
        delay={ANIMATION_DURATIONS.GAME_TITLE_WORD_DELAY * 3}
      />
      <AnimatedWord
        word="Spock!"
        className={typographyStyles.spock}
        delay={ANIMATION_DURATIONS.GAME_TITLE_WORD_DELAY * 4}
      />
      <Typography variant="h2" as="p" className={styles.subtitle}>
        Five choices. Infinite glory.
      </Typography>
    </section>
  );
}
