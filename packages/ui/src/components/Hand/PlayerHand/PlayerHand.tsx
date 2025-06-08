import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@shared/types';

import styles from './PlayerHand.module.css';
import Card from '../Card';
import PlayButton from '../../PlayButton';

type PlayerHandProps = {
  cardChoices: ChoiceItem[];
  selectedCardId?: number | null;
  playedCardId: number | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: (cardId: number) => void;
};

function PlayerHand({
  cardChoices,
  onCardSelect,
  onCardPlay,
  selectedCardId,
  playedCardId,
}: PlayerHandProps) {
  return (
    <section className={styles.handSection}>
      {selectedCardId && <PlayButton onClick={() => onCardPlay && onCardPlay(selectedCardId)} />}
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: playedCardId ? 150 : 0 }} // Move hand down when dueling
        transition={{
          delay: playedCardId ? 0.5 : 0, // 0.5 second delay when moving down, no delay when moving up
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
      >
        {/* TODO: Implement card rotation logic instead of using CSS  */}
        <AnimatePresence>
          {cardChoices.map((cardChoice) => {
            const isDueling = playedCardId === cardChoice.id;
            return (
              <Card
                card={cardChoice}
                key={cardChoice.id}
                isComputerCard={false}
                isSelected={selectedCardId === cardChoice.id}
                isDueling={isDueling}
                onClick={playedCardId ? undefined : () => onCardSelect(cardChoice.id)}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default PlayerHand;
