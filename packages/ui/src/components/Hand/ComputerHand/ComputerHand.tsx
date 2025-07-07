import type { ChoiceItem } from '@rpsls-game/shared';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../Hand.module.css';
import Card from '../Card';
import { cardTap, cardTransition, computerCardVariants, getFanRotation } from '../Card.motion';
import clsx from 'clsx';
import { ANIMATION_DURATIONS } from '../../../constants/animationDurations';

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
        data-testid="container_computer_hand"
        animate={{ y: isDisabled ? -150 : 0 }}
        transition={{
          delay: ANIMATION_DURATIONS.COMPUTER_HAND_DELAY,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: ANIMATION_DURATIONS.COMPUTER_HAND_ANIMATION,
        }}
        style={{ rotate: '180deg' }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const fanRotation = getFanRotation(i, cardChoices.length);

            return (
              <motion.button
                key={cardChoice.id}
                layout
                data-testid="button_computer_card"
                animate={{
                  ...computerCardVariants.unselected(i, isDisabled),
                  rotate: fanRotation,
                  originY: 1.2, // Rotation origin point (bottom of card)
                }}
                initial={{
                  ...computerCardVariants.unselected(i, isDisabled),
                  rotate: fanRotation,
                  originY: 1.2,
                }}
                exit={{
                  opacity: 0,
                  y: -70,
                  rotate: fanRotation,
                  transition: { duration: ANIMATION_DURATIONS.COMPUTER_HAND_EXIT },
                }}
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
