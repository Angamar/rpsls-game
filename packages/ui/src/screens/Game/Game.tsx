import { useState } from 'react';
import axios from 'axios';
import { Result, type ChoiceItem, type RoundOutcome } from '@rpsls-game/shared';
import ChoiceButton from '../../components/ChoiceButton';
import Typography from '../../components/Typography';
import { useQuery } from '@tanstack/react-query';

const Game = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [roundOutcome, setRoundOutcome] = useState<RoundOutcome | null>(null);
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

  const handleChoiceClick = async (choiceId: number) => {
    const response = await axios.post<RoundOutcome>('api/play', {
      player: choiceId,
    });
    setResults((prevResults) => [...prevResults, response.data.result]);
    setRoundOutcome(response.data);
  };

  return (
    <div>
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

      <div className="cardsContainer">
        {choicesData &&
          choicesData.length > 0 &&
          choicesData.map((choice: ChoiceItem) => (
            <ChoiceButton
              key={choice.id}
              label={choice.name}
              suit={choice.icon}
              onClick={() => {
                void handleChoiceClick(choice.id);
              }}
            />
          ))}
      </div>

      <p>Last 10 results:</p>
      {results.length > 0 && (
        <div className="resultsContainer">
          {results.slice(-10).map((result, index) => (
            <div
              key={index}
              className={'resultItem'}
              style={{
                background: result === Result.Win ? 'green' : Result.Lose ? 'red' : 'black',
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
