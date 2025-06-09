import { motion } from 'framer-motion';
import styles from './Card.module.css';
import type { ChoiceItem } from '@shared/types';

interface CardProps {
  card: ChoiceItem;
  isFaceDown?: boolean;
  imageSrc?: string;
}

const Card = ({ card, isFaceDown = false, imageSrc = '/card-back.png' }: CardProps) => {
  return (
    <motion.div className={styles.cardWrapper}>
      {!isFaceDown ? (
        <div className={styles.cardFront}>
          <div className={styles.cardSuit}>{card.icon}</div>
          <div className={styles.cardValue}>{card.name}</div>
        </div>
      ) : (
        <div className={styles.cardBack}>
          <img src={imageSrc} alt="Card back" className={styles.cardImage} />
        </div>
      )}
    </motion.div>
  );
};

export default Card;
