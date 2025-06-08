import { type RoundOutcome } from '@rpsls-game/shared';
import styles from './RoundOutcomeMessage.module.css';
import Typography from '../Typography';
import { resultMessageMap, resultMessageVariantMap } from './RoundOutcomeMessage.helpers';

type RoundOutcomeMessageProps = {
  roundOutcome: RoundOutcome | null;
};

export default function RoundOutcomeMessage({ roundOutcome }: RoundOutcomeMessageProps) {
  return (
    <section className={styles.outcomeSection}>
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
