import { type RoundOutcome } from '@rpsls-game/shared';
import styles from './Outcome.module.css';
import Typography from '../Typography';
import { resultMessageMap, resultMessageVariantMap } from './Outcome.helpers';

type OutcomeProps = {
  roundOutcome: RoundOutcome | null;
};

export default function Outcome({ roundOutcome }: OutcomeProps) {
  return (
    <section className={styles.outcomeContainer}>
      {roundOutcome && (
        <div className="roundOutcome">
          <Typography variant={resultMessageVariantMap[roundOutcome.result] ?? 'body'} as="h1">
            {resultMessageMap[roundOutcome.result] ?? 'Uh, oh! Something went wrong.'}
          </Typography>

          {roundOutcome && (
            <Typography variant="h3" as="h3">
              {`${roundOutcome.winnerChoice} ${roundOutcome.verb ?? '&'} ${roundOutcome.loserChoice}!`}
            </Typography>
          )}
        </div>
      )}
    </section>
  );
}
