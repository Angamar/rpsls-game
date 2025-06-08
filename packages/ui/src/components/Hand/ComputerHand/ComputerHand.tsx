import type { ChoiceItem } from '@shared/types';
import { motion } from 'framer-motion';

import styles from './ComputerHand.module.css';
import Card from '../Card';

type ComputerHand = {
  isDueling?: boolean;
  choices: ChoiceItem[];
  selectedCardId?: string | null;
  playedCardId?: number | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: () => void;
};

function ComputerHand({ choices, isDueling }: ComputerHand) {
  return (
    <section className={styles.handContainer}>
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: isDueling ? -150 : 0 }} // Move hand down when dueling
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        {choices &&
          choices.length > 0 &&
          choices.map((choice: ChoiceItem) => (
            <Card
              isComputerCard
              isFaceDown
              key={'computer_' + choice.id}
              // isSelected={selectedCardId === choice.id}
              label={choice.name}
              suit={choice.icon}
            />
          ))}
      </motion.div>
    </section>
  );
}

export default ComputerHand;
