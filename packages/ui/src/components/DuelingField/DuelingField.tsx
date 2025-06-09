import type { ChoiceItem } from '@rpsls-game/shared';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../Hand/Card';
import styles from './DuelingField.module.css';

interface DuelingFieldProps {
  playerCard: ChoiceItem | null;
  computerCard: ChoiceItem | null;
}

const DuelingField = ({ playerCard, computerCard }: DuelingFieldProps) => {
  return (
    <section className={styles.duelingFieldSection} data-testId="section_dueling_field">
      <AnimatePresence>
        {playerCard && computerCard && (
          <>
            <motion.div
              className={styles.playerCard}
              data-testId="card_player"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Card card={playerCard} />
            </motion.div>

            <motion.div
              className={styles.vsText}
              data-testId="text_vs"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1.5, 2.5, 1.5] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              vs
            </motion.div>

            <motion.div
              className={styles.computerCard}
              data-testId="card_computer"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <Card card={computerCard} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DuelingField;
