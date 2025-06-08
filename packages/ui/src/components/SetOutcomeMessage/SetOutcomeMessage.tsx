import { Result, type SetOutcome } from '@rpsls-game/shared';
import styles from './SetOutcomeMessage.module.css';
import Typography from '../Typography';
import { setResultsMessageMap, setResultMessageVariantMap } from './SetOutcomeMessage.helpers';
import PlayButton from '../PlayButton';

type SetOutcomeMessageProps = {
  setOutcome: SetOutcome;
  onNextSetClick?: () => void;
};

export default function SetOutcomeMessage({ setOutcome, onNextSetClick }: SetOutcomeMessageProps) {
  const winner = setOutcome.result === Result.Win ? 'Player' : 'Computer';
  return (
    <section className={styles.setOutcomeSection}>
      {setOutcome && (
        <>
          <Typography variant={setResultMessageVariantMap[setOutcome.result] ?? 'body'} as="h1">
            {setResultsMessageMap[setOutcome?.result] ?? 'Uh, oh! Something went wrong.'}
          </Typography>
          <Typography variant="h3" as="p">
            {winner} has won <span className={styles.setText}>Set {setOutcome.set}</span>
          </Typography>
          <Typography variant="h2" as="h2">
            {`${setOutcome.playerSets} - ${setOutcome.computerSets}!`}
          </Typography>
          <PlayButton className={styles.nextSetButton} onClick={onNextSetClick}>
            Play Set {setOutcome.set + 1}
          </PlayButton>
        </>
      )}
    </section>
  );
}
