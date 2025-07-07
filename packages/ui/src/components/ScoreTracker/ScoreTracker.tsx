import { motion, AnimatePresence } from 'framer-motion';
import styles from './ScoreTracker.module.css';
import { Result } from '@rpsls-game/shared';
import Typography from '../Typography';
import {
  asideVariants,
  asideTransition,
  victoryCountVariants,
  victoryCountTransition,
  historyItemVariants,
  historyItemTransition,
  historyItemHover,
  getHistoryItemKey,
  calculateDynamicHeight,
} from './ScoreTracker.motion';
import { ANIMATION_DURATIONS } from '../../constants/animationDurations';

interface ScoreTrackerProps {
  results: Result[];
  setNumber: number;
  playerSets: number;
  computerSets: number;
  isDisabled: boolean;
}

const outcomeIconMap = {
  [Result.Win]: '✅',
  [Result.Lose]: '❌',
  [Result.Tie]: '🤝',
};

const ScoreTracker = ({
  results,
  setNumber,
  playerSets,
  computerSets,
  isDisabled,
}: ScoreTrackerProps) => {
  const displayResults = [...results].reverse();
  const victories = results.filter((result) => result === Result.Win).length;

  const baseHeight = 140;
  const finalHeight = calculateDynamicHeight(displayResults.length, baseHeight);

  return (
    <>
      <motion.aside
        className={styles.scoreTrackerAside}
        data-testid="aside_score_tracker"
        initial="initial"
        animate="animate"
        custom={baseHeight}
        variants={{
          initial: asideVariants.initial,
          animate: () => asideVariants.animate(finalHeight),
        }}
        transition={asideTransition}
        layout
      >
        <motion.div layout>
          <Typography variant="bold" as="div" className={styles.set} data-testid="text_set_number">
            set {setNumber + 1}
          </Typography>

          <motion.div
            className={styles.victoryCount}
            data-testid="text_hands_won"
            key={victories}
            variants={victoryCountVariants}
            initial="initial"
            animate="animate"
            transition={victoryCountTransition}
            layout
          >
            🏆 {victories}
          </motion.div>

          <motion.div className={styles.historyList} data-testid="wrapper_history" layout>
            <AnimatePresence mode="popLayout">
              {displayResults.map((result, i) => {
                const originalIndex = results.length - i;
                const resultKey = getHistoryItemKey(originalIndex);

                return (
                  <motion.div
                    key={resultKey}
                    className={styles.historyItem}
                    data-testid={`item_outcome_result_${i + 1}`}
                    variants={historyItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={historyItemTransition}
                    layout
                    whileHover={historyItemHover}
                  >
                    {outcomeIconMap[result]}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.aside>

      <AnimatePresence>
        {!isDisabled && (
          <motion.div
            className={styles.centerScoreOverlay}
            data-testid="text_game_score"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ANIMATION_DURATIONS.CENTER_SCORE_OVERLAY,
              ease: 'easeInOut',
            }}
          >
            {playerSets} - {computerSets}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScoreTracker;
