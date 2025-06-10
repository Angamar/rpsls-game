import type { ChoiceItem } from '@rpsls-game/shared';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../Hand.module.css';
import Card from '../Card';
import { cardTap, cardTransition, computerCardVariants } from '../Card.motion';
import clsx from 'clsx';

type ComputerHandProps = {
  cardChoices: ChoiceItem[];
  isDueling: boolean;
};

function ComputerHand({ cardChoices, isDueling }: ComputerHandProps) {
  return (
    <section className={clsx(styles.handSection, styles.computerHandSection)}>
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDueling ? -150 : 0 }}
        transition={{
          delay: isDueling ? 0.4 : 0,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
        style={{ rotate: '180deg' }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const customProps = { cardIndex: i, isDueling };

            return (
              <motion.button
                key={cardChoice.id}
                layout
                animate="unselected"
                variants={computerCardVariants}
                custom={customProps}
                initial={computerCardVariants.unselected(customProps)}
                exit={{ opacity: 0, y: -70, transition: { duration: 0.2 } }}
                transition={cardTransition}
                whileTap={isDueling ? undefined : cardTap}
                className={styles.cardButton}
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
