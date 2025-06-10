import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Choice,
  Result,
  GameState,
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
  const [gameState, setGameState] = useState<GameState>(GameState.Selecting);
  const [roundResults, setRoundResults] = useState<Result[]>([]);
  const [setResult, setSetResult] = useState<SetOutcome>({
    result: Result.Tie,
    set: 0,
    playerSets: 0,
    computerSets: 0,
  });
  const [selectedCardId, setSelectedCardId] = useState<ChoiceItem['id'] | null>(null);
  const [playedCardId, setPlayedCardId] = useState<ChoiceItem['id'] | null>(null);
  const [playerHand, setPlayerHand] = useState<ChoiceItem[]>([]);
  const [computerHand, setComputerHand] = useState<ChoiceItem[]>([]);

  const { data: cardChoices } = useQuery<ChoiceItem[]>({
    queryKey: ['cardChoices'],
    queryFn: fetchCardChoices,
  });

  const {
    data: roundOutcome,
    mutateAsync: playCard,
    reset: resetRoundOutcome,
  } = useMutation({
    mutationFn: getRoundOutcome,
    onSuccess: (outcome) => {
      // Remove the computer's played card
      setComputerHand((prevCards) => prevCards.filter((card) => card.id !== outcome.computer));
    },
    onError: (error) => {
      console.error('Failed to play card:', error);
      setGameState(GameState.Selecting);
    },
  });

  // Derived states
  const isDueling = gameState === GameState.Dueling;
  const isDuelComplete = gameState === GameState.RoundComplete;
  const isSetComplete = gameState === GameState.SetComplete;

  // Game flow functions
  const startNewRound = useCallback(() => {
    setGameState(GameState.Selecting);
    setSelectedCardId(null);
    setPlayedCardId(null);
    resetRoundOutcome();
  }, [resetRoundOutcome]);

  const finishSet = useCallback(() => {
    const result = calculateSetWinner(roundResults);
    setSetResult((prev) => ({
      result,
      set: prev.set + 1,
      playerSets: prev.playerSets + (result === Result.Win ? 1 : 0),
      computerSets: prev.computerSets + (result === Result.Lose ? 1 : 0),
    }));
    setGameState(GameState.SetComplete);
    setRoundResults([]);
  }, [roundResults]);

  const startNewSet = useCallback(() => {
    setGameState(GameState.Selecting);
    setSelectedCardId(null);
    setPlayedCardId(null);
    setRoundResults([]);
    if (cardChoices) {
      setPlayerHand(cardChoices);
      setComputerHand(cardChoices);
    }
    resetRoundOutcome();
  }, [cardChoices, resetRoundOutcome]);

  // Event handlers
  const handleCardSelect = useCallback(
    (choiceId: number) => {
      if (gameState !== GameState.Selecting) return;
      setSelectedCardId(choiceId);
    },
    [gameState],
  );

  const handleCardPlay = useCallback(
    (cardId: Choice) => {
      if (gameState !== GameState.Selecting) return;

      setGameState(GameState.Dueling);
      setSelectedCardId(null);
      setPlayedCardId(cardId);
      setPlayerHand((prevCards) => prevCards.filter((card) => card.id !== cardId));

      void playCard({
        playedCardId: cardId,
        availableComputerChoices: computerHand,
      });
    },
    [gameState, computerHand, playCard],
  );

  // Dueling field props
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
      result: roundOutcome?.result,
    }),
    [playedCardId, cardChoices, roundOutcome],
  );

  // Game state effects
  useEffect(() => {
    if (gameState === GameState.Dueling && roundOutcome) {
      const timer = setTimeout(() => {
        // Add result and move to round complete
        setRoundResults((prev) => [roundOutcome.result, ...prev]);
        setGameState(GameState.RoundComplete);
      }, 2000); // Wait for duel animation

      return () => clearTimeout(timer);
    }
  }, [gameState, roundOutcome]);

  useEffect(() => {
    if (gameState === GameState.RoundComplete) {
      const timer = setTimeout(() => {
        if (playerHand.length === 0) {
          finishSet();
        } else {
          startNewRound();
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [gameState, roundResults.length, playerHand.length, finishSet, startNewRound]);

  // Initialize game
  useEffect(() => {
    if (cardChoices && playerHand.length === 0 && gameState === GameState.Selecting) {
      setPlayerHand(cardChoices);
      setComputerHand(cardChoices);
    }
  }, [cardChoices, playerHand.length, gameState]);

  return (
    <section className={styles.gameSection} data-testid="section_game">
      <ScoreTracker
        results={roundResults}
        setNumber={setResult.set}
        playerSets={setResult.playerSets}
        computerSets={setResult.computerSets}
      />

      <div className={styles.gameContainer}>
        <ComputerHand
          isDueling={isDueling}
          cardChoices={computerHand}
          isDisabled={gameState !== GameState.Selecting}
        />

        {isDuelComplete && roundOutcome && <RoundOutcomeMessage roundOutcome={roundOutcome} />}

        {isSetComplete && (
          <Modal modalContentStyle={styles.setOutcomeModal}>
            <SetOutcomeMessage setOutcome={setResult} />
            <PlayButton className={styles.nextSetButton} onClick={startNewSet}>
              play set {setResult.set + 1}
            </PlayButton>
          </Modal>
        )}

        <DuelingField {...duelingFieldProps} />

        <PlayerHand
          cardChoices={playerHand}
          onCardSelect={handleCardSelect}
          onCardPlay={handleCardPlay}
          selectedCardId={selectedCardId}
          isDueling={isDueling}
          isDisabled={gameState !== GameState.Selecting}
        />
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div
          data-cy="debug-panel"
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
          }}
        >
          <div>State: {gameState}</div>
          <div>Rounds: {roundResults.length}/5</div>
          <div>Player Cards: {playerHand.length}</div>
          <div>Computer Cards: {computerHand.length}</div>
        </div>
      )}
    </section>
  );
};

export default Game;
