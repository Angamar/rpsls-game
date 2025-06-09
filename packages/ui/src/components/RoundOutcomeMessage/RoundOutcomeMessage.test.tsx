import { render, screen } from '@testing-library/react';
import RoundOutcomeMessage from './RoundOutcomeMessage';
import { Choice, Result, type RoundOutcome } from '@rpsls-game/shared';
import { resultMessageMap } from './RoundOutcomeMessage.helpers';

describe('RoundOutcomeMessage', () => {
  const victoryOutcome: RoundOutcome = {
    result: Result.Win,
    winnerChoice: 'Rock',
    loserChoice: 'Scissors',
    player: Choice.Rock,
    computer: Choice.Scissors,
    verb: 'crushes',
  };

  it('renders the correct result message for win', () => {
    render(<RoundOutcomeMessage roundOutcome={victoryOutcome} />);
    const outcomeElement = screen.getByTestId('text_round_outcome');
    expect(outcomeElement).toBeInTheDocument();
    expect(outcomeElement).toHaveTextContent(resultMessageMap[Result.Win]);
    expect(outcomeElement.className).toContain('resultHero');
    expect(outcomeElement.className).toContain('win');
  });

  it('renders the correct outcome sentence for win', () => {
    render(<RoundOutcomeMessage roundOutcome={victoryOutcome} />);
    const sentenceElement = screen.getByTestId('text_outcome_sentence');
    expect(sentenceElement).toBeInTheDocument();
    expect(sentenceElement).toHaveTextContent('Rock crushes Scissors!');
  });

  const lossOutcome: RoundOutcome = {
    result: Result.Lose,
    winnerChoice: 'Paper',
    loserChoice: 'Rock',
    player: Choice.Rock,
    computer: Choice.Paper,
    verb: 'covers',
  };

  it('renders the correct result message for loss', () => {
    render(<RoundOutcomeMessage roundOutcome={lossOutcome} />);
    const outcomeElement = screen.getByTestId('text_round_outcome');
    expect(outcomeElement).toBeInTheDocument();
    expect(outcomeElement).toHaveTextContent(resultMessageMap[Result.Lose]);
    expect(outcomeElement.className).toContain('resultHero');
    expect(outcomeElement.className).toContain('lose');
  });

  it('renders the correct outcome sentence for loss', () => {
    render(<RoundOutcomeMessage roundOutcome={lossOutcome} />);
    const sentenceElement = screen.getByTestId('text_outcome_sentence');
    expect(sentenceElement).toBeInTheDocument();
    expect(sentenceElement).toHaveTextContent('Paper covers Rock!');
  });

  const tieOutcome: RoundOutcome = {
    result: Result.Tie,
    winnerChoice: 'Scissors',
    loserChoice: 'Scissors',
    player: Choice.Scissors,
    computer: Choice.Scissors,
    verb: null,
  };

  it('renders the correct result message for tie', () => {
    render(<RoundOutcomeMessage roundOutcome={tieOutcome} />);
    const outcomeElement = screen.getByTestId('text_round_outcome');
    expect(outcomeElement).toBeInTheDocument();
    expect(outcomeElement).toHaveTextContent(resultMessageMap[Result.Tie]);
    expect(outcomeElement.className).toContain('resultHero');
    expect(outcomeElement.className).toContain('tie');
  });

  it('renders the correct outcome sentence for tie', () => {
    render(<RoundOutcomeMessage roundOutcome={tieOutcome} />);
    const sentenceElement = screen.getByTestId('text_outcome_sentence');
    expect(sentenceElement).toBeInTheDocument();
    expect(sentenceElement).toHaveTextContent('Scissors ties with Scissors!');
  });
});
