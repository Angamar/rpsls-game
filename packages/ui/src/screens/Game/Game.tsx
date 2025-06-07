import { useState } from 'react';
import { Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import Typography from '../../components/Typography';
import { useQuery } from '@tanstack/react-query';

import styles from './Game.module.css';
import PlayHistory from '../../components/PlayHistory/PlayHistory';
import Hand from '../../components/Hand';

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [cardSelected, setCardSelected] = useState<number | null>(null);
  const { data: choicesData } = useQuery<ChoiceItem[]>({
    queryKey: ['choices'],
    queryFn: async () => {
      const response = await fetch('/api/choices');
      if (!response.ok) {
        throw new Error('Failed to fetch choices');
      }

      return response.json() as Promise<ChoiceItem[]>;
    },
  });

  const { data: roundOutcome, refetch: playCard } = useQuery<RoundOutcome | null>({
    queryKey: ['roundOutcome'],
    queryFn: async () => {
      const response = await fetch('/api/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player: cardSelected }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch round outcome');
      }
      const roundOutcome = (await response.json()) as RoundOutcome;
      setResults((prevResults) => [roundOutcome.result, ...prevResults]);
      return roundOutcome;
    },
    enabled: false,
  });

  const handleCardSelect = (choiceId: number) => {
    setCardSelected(choiceId);
    console.log('Card selected:', choiceId);
  };

  const handleCardPlay = () => {
    if (cardSelected !== null) {
      void playCard();
    }
    setCardSelected(null);
  };

  return (
    <section className={styles.gameContainer}>
      <PlayHistory results={results} />

      {roundOutcome && (
        <div className="roundOutcome">
          <Typography variant="h1" as="h1">
            Round Outcome
          </Typography>

          <h2>
            {roundOutcome.result === Result.Win
              ? 'You win!'
              : roundOutcome.result === Result.Lose
                ? 'You lose!'
                : "It's a tie!"}
          </h2>
          {roundOutcome && (
            <span className="win">{`${roundOutcome.winnerChoice} ${roundOutcome.verb ?? '&'} ${roundOutcome.loserChoice}!`}</span>
          )}
        </div>
      )}

      <Hand
        choices={choicesData ?? []}
        onCardSelect={handleCardSelect}
        onCardPlay={handleCardPlay}
        selectedCardId={cardSelected}
      />
    </section>
  );
};

export default Game;
