import type { ChoiceItem } from '@shared/types';

import styles from './ComputerHand.module.css';
import Card from '../Card';

type HandProps = {
  isComputer?: boolean;
  choices: ChoiceItem[];
  selectedCardId?: string | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: () => void;
};

function ComputerHand({ choices }: HandProps) {
  return (
    <section className={styles.handContainer}>
      <div className={styles.cardsContainer}>
        {choices &&
          choices.length > 0 &&
          choices.map((choice: ChoiceItem) => (
            <Card
              isFaceDown
              key={'computer_' + choice.id}
              // isSelected={selectedCardId === choice.id}
              label={choice.name}
              suit={choice.icon}
            />
          ))}
      </div>
    </section>
  );
}

export default ComputerHand;
