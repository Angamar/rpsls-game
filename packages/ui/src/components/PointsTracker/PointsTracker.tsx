import { motion } from 'framer-motion';
import styles from './PointsTracker.module.css';
import { Result } from '@rpsls-game/shared';

interface ResultsTrackerProps {
  results: Result[];
}

const outcomeIconMap = {
  [Result.Win]: '✅',
  [Result.Lose]: '❌',
  [Result.Tie]: '🤝',
};

const ResultsTracker = ({ results }: ResultsTrackerProps) => {
  const last5 = results.slice(-5).reverse();
  const victories = results.filter((result) => result === Result.Win).length;

  return (
    <motion.aside
      className={styles.resultsTrackerAside}
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
    >
      <div className={styles.victoryCount}>🏆 {victories}</div>
      <div className={styles.historyList}>
        {last5.map((result, i) => (
          <motion.div
            key={i}
            className={styles.historyItem}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {outcomeIconMap[result]}
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
};

export default ResultsTracker;
