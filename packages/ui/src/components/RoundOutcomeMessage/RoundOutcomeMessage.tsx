import { type RoundOutcome } from '@rpsls-game/shared';
import { motion } from 'framer-motion';
import styles from './RoundOutcomeMessage.module.css';
import Typography from '../Typography';
import { resultMessageMap, resultMessageVariantMap } from './RoundOutcomeMessage.helpers';
import { heroPopAnimation } from './RoundOutcome.motion';

type RoundOutcomeMessageProps = {
  roundOutcome: RoundOutcome;
};

export default function RoundOutcomeMessage({ roundOutcome }: RoundOutcomeMessageProps) {
  return (
    <section className={styles.roundOutcomeSection}>
      <motion.div
        className={`${styles.resultHero} ${styles[roundOutcome.result]}`}
        {...heroPopAnimation}
      >
        <Typography variant={resultMessageVariantMap[roundOutcome.result] ?? 'body'} as="h1">
          {resultMessageMap[roundOutcome.result] ?? 'Uh, oh! Something went wrong.'}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Typography variant="h3" as="h3">
          {`${roundOutcome.winnerChoice} ${roundOutcome.verb ?? '&'} ${roundOutcome.loserChoice}!`}
        </Typography>
      </motion.div>
    </section>
  );
}
