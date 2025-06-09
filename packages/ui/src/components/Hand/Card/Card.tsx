import styles from './Card.module.css';

interface CardProps {
  isFaceDown?: boolean;
  cardFaceSrc?: string;
}

const Card = ({ isFaceDown, cardFaceSrc }: CardProps) => {
  return (
    <div className={styles.cardWrapper}>
      {!isFaceDown ? (
        <div className={styles.cardFront}>
          <img src={cardFaceSrc} alt="Card front" className={styles.cardImage} />
        </div>
      ) : (
        <div className={styles.cardBack}>
          <img src="/card-back.png" alt="Card back" className={styles.cardImage} />
        </div>
      )}
    </div>
  );
};

export default Card;
