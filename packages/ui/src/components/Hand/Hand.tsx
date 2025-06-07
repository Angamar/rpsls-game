import { motion } from 'framer-motion';
import type { ChoiceItem } from '@shared/types';

import styles from './Hand.module.css';
import Card from './Card';
import Typography from '../Typography';
import {
  playButtonAnimate,
  playButtonHover,
  // playButtonTransition,
  playButtonTap,
} from './Hand.motion';

type HandProps = {
  choices: ChoiceItem[];
  selectedCardId?: number | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: () => void;
};

function Hand({ choices, onCardSelect, onCardPlay, selectedCardId }: HandProps) {
  return (
    <section className={styles.handContainer}>
      {selectedCardId && (
        <motion.button
          className={styles.playButton}
          animate={playButtonAnimate}
          // transition={playButtonTransition}
          whileHover={playButtonHover}
          whileTap={playButtonTap}
          onClick={onCardPlay}
        >
          <Typography variant="h3" as="span">
            PLAY
          </Typography>
        </motion.button>
      )}
      <div className={styles.cardsContainer}>
        {choices &&
          choices.length > 0 &&
          choices.map((choice: ChoiceItem) => (
            <Card
              key={choice.id}
              isSelected={selectedCardId === choice.id}
              label={choice.name}
              suit={choice.icon}
              onClick={() => {
                onCardSelect(choice.id);
              }}
            />
          ))}
      </div>
    </section>
  );
}

export default Hand;
