import { motion } from 'framer-motion';
import styles from './ScoreTracker.module.css';
import { Result } from '@rpsls-game/shared';
import Typography from '../Typography';

interface ScoreTrackerProps {
  results: Result[];
  setNumber: number;
  playerSets: number;
  computerSets: number;
}

const outcomeIconMap = {
  [Result.Win]: '✅',
  [Result.Lose]: '❌',
  [Result.Tie]: '🤝',
};

const ScoreTracker = ({ results, setNumber, playerSets, computerSets }: ScoreTrackerProps) => {
  const last5 = results.slice(-5).reverse();
  const victories = results.filter((result) => result === Result.Win).length;

  return (
    <motion.aside
      className={styles.scoreTrackerAside}
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
    >
      <div>
        <div className={styles.setInfo}>
          <Typography variant="bodySm" as="p">
            Set {setNumber + 1}
          </Typography>
        </div>
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
      </div>
      <div className={styles.setInfo}>
        <Typography variant="bodyXs" as="p">
          {playerSets} - {computerSets}
        </Typography>
      </div>
    </motion.aside>
  );
};

export default ScoreTracker;
