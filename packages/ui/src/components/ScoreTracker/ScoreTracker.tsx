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
      data-testId="aside_score_tracker"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
    >
      <div>
        <Typography variant="bold" as="div" className={styles.set} data-testId="text_set_number">
          set {setNumber + 1}
        </Typography>

        <div className={styles.victoryCount} data-testId="text_hands_won">
          🏆 {victories}
        </div>
        <div className={styles.historyList} data-testId="wrapper_history">
          {last5.map((result, i) => (
            <motion.div
              key={i}
              className={styles.historyItem}
              data-testId={`item_outcome_result_${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {outcomeIconMap[result]}
            </motion.div>
          ))}
        </div>
      </div>
      <p className={styles.gameScoreText} data-testId="text_game_score">
        {playerSets} - {computerSets}
      </p>
    </motion.aside>
  );
};

export default ScoreTracker;
