import { motion } from 'framer-motion';
import styles from './Card.module.css';
import {
  cardVariants,
  cardHover,
  cardTransition,
  cardTap,
  pulsingBorderAnimation,
} from './Card.motion';
import { useRef } from 'react';

interface CardProps {
  label: string;
  onClick?: () => void;
  suit: string;
  rotation?: number;
  isSelected?: boolean;
  isFaceDown?: boolean;
  imageSrc?: string;
  isDueling?: boolean;
  isComputerCard: boolean;
}

const Card = ({
  label,
  suit,
  onClick,
  isSelected,
  isDueling,
  isFaceDown = false,
  imageSrc = '/card-back.png',
  isComputerCard,
}: CardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      layout
      ref={cardRef}
      onClick={isFaceDown || isDueling ? undefined : onClick}
      animate={{
        ...(isSelected ? cardVariants.selected : cardVariants.unselected),
        ...(isSelected ? pulsingBorderAnimation : {}),
        y: isSelected ? -24 : 0,
        zIndex: isDueling ? 999 : undefined,
      }}
      variants={cardVariants}
      exit={{ opacity: 0, y: 150, transition: { duration: 0.4 } }} // fade and shrink out
      whileHover={isSelected || isDueling ? undefined : cardHover}
      whileTap={cardTap}
      transition={cardTransition}
      className={styles.cardButton}
    >
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
          <div className={styles.cardSuit}>{suit}</div>
          <div className={styles.cardValue}>{label}</div>
        </div>
        <div className={styles.cardBack}>
          <img src={imageSrc} alt="Card back" className={styles.cardImage} />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Card;
