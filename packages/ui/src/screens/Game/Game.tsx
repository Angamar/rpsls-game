import { useCallback, useEffect, useState } from 'react';
import { Choice, Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './Game.module.css';
// import PlayHistory from '../../components/PlayHistory/PlayHistory';
import PlayerHand from '../../components/Hand/PlayerHand';
import ComputerHand from '../../components/Hand/ComputerHand';
import Outcome from '../../components/Outcome';
import DuelingField from '../../components/DuelingField';

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  console.log(results);
  const [selectedCardId, setSelectedCardId] = useState<ChoiceItem['id'] | null>();
  const [playedCardId, setPlayedCardId] = useState<ChoiceItem['id'] | null>(null);
  const [cardsInHand, setCardsInHand] = useState<ChoiceItem[]>([]);
  const [isDuelComplete, setIsDuelComplete] = useState(false);
  const { data: cardChoices } = useQuery<ChoiceItem[]>({
    queryKey: ['cardChoices'],
    queryFn: async () => {
      const response = await fetch('/api/choices');
      if (!response.ok) {
        throw new Error('Failed to fetch card choices');
      }
      const cards = (await response.json()) as ChoiceItem[];
      setCardsInHand(cards);
      return cards;
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
        body: JSON.stringify({ player: selectedCardId }),
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

  const startNewRound = useCallback(() => {
    queryClient.setQueryData(['roundOutcome'], null);
  }, [queryClient]);

  const handleCardSelect = (choiceId: number) => {
    if (roundOutcome) {
      startNewRound();
    }
    setSelectedCardId(choiceId);
    console.log('Card selected:', choiceId);
  };

  const handleCardPlay = (cardId: Choice) => {
    setPlayedCardId(cardId);
    setCardsInHand((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setSelectedCardId(null);
    if (selectedCardId !== null) {
      void playCard();
    }
    setSelectedCardId(null);
    // setPlayedCardId(null);
  };

  useEffect(() => {
    if (roundOutcome) {
      setTimeout(() => {
        setIsDuelComplete(true);
      }, 2000);
    }

    if (isDuelComplete) {
      setTimeout(() => {
        setIsDuelComplete(false);
        setPlayedCardId(null);
        startNewRound();
      }, 2500);
    }
  }, [roundOutcome, isDuelComplete, startNewRound]);

  return (
    <section className={styles.gameContainer}>
      <ComputerHand
        isDueling={!!playedCardId}
        cardChoices={cardChoices ?? []}
        onCardSelect={handleCardSelect}
        // onCardPlay={handleCardPlay}
      />

      {isDuelComplete && <Outcome roundOutcome={roundOutcome ?? null} />}
      <DuelingField
        playerCard={
          playedCardId && cardChoices && roundOutcome
            ? (cardChoices.find((choice) => choice.id === playedCardId) ?? null)
            : null
        }
        computerCard={
          playedCardId && cardChoices
            ? (cardChoices.find((choice) => choice.id === roundOutcome?.computer) ?? null)
            : null
        }
      />
      <PlayerHand
        cardChoices={cardsInHand ?? []}
        onCardSelect={handleCardSelect}
        onCardPlay={handleCardPlay}
        selectedCardId={selectedCardId}
        playedCardId={playedCardId}
      />

      {/* <PlayHistory results={results} /> */}
    </section>
  );
};

export default Game;
