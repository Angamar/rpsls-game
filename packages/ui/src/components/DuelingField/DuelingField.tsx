import type { ChoiceItem } from '@shared/types';
import Card from '../Hand/Card';
import styles from './DuelingField.module.css';

interface DuelingFieldProps {
  playerCard: ChoiceItem | null;
  computerCard: ChoiceItem | null;
}

const DuelingField = ({ playerCard, computerCard }: DuelingFieldProps) => {
  return (
    <section className={styles.duelingFieldSection}>
      <div className={styles.playerCard}>{playerCard && <Card card={playerCard} />}</div>
      <div className={styles.computerCard}>{computerCard && <Card card={computerCard} />}</div>
    </section>
  );
};

export default DuelingField;
