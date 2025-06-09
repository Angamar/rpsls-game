import type { ChoiceItem } from '@rpsls-game/shared';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../Hand.module.css';
import Card from '../Card';
import { getComputerFanCardStyle } from '../Hand.helpers';
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
            const fanStyle = getComputerFanCardStyle(i, cardChoices.length, false);

            return (
              <motion.button
                key={cardChoice.id}
                initial={{ opacity: 0, rotate: fanStyle.rotate, y: fanStyle.y }}
                animate={{ opacity: 1, rotate: fanStyle.rotate, y: fanStyle.y }}
                exit={{
                  opacity: 0,
                  rotate: fanStyle.rotate,
                  y: fanStyle.y - 50, // move upward from current y
                  transition: { duration: 0.4 },
                }}
                transition={cardTransition}
                whileHover={computerCardHover}
                whileTap={cardTap}
                className={styles.cardButton}
                tabIndex={-1}
                type="button"
              >
                <Card isFaceDown />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default ComputerHand;
