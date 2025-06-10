import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Choice,
  Result,
  type ChoiceItem,
  type RoundOutcome,
  type SetOutcome,
} from '@rpsls-game/shared';
import { useQuery, useMutation } from '@tanstack/react-query';

import styles from './Game.module.css';

import PlayerHand from '../../components/Hand/PlayerHand';
import ComputerHand from '../../components/Hand/ComputerHand';
import RoundOutcomeMessage from '../../components/RoundOutcomeMessage';
import DuelingField from '../../components/DuelingField';
import ScoreTracker from '../../components/ScoreTracker';

import { delay } from '../../utils/delay';
import SetOutcomeMessage from '../../components/SetOutcomeMessage';
import { calculateSetWinner } from './Game.helpers';
import Modal from '../../components/Modal';
import PlayButton from '../../components/PlayButton';

const fetchCardChoices = async (): Promise<ChoiceItem[]> => {
  const response = await fetch('/api/choices');
  if (!response.ok) {
    throw new Error('Failed to fetch card choices');
  }
  return (await response.json()) as ChoiceItem[];
};

const getRoundOutcome = async ({
  playedCardId,
  availableComputerChoices,
}: {
  playedCardId: ChoiceItem['id'] | null;
  availableComputerChoices: ChoiceItem[];
}) => {
  const body = JSON.stringify({
    player: playedCardId,
    availableComputerChoices: availableComputerChoices.map((choice) => choice.id),
  });

  const response = await fetch('/api/play', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch round outcome');
  }

  return (await response.json()) as RoundOutcome;
};

const Game = () => {
  const [roundResults, setRoundResults] = useState<Result[]>([]);
  const [setResult, setSetResult] = useState<SetOutcome>({
    result: Result.Tie,
    set: 0,
    playerSets: 0,
    computerSets: 0,
  });
  const [selectedCardId, setSelectedCardId] = useState<ChoiceItem['id'] | null>();
  const [playedCardId, setPlayedCardId] = useState<ChoiceItem['id'] | null>(null);
  const [playerHand, setPlayerHand] = useState<ChoiceItem[]>([]);
  const [computerHand, setComputerHand] = useState<ChoiceItem[]>([]);
  const [isDuelComplete, setIsDuelComplete] = useState(false);
  const [isSetComplete, setIsSetComplete] = useState(false);

  const { data: cardChoices } = useQuery<ChoiceItem[]>({
    queryKey: ['cardChoices'],
    queryFn: fetchCardChoices,
  });
  const {
    data: roundOutcome,
    mutateAsync: playCard,
    reset: resetRoundOutcome,
  } = useMutation({
    mutationFn: ({
      playedCardId,
      availableComputerChoices,
    }: {
      playedCardId: ChoiceItem['id'] | null;
      availableComputerChoices: ChoiceItem[];
    }) => getRoundOutcome({ playedCardId, availableComputerChoices }),
    onSuccess: (outcome) => {
      const filteredComputerCards = computerHand.filter((card) => card.id !== outcome.computer);
      setComputerHand(filteredComputerCards);
    },
    onError: (error) => {
      console.error('Failed to play card:', error);
    },
  });

  const startNewRound = useCallback(() => {
    setIsDuelComplete(false);
    setSelectedCardId(null);
    setPlayedCardId(null);
    resetRoundOutcome();
  }, [resetRoundOutcome]);

  const finishSet = useCallback(() => {
    setIsSetComplete(true);
    setIsDuelComplete(false);
    setRoundResults([]);
    const result = calculateSetWinner(roundResults);
    setSetResult((prev) => ({
      result: result,
      set: prev.set + 1,
      playerSets: prev.playerSets + (result === Result.Win ? 1 : 0),
      computerSets: prev.computerSets + (result === Result.Lose ? 1 : 0),
    }));
  }, [roundResults]);

  const startNewSet = useCallback(() => {
    startNewRound();
    setIsSetComplete(false);
    setRoundResults([]);
    setPlayerHand(cardChoices ?? []);
    setComputerHand(cardChoices ?? []);
  }, [cardChoices, startNewRound]);

  const handleCardSelect = (choiceId: number) => {
    setSelectedCardId(choiceId);
  };

  const handleCardPlay = (cardId: Choice) => {
    setSelectedCardId(null);
    setPlayedCardId(cardId);
    setPlayerHand((prevCards) => prevCards.filter((card) => card.id !== cardId));

    if (selectedCardId !== null) {
      void playCard({
        playedCardId: cardId,
        availableComputerChoices: computerHand,
      });
    }
  };

  const duelingFieldProps = useMemo(
    () => ({
      playerCard:
        playedCardId && cardChoices
          ? (cardChoices.find((choice) => choice.id === playedCardId)?.name ?? null)
          : null,
      computerCard:
        playedCardId && cardChoices && roundOutcome
          ? (cardChoices.find((choice) => choice.id === roundOutcome.computer)?.name ?? null)
          : null,
    }),
    [playedCardId, cardChoices, roundOutcome],
  );

  // Handle the round outcome and update the game state
  useEffect(() => {
    if (roundOutcome && !isDuelComplete) {
      delay(2, () => {
        setIsDuelComplete(true);
      });
    }

    if (isDuelComplete) {
      if (roundResults.length < 5) {
        delay(1, () => {
          startNewRound();
        });
      } else {
        delay(2, () => {
          finishSet();
        });
      }
    }
  }, [roundOutcome, isDuelComplete, startNewRound, roundResults.length, finishSet]);

  useEffect(() => {
    if (cardChoices) {
      setPlayerHand(cardChoices);
      setComputerHand(cardChoices);
    }
  }, [cardChoices]);

  useEffect(() => {
    if (roundOutcome) {
      delay(3, () => {
        setRoundResults((prevResults) => [roundOutcome.result, ...prevResults]);
      });
    }
  }, [roundOutcome]);

  return (
    <section className={styles.gameSection}>
      <ScoreTracker
        results={roundResults}
        setNumber={setResult.set}
        playerSets={setResult.playerSets}
        computerSets={setResult.computerSets}
      />

      <div className={styles.gameContainer}>
        <ComputerHand isDueling={!!playedCardId} cardChoices={computerHand ?? []} />

        {isDuelComplete && roundOutcome && <RoundOutcomeMessage roundOutcome={roundOutcome} />}

        {isSetComplete && setResult && (
          <Modal modalContentStyle={styles.setOutcomeModal}>
            <SetOutcomeMessage setOutcome={setResult} />
            <PlayButton className={styles.nextSetButton} onClick={startNewSet}>
              play set {setResult.set + 1}
            </PlayButton>
          </Modal>
        )}

        <DuelingField {...duelingFieldProps} />

        <PlayerHand
          cardChoices={playerHand ?? []}
          onCardSelect={handleCardSelect}
          onCardPlay={handleCardPlay}
          selectedCardId={selectedCardId}
          isDueling={!!playedCardId}
        />
      </div>
    </section>
  );
};

export default Game;
