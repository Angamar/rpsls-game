import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@shared/types';

import styles from './PlayerHand.module.css';
import Card from '../Card';
import PlayButton from '../../PlayButton';
import { getFanCardStyle } from '../Hand.helpers';

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
      {selectedCardId && (
        <PlayButton
          className={styles.playButton}
          onClick={() => onCardPlay && onCardPlay(selectedCardId)}
        />
      )}
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: playedCardId ? 150 : 0 }}
        transition={{
          delay: playedCardId ? 1 : 0,
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
      >
        <AnimatePresence>
          {cardChoices.map((cardChoice, i) => (
            <motion.div key={cardChoice.id} style={getFanCardStyle(i, cardChoices.length)}>
              <Card
                card={cardChoice}
                isComputerCard={false}
                isSelected={selectedCardId === cardChoice.id}
                isDueling={playedCardId === cardChoice.id}
                onClick={playedCardId ? undefined : () => onCardSelect(cardChoice.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default PlayerHand;
