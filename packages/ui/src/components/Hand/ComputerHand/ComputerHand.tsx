import type { ChoiceItem } from '@shared/types';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../Hand.module.css';
import Card from '../Card';
import { getFanCardStyle } from '../Hand.helpers';
import { cardTap, cardTransition, computerCardHover } from '../Card.motion';
import clsx from 'clsx';

type ComputerHandProps = {
  cardChoices: ChoiceItem[];
  isDueling?: boolean;
};

function ComputerHand({ cardChoices, isDueling }: ComputerHandProps) {
  return (
    <section className={clsx(styles.handSection, styles.computerHandSection)}>
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDueling ? -150 : 0 }}
        transition={{
          delay: isDueling ? 1 : 0,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
        style={{ rotate: '180deg' }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const fanStyle = getFanCardStyle(i, cardChoices.length);

            return (
              <motion.button
                key={cardChoice.id}
                layout
                animate={{
                  ...fanStyle,
                }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }} // Reverse exit animation
                whileHover={computerCardHover}
                whileTap={cardTap}
                transition={cardTransition}
                className={styles.cardButton}
                tabIndex={-1}
                type="button"
              >
                <Card card={cardChoice} isFaceDown />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default ComputerHand;
