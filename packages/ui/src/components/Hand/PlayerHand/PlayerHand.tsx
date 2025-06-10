import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@rpsls-game/shared';

import styles from '../Hand.module.css';
import clsx from 'clsx';

import Card from '../Card';
import PlayButton from '../../PlayButton';
import { cardTap, cardTransition, cardVariants, getHoverAnimation } from '../Card.motion';

type PlayerHandProps = {
  cardChoices: ChoiceItem[];
  selectedCardId?: number | null;
  isDueling: boolean;
  isDisabled?: boolean; // Add this
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: (cardId: number) => void;
};

function PlayerHand({
  cardChoices,
  onCardSelect,
  onCardPlay,
  selectedCardId,
  isDueling,
  isDisabled = false,
}: PlayerHandProps) {
  const handleCardSelect = (choiceId: number) => {
    if (isDisabled) return;
    onCardSelect(choiceId);
  };

  const handleCardPlay = (selectedCardId?: number | null) => {
    if (isDisabled || !onCardPlay || !selectedCardId || isDueling) return;
    onCardPlay(selectedCardId);
  };

  return (
    <section className={clsx(styles.handSection, styles.computerHandSection)}>
      {selectedCardId && !isDisabled && (
        <PlayButton className={styles.playButton} onClick={() => handleCardPlay(selectedCardId)} />
      )}
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDisabled ? 150 : 0 }}
        transition={{
          delay: 0.4,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const isSelected = selectedCardId === cardChoice.id;

            return (
              <motion.button
                key={cardChoice.id}
                layout
                animate={isSelected ? 'selected' : 'unselected'}
                variants={{
                  unselected: cardVariants.unselected(i, isDueling),
                  selected: cardVariants.selected(isDueling),
                }}
                initial={cardVariants.unselected(i, isDueling)}
                exit={{ opacity: 0, y: -70, transition: { duration: 0.2 } }}
                whileHover={getHoverAnimation(isDueling || isDisabled)}
                whileTap={cardTap}
                transition={cardTransition}
                onClick={() => !isDueling && !isDisabled && handleCardSelect(cardChoice.id)}
                className={styles.cardButton}
                type="button"
                disabled={isDueling || isDisabled}
                dragSnapToOrigin
                drag={!isDisabled}
              >
                <Card cardFaceSrc={`/card-${cardChoice.name}.png`} />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default PlayerHand;
