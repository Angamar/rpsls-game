import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@shared/types';

import styles from './PlayerHand.module.css';
import Card from '../Card';
import PlayButton from '../../PlayButton';
import { getFanCardStyle } from '../Hand.helpers';
import {
  cardHover,
  cardTap,
  cardTransition,
  pulsingBorderAnimation,
  cardVariants,
} from '../Card.motion';

type PlayerHandProps = {
  cardChoices: ChoiceItem[];
  selectedCardId?: number | null;
  isDueling: boolean;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: (cardId: number) => void;
};

function PlayerHand({
  cardChoices,
  onCardSelect,
  onCardPlay,
  selectedCardId,
  isDueling,
}: PlayerHandProps) {
  return (
    <section className={styles.handSection}>
      {selectedCardId && (
        <PlayButton
          className={styles.playButton}
          onClick={() => onCardPlay && selectedCardId && !isDueling && onCardPlay(selectedCardId)}
        />
      )}
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDueling ? 150 : 0 }}
        transition={{
          delay: isDueling ? 1 : 0,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => {
            const isSelected = selectedCardId === cardChoice.id;
            const fanStyle = getFanCardStyle(i, cardChoices.length);
            const isFaceDown = false; // or your logic if needed

            return (
              <motion.button
                key={cardChoice.id}
                layout
                animate={{
                  ...fanStyle,
                  ...(isSelected ? cardVariants.selected : cardVariants.unselected),
                  ...(isSelected ? pulsingBorderAnimation : {}),
                }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
                whileHover={isSelected || isDueling ? undefined : cardHover}
                whileTap={cardTap}
                transition={cardTransition}
                onClick={isFaceDown || isDueling ? undefined : () => onCardSelect(cardChoice.id)}
                className={styles.cardButton}
                tabIndex={isFaceDown ? -1 : 0}
                type="button"
                // drag
                // dragMomentum={false}
                // dragElastic={0.1}
                // dragConstraints={{ top: -300, left: -300, right: 300, bottom: 0 }}
                // dragSnapToOrigin
              >
                <Card card={cardChoice} isComputerCard={false} isFaceDown={isFaceDown} />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default PlayerHand;
