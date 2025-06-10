import type { ChoiceItem } from '@rpsls-game/shared';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../Hand.module.css';
import Card from '../Card';
import { cardTap, cardTransition, computerCardVariants } from '../Card.motion';
import clsx from 'clsx';

type ComputerHandProps = {
  cardChoices: ChoiceItem[];
  isDueling: boolean;
  isDisabled: boolean;
};

function ComputerHand({ cardChoices, isDisabled = false }: ComputerHandProps) {
  return (
    <section
      className={clsx(styles.handSection, styles.computerHandSection)}
      data-testid="section_computer_hand"
    >
      <motion.div
        className={styles.cardsContainer}
        data-testid="wrapper_computer_hand"
        animate={{ y: isDisabled ? -150 : 0 }}
        transition={{
          delay: 0.4,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
        style={{ rotate: '180deg' }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const customProps = { cardIndex: i, isDisabled };

            return (
              <motion.button
                key={cardChoice.id}
                layout
                data-testid="button_card_computer"
                animate="unselected"
                variants={computerCardVariants}
                initial={computerCardVariants.unselected(customProps)}
                exit={{ opacity: 0, y: -70, transition: { duration: 0.2 } }}
                transition={cardTransition}
                whileTap={isDisabled ? undefined : cardTap}
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
