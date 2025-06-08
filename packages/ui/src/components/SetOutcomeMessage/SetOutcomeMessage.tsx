import { Result, type SetOutcome } from '@rpsls-game/shared';
import styles from './SetOutcomeMessage.module.css';
import Typography from '../Typography';
import { setResultsMessageMap, setResultMessageVariantMap } from './SetOutcomeMessage.helpers';
import clsx from 'clsx';

type SetOutcomeMessageProps = {
  setOutcome: SetOutcome;
};

export default function SetOutcomeMessage({ setOutcome }: SetOutcomeMessageProps) {
  const winner = setOutcome.result === Result.Win ? 'Player' : 'Computer';
  return (
    <section className={styles.setOutcomeSection}>
      <Typography variant={setResultMessageVariantMap[setOutcome.result] ?? 'body'} as="h1">
        {setResultsMessageMap[setOutcome?.result] ?? 'Uh, oh! Something went wrong.'}
      </Typography>
      <Typography variant="h2" as="h2">
        <span
          className={clsx(
            setOutcome.result === Result.Win ? styles.playerText : styles.computerText,
          )}
        >
          {winner}
        </span>{' '}
        has won Set {setOutcome.set}
      </Typography>
      <div className={styles.setScoreContainer}>
        <Typography variant="setResultHero" as="h2">
          {`${setOutcome.playerSets} - ${setOutcome.computerSets}`}
        </Typography>
      </div>
    </section>
  );
}
