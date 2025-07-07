import styles from './LoopingTextBanner.module.css';
import clsx from 'clsx';

import { motion } from 'framer-motion';
import Typography from '../Typography';
import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

const Rock = () => (
  <Typography variant="rock" as="span">
    rock
  </Typography>
);
const Paper = () => (
  <Typography variant="paper" as="span">
    paper
  </Typography>
);
const Scissors = () => (
  <Typography variant="scissors" as="span">
    scissors
  </Typography>
);
const Lizard = () => (
  <Typography variant="lizard" as="span">
    lizard
  </Typography>
);
const Spock = () => (
  <Typography variant="spock" as="span">
    spock
  </Typography>
);

const textContent = (
  <>
    <Scissors />
    cuts
    <Paper />
    covers
    <Rock />
    crushes
    <Lizard />
    poisons
    <Spock />
    smashes
    <Scissors />
    decapitates
    <Lizard />
    eats
    <Paper />
    disproves
    <Spock />
    vaporizes
    <Rock />
    crushes
  </>
);

export default function LoopingTextBanner({ position }: { position: 'top' | 'bottom' }) {
  return (
    <section
      className={clsx(
        styles.loopingTextBannerSection,
        position === 'top' ? styles.top : styles.bottom,
      )}
      data-testid={`section_looping_text_banner_${position}`}
    >
      <motion.div
        className={styles.scrollingText}
        animate={position === 'top' ? { x: ['-50%', '0%'] } : { x: ['0%', '-50%'] }}
        transition={{
          duration: ANIMATION_DURATIONS.LOOPING_TEXT_BANNER,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <Typography
            key={idx}
            variant="h3"
            as="p"
            dataTestId="text_banner_sentence"
            className={styles.text}
          >
            {textContent}
          </Typography>
        ))}
      </motion.div>
    </section>
  );
}
