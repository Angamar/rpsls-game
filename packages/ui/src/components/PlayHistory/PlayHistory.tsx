import { Result } from '@rpsls-game/shared';
import clsx from 'clsx';

import styles from './PlayHistory.module.css';
import Typography from '../Typography';

interface PlayHistoryProps {
  results: Result[];
}

const PlayHistory = ({ results }: PlayHistoryProps) => {
  return (
    <section className={styles.playHistoryContainer}>
      <Typography variant="h3" as="p">
        Last 10 results
      </Typography>
      {results.length > 0 && (
        <div className={styles.resultItemsContainer}>
          {results.slice(-10).map((result, index) => (
            <div
              key={index}
              className={clsx(
                styles.resultItem,
                result === Result.Win && styles.win,
                result === Result.Lose && styles.lose,
                result !== Result.Win && result !== Result.Lose && styles.tie,
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PlayHistory;
