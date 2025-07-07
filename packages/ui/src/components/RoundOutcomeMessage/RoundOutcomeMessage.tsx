import { type RoundOutcome } from '@rpsls-game/shared';
import { motion } from 'framer-motion';
import styles from './RoundOutcomeMessage.module.css';
import Typography from '../Typography';
import { resultMessageMap, resultMessageVariantMap } from './RoundOutcomeMessage.helpers';
import { heroPopAnimation } from './RoundOutcome.motion';
import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

type RoundOutcomeMessageProps = {
  roundOutcome: RoundOutcome;
};

export default function RoundOutcomeMessage({ roundOutcome }: RoundOutcomeMessageProps) {
  return (
    <section className={styles.roundOutcomeSection} data-testid="section_round_outcome">
      <motion.div
        className={`${styles.resultHero} ${styles[roundOutcome.result]}`}
        {...heroPopAnimation}
      >
        <Typography
          dataTestId="text_round_outcome"
          variant={resultMessageVariantMap[roundOutcome.result] ?? 'body'}
          as="h1"
        >
          {resultMessageMap[roundOutcome.result]}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATIONS.ROUND_OUTCOME_SUBTEXT, ease: 'easeOut' }}
      >
        <Typography dataTestId="text_outcome_sentence" variant="h3" as="h3">
          <span style={{ color: `var(--${roundOutcome.winnerChoice?.toLowerCase()}-color)` }}>
            {roundOutcome.winnerChoice}
          </span>{' '}
          {roundOutcome.verb ?? 'ties with'}{' '}
          <span style={{ color: `var(--${roundOutcome.loserChoice?.toLowerCase()}-color)` }}>
            {roundOutcome.loserChoice}
          </span>
          !
        </Typography>
      </motion.div>
    </section>
  );
}
