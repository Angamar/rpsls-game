import type { ChoiceItem } from '@shared/types';
import { motion } from 'framer-motion';

import styles from './ComputerHand.module.css';
import Card from '../Card';
import { getFanCardStyle } from '../Hand.helpers';

type ComputerHand = {
  isDueling?: boolean;
  cardChoices: ChoiceItem[];
  selectedCardId?: string | null;
  playedCardId?: number | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: () => void;
};

function ComputerHand({ cardChoices, isDueling }: ComputerHand) {
  return (
    <section className={styles.handContainer}>
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDueling ? 150 : 0 }} // Move hand down when dueling
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ rotate: '180deg' }}
      >
        {cardChoices &&
          cardChoices.length > 0 &&
          cardChoices.map((cardChoice: ChoiceItem, i) => {
            return (
              <motion.div key={cardChoice.id} style={getFanCardStyle(i, cardChoices.length)}>
                <Card
                  isComputerCard
                  card={cardChoice}
                  isFaceDown
                  key={'computer_' + cardChoice.id}
                  // isSelected={selectedCardId === choice.id}
                />
              </motion.div>
            );
          })}
      </motion.div>
    </section>
  );
}

export default ComputerHand;
