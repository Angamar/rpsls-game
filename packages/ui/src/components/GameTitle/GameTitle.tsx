import { motion } from 'framer-motion';
import Typography from '../Typography';
import styles from './GameTitle.module.css';
import typographyStyles from '../Typography/Typography.module.css';

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
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <Typography variant="menuHero" className={className}>
      {word}
    </Typography>
  </motion.span>
);

export default function GameTitle() {
  return (
    <section className={styles.gameTitleSection} data-testId="section_game_title">
      <AnimatedWord word="Rock" className={typographyStyles.rock} delay={0} />
      <AnimatedWord word="Paper" className={typographyStyles.paper} delay={0.8} />
      <AnimatedWord word="Scissors" className={typographyStyles.scissors} delay={1.6} />
      <AnimatedWord word="Lizard" className={typographyStyles.lizard} delay={2.4} />
      <AnimatedWord word="Spock!" className={typographyStyles.spock} delay={3.2} />
      <Typography variant="h2" as="p" className={styles.subtitle}>
        Five choices. Infinite glory.
      </Typography>
    </section>
  );
}
