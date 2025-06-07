import { useState } from 'react';
import { Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './Game.module.css';
import PlayHistory from '../../components/PlayHistory/PlayHistory';
import PlayerHand from '../../components/Hand/PlayerHand';
import ComputerHand from '../../components/Hand/ComputerHand';
import Outcome from '../../components/Outcome';

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [cardSelected, setCardSelected] = useState<string | null>();
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
  const queryClient = useQueryClient();

  const startNewRound = () => {
    queryClient.setQueryData(['roundOutcome'], null);
  };

  const handleCardSelect = (choiceId: number) => {
    if (roundOutcome) {
      startNewRound();
    }
    setCardSelected(`player_card_${choiceId}`);
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
      <ComputerHand
        choices={choicesData ?? []}
        onCardSelect={handleCardSelect}
        onCardPlay={handleCardPlay}
        // selectedCardId={cardSelected}
      />

      <Outcome roundOutcome={roundOutcome ?? null} />
      <PlayerHand
        choices={choicesData ?? []}
        onCardSelect={handleCardSelect}
        onCardPlay={handleCardPlay}
        selectedCardId={cardSelected}
      />

      <PlayHistory results={results} />
    </section>
  );
};

export default Game;
