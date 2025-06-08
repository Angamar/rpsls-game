import { useCallback, useEffect, useState } from 'react';
import { Choice, Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './Game.module.css';
import PointsTracker from '../../components/PointsTracker';
import PlayerHand from '../../components/Hand/PlayerHand';
import ComputerHand from '../../components/Hand/ComputerHand';
import RoundOutcomeMessage from '../../components/RoundOutcomeMessage';
import DuelingField from '../../components/DuelingField';

import { delay } from '../../utils/delay';

const fetchCardChoices = async (): Promise<ChoiceItem[]> => {
  const response = await fetch('/api/choices');
  if (!response.ok) {
    throw new Error('Failed to fetch card choices');
  }
  return (await response.json()) as ChoiceItem[];
};

const fetchRoundOutcome = async (
  selectedCardId: ChoiceItem['id'] | null,
  availableComputerChoices: ChoiceItem[],
) => {
  const body = JSON.stringify({
    player: selectedCardId,
    availableComputerChoices: availableComputerChoices.map((choice) => choice.id),
  });
  const response = await fetch('/api/play', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch round outcome');
  }
  const roundOutcome = (await response.json()) as RoundOutcome;
  // setResults((prevResults) => [roundOutcome.result, ...prevResults]);
  return roundOutcome;
};

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  console.log(results);
  const [selectedCardId, setSelectedCardId] = useState<ChoiceItem['id'] | null>();
  const [playedCardId, setPlayedCardId] = useState<ChoiceItem['id'] | null>(null);
  const [cardsInPlayerHand, setCardsInPlayerHand] = useState<ChoiceItem[]>([]);
  const [cardsInComputerHand, setCardsInComputerHand] = useState<ChoiceItem[]>([]);
  const [isDuelComplete, setIsDuelComplete] = useState(false);
  const [isResultsBarVisible, setIsResultsBarVisible] = useState(false);
  const { data: cardChoices } = useQuery<ChoiceItem[]>({
    queryKey: ['cardChoices'],
    queryFn: fetchCardChoices,
  });
  const { data: roundOutcome, refetch: playCard } = useQuery<RoundOutcome | null>({
    queryKey: ['roundOutcome'],
    queryFn: () => fetchRoundOutcome(selectedCardId ?? null, cardsInComputerHand),
    enabled: false,
  });

  const queryClient = useQueryClient();

  const startNewRound = useCallback(() => {
    setIsDuelComplete(false);
    setPlayedCardId(null);
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
    setCardsInPlayerHand((prevCards) => prevCards.filter((card) => card.id !== cardId));

    setSelectedCardId(null);
    if (selectedCardId !== null) {
      void playCard().then((outcome) => {
        console.log('Round outcome:', outcome);
        const filteredComputerCards = cardsInComputerHand.filter(
          (card) => card.id !== outcome.data?.computer,
        );
        setCardsInComputerHand(filteredComputerCards);
        console.log('Computer cards after filtering:', filteredComputerCards);
      });
    }
    setSelectedCardId(null);
    // setPlayedCardId(null);
  };

  useEffect(() => {
    if (roundOutcome) {
      delay(2, () => {
        if (!isResultsBarVisible) setIsResultsBarVisible(true);
        setIsDuelComplete(true);
      });
    }

    if (isDuelComplete) {
      delay(2, () => {
        startNewRound();
      });
    }
  }, [roundOutcome, isDuelComplete, startNewRound, isResultsBarVisible]);

  useEffect(() => {
    if (cardChoices) {
      console.log('Card choices fetched:', cardChoices);
      setCardsInPlayerHand(cardChoices);
      setCardsInComputerHand(cardChoices);
    }
  }, [cardChoices]);

  useEffect(() => {
    if (roundOutcome) {
      delay(3, () => {
        setResults((prevResults) => [roundOutcome.result, ...prevResults]);
      });
    }
  }, [roundOutcome]);

  return (
    <section className={styles.gameSection}>
      {isResultsBarVisible && <PointsTracker results={results} />}
      <div className={styles.gameContainer}>
        <ComputerHand
          isDueling={!!playedCardId}
          cardChoices={cardsInComputerHand ?? []}
          onCardSelect={handleCardSelect}
          // onCardPlay={handleCardPlay}
        />

        {isDuelComplete && <RoundOutcomeMessage roundOutcome={roundOutcome ?? null} />}
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
          cardChoices={cardsInPlayerHand ?? []}
          onCardSelect={handleCardSelect}
          onCardPlay={handleCardPlay}
          selectedCardId={selectedCardId}
          playedCardId={playedCardId}
        />
      </div>
    </section>
  );
};

export default Game;
