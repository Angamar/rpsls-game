import { useState } from 'react';
import { Choice, Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './Game.module.css';
// import PlayHistory from '../../components/PlayHistory/PlayHistory';
import PlayerHand from '../../components/Hand/PlayerHand';
import ComputerHand from '../../components/Hand/ComputerHand';
import Outcome from '../../components/Outcome';

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  console.log(results);
  const [cardSelected, setCardSelected] = useState<number | null>();
  const [cardPlayed, setCardPlayed] = useState<number | null>(null);
  const [cardsInHand, setCardsInHand] = useState<ChoiceItem[]>([]);
  const { data: choicesData } = useQuery<ChoiceItem[]>({
    queryKey: ['choices'],
    queryFn: async () => {
      const response = await fetch('/api/choices');
      if (!response.ok) {
        throw new Error('Failed to fetch choices');
      }
      const cards = (await response.json()) as ChoiceItem[];
      setCardsInHand(cards);
      return cards;
    },
  });

  const { data: roundOutcome } = useQuery<RoundOutcome | null>({
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
    setCardSelected(choiceId);
    console.log('Card selected:', choiceId);
  };

  const handleCardPlay = (cardId: Choice) => {
    setCardPlayed(cardId);
    // setCardsInHand((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setCardSelected(null);
    // if (cardSelected !== null) {
    //   void playCard();
    // }
    // setCardSelected(null);
  };

  return (
    <section className={styles.gameContainer}>
      <ComputerHand
        isDueling={!!cardPlayed}
        choices={choicesData ?? []}
        onCardSelect={handleCardSelect}
        // onCardPlay={handleCardPlay}
      />

      <Outcome roundOutcome={roundOutcome ?? null} />
      <PlayerHand
        choices={cardsInHand ?? []}
        onCardSelect={handleCardSelect}
        onCardPlay={handleCardPlay}
        selectedCardId={cardSelected}
        playedCardId={cardPlayed}
      />

      {/* <PlayHistory results={results} /> */}
    </section>
  );
};

export default Game;
