import type { ChoiceItem } from '@rpsls-game/shared';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../Hand/Card';
import styles from './DuelingField.module.css';

interface DuelingFieldProps {
  playerCard: ChoiceItem['name'] | null;
  computerCard: ChoiceItem['name'] | null;
}

const DuelingField = ({ playerCard, computerCard }: DuelingFieldProps) => {
  return (
    <section className={styles.duelingFieldSection} data-testid="section_dueling_field">
      <AnimatePresence>
        {playerCard && computerCard && (
          <>
            <motion.div
              className={styles.playerCard}
              data-testid={`card_duel_player_${playerCard}`}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Card cardFaceSrc={`card-${playerCard}.png`} />
            </motion.div>

            <motion.div
              className={styles.vsText}
              data-testid="text_vs"
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
              data-testid={`card_duel_computer_${computerCard}`}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <Card cardFaceSrc={`card-${computerCard}.png`} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DuelingField;
