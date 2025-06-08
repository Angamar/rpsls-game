import type { ChoiceItem } from '@shared/types';
import { motion } from 'framer-motion';

import styles from './ComputerHand.module.css';
import Card from '../Card';

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
        animate={{ y: isDueling ? -150 : 0 }} // Move hand down when dueling
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        {cardChoices &&
          cardChoices.length > 0 &&
          cardChoices.map((choice: ChoiceItem) => (
            <Card
              card={choice}
              isComputerCard
              isFaceDown
              key={'computer_' + choice.id}
              // isSelected={selectedCardId === choice.id}
            />
          ))}
      </motion.div>
    </section>
  );
}

export default ComputerHand;
