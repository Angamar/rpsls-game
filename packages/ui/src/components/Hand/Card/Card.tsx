import { motion } from 'framer-motion';
import styles from './Card.module.css';
import { cardVariants, cardHover, cardTransition, cardTap } from './Card.motion';

interface CardProps {
  label: string;
  onClick?: () => void;
  suit: string;
  rotation?: number;
  isSelected?: boolean;
  isFaceDown?: boolean;
  imageSrc?: string;
}

const Card = ({
  label,
  suit,
  onClick,
  isSelected,
  isFaceDown = false,
  imageSrc = '/card-back.png',
}: CardProps) => {
  const borderColorPulse = isSelected
    ? {
        borderColor: ['#90caf9', '#1976d2', '#90caf9'],
        transition: {
          borderColor: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          },
        },
      }
    : {};
  return (
    <motion.button
      drag={!isFaceDown}
      dragMomentum={false}
      onClick={isFaceDown ? undefined : onClick}
      animate={{
        ...(isFaceDown
          ? cardVariants.faceDown
          : isSelected
            ? cardVariants.selected
            : cardVariants.unselected),
        ...borderColorPulse,
        y: isSelected ? -24 : 0, // go up once when selected, not looping
      }}
      variants={cardVariants}
      whileHover={cardHover}
      whileTap={cardTap}
      transition={cardTransition}
      className={styles.cardButton}
    >
      <motion.div
        className={styles.cardInner}
        initial={{ rotateY: isFaceDown ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
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
