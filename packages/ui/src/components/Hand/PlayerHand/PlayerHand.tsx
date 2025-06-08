import { AnimatePresence, motion } from 'framer-motion';
import type { ChoiceItem } from '@shared/types';

import styles from './PlayerHand.module.css';
import Card from '../Card';
import Typography from '../../Typography';
import { playButtonAnimate, playButtonHover, playButtonTap } from './PlayerHand.motion';

type PlayerHandProps = {
  choices: ChoiceItem[];
  selectedCardId?: number | null;
  playedCardId: number | null;
  onCardSelect: (choiceId: number) => void;
  onCardPlay?: (cardId: number) => void;
};

function PlayerHand({
  choices,
  onCardSelect,
  onCardPlay,
  selectedCardId,
  playedCardId,
}: PlayerHandProps) {
  return (
    <section className={styles.handContainer}>
      {selectedCardId && (
        <motion.button
          className={styles.playButton}
          animate={playButtonAnimate}
          whileHover={playButtonHover}
          whileTap={playButtonTap}
          onClick={() => onCardPlay && onCardPlay(selectedCardId)}
        >
          <Typography variant="h3" as="span">
            PLAY
          </Typography>
        </motion.button>
      )}
      <motion.div
        className={styles.cardsContainer}
        animate={{ y: playedCardId ? 150 : 0 }} // Move hand down when dueling
        transition={{
          delay: playedCardId ? 0.5 : 0, // 1 second delay when moving down, no delay when moving up
          type: 'spring',
          stiffness: 120,
          damping: 18,
          duration: 0.4,
        }}
      >
        <AnimatePresence>
          {choices.map((choice) => (
            <Card
              key={choice.id}
              isComputerCard={false}
              isSelected={selectedCardId === choice.id}
              isDueling={playedCardId === choice.id}
              label={choice.name}
              suit={choice.icon}
              onClick={() => onCardSelect(choice.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default PlayerHand;
