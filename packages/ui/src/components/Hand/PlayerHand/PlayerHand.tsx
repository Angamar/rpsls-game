import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@rpsls-game/shared';

import styles from '../Hand.module.css';
import clsx from 'clsx';

import Card from '../Card';
import PlayButton from '../../PlayButton';
import {
  cardTap,
  cardTransition,
  cardVariants,
  getHoverAnimation,
  getFanRotation,
} from '../Card.motion';

type PlayerHandProps = {
  cardChoices: ChoiceItem[];
  selectedCardId?: number | null;
  isDueling: boolean;
  isDisabled?: boolean;
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
    <section
      className={clsx(styles.handSection, styles.playerHandSection)}
      data-testid="section_player_hand"
    >
      {selectedCardId && !isDisabled && (
        <PlayButton className={styles.playButton} onClick={() => handleCardPlay(selectedCardId)} />
      )}
      <motion.div
        className={styles.cardsContainer}
        data-testid="container_player_hand"
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
            const fanRotation = getFanRotation(i, cardChoices.length);

            return (
              <motion.button
                key={cardChoice.id}
                card-number={i}
                data-testid={`button_player_card_${cardChoice.name}`}
                layout
                animate={isSelected ? 'selected' : 'unselected'}
                variants={{
                  unselected: {
                    ...cardVariants.unselected(i, isDueling),
                    rotate: fanRotation,
                    originY: 1.2, // Rotation origin point (bottom of card)
                  },
                  selected: {
                    ...cardVariants.selected(isDueling),
                    rotate: fanRotation, // Keep the fan rotation when selected
                    originY: 1.2,
                  },
                }}
                initial={{
                  ...cardVariants.unselected(i, isDueling),
                  rotate: fanRotation,
                  originY: 1.2,
                }}
                exit={{
                  opacity: 0,
                  y: -70,
                  rotate: fanRotation,
                  transition: { duration: 0.2 },
                }}
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
