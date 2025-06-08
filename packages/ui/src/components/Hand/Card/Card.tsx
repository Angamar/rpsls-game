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
import type { ChoiceItem } from '@shared/types';

interface CardProps {
  card: ChoiceItem;
  onClick?: () => void;
  rotation?: number;
  isSelected?: boolean;
  isFaceDown?: boolean;
  imageSrc?: string;
  isDueling?: boolean;
  isComputerCard?: boolean;
}

const Card = ({
  card,
  onClick,
  isSelected,
  isDueling,
  isFaceDown = false,
  imageSrc = '/card-back.png',
  isComputerCard,
}: CardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  // const [isDragged, setIsDragged] = useState(false);

  return (
    <motion.button
      layout
      drag
      // dragConstraints={{ left: -300, right: 300 }}
      // onDragStart={isFaceDown || isDueling ? undefined : onClick}
      dragMomentum={false}
      dragElastic={0.1}
      dragSnapToOrigin
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
      style={{ zIndex: isSelected ? 999999 : undefined }}
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
          <div className={styles.cardSuit}>{card.icon}</div>
          <div className={styles.cardValue}>{card.name}</div>
        </div>
        <div className={styles.cardBack}>
          <img src={imageSrc} alt="Card back" className={styles.cardImage} />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Card;
