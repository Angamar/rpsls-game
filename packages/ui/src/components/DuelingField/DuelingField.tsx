import type { ChoiceItem } from '@shared/types';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../Hand/Card';
import styles from './DuelingField.module.css';

interface DuelingFieldProps {
  playerCard: ChoiceItem | null;
  computerCard: ChoiceItem | null;
}

const DuelingField = ({ playerCard, computerCard }: DuelingFieldProps) => {
  return (
    <section className={styles.duelingFieldSection}>
      <AnimatePresence>
        {playerCard && (
          <motion.div
            className={styles.playerCard}
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {playerCard && computerCard && (
          <motion.div
            className={styles.vsText}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1.5, 2.5, 1.5] }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            VS
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {computerCard && (
          <motion.div
            className={styles.computerCard}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            <Card card={computerCard} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DuelingField;
