import { motion } from 'framer-motion';
import styles from './Card.module.css';
import { cardVariants, cardHover, cardTransition, cardTap } from './Card.motion';

interface CardProps {
  label: string;
  onClick: () => void;
  suit: string;
  rotation?: number;
  isSelected?: boolean;
}

const Card = ({ label, suit, onClick, isSelected }: CardProps) => {
  return (
    <motion.button
      drag
      // dragElastic={0.2}
      dragMomentum={false}
      onClick={onClick}
      animate={isSelected ? 'selected' : 'unselected'}
      variants={cardVariants}
      whileHover={cardHover}
      whileTap={cardTap}
      transition={cardTransition}
      className={styles.cardButton}
    >
      <div className={styles.cardSuit}>{suit}</div>
      <div className={styles.cardValue}>{label}</div>
    </motion.button>
  );
};

export default Card;
