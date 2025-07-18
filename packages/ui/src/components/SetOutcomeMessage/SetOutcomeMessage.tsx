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
    <section className={styles.setOutcomeSection} data-testid="section_set_outcome">
      <Typography
        variant={setResultMessageVariantMap[setOutcome.result]}
        as="h1"
        dataTestId="text_set_outcome"
      >
        {setResultsMessageMap[setOutcome?.result]}
      </Typography>

      <div className={styles.setScoreContainer}>
        <Typography variant="setResultHero" as="h2" dataTestId="text_set_score">
          {`${setOutcome.playerSets} - ${setOutcome.computerSets}`}
        </Typography>
      </div>
      <Typography variant="h2" as="h2" dataTestId="text_set_winner">
        <span
          className={clsx(
            setOutcome.result === Result.Win ? styles.playerText : styles.computerText,
          )}
        >
          {winner}
        </span>{' '}
        has won Set {setOutcome.set}
      </Typography>
    </section>
  );
}
