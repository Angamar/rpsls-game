import { motion } from 'framer-motion';
import styles from './Card.module.css';
import type { ChoiceItem } from '@shared/types';

interface CardProps {
  card: ChoiceItem;
  isFaceDown?: boolean;
  imageSrc?: string;
  isComputerCard?: boolean;
}

const Card = ({
  card,
  isFaceDown = false,
  imageSrc = '/card-back.png',
  isComputerCard,
}: CardProps) => {
  return (
    <motion.div
      className={styles.cardInner}
      initial={{ rotateY: isFaceDown ? 180 : 0 }}
      animate={{ rotateY: isFaceDown ? 180 : 0 }}
      transition={{
        duration: isComputerCard ? 0 : 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className={styles.cardFront}>
        <div className={styles.cardSuit}>{card.icon}</div>
        <div className={styles.cardValue}>{card.name}</div>
      </div>
      <div className={styles.cardBack}>
        <img src={imageSrc} alt="Card back" className={styles.cardImage} />
      </div>
    </motion.div>
  );
};

export default Card;
