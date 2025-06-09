import { render, screen } from '@testing-library/react';
import SetOutcomeMessage from './SetOutcomeMessage';
import { Result, type SetOutcome } from '@rpsls-game/shared';

describe('SetOutcomeMessage', () => {
  const baseSetOutcome: SetOutcome = {
    result: Result.Win,
    set: 2,
    playerSets: 3,
    computerSets: 1,
  };

  it('renders', () => {
    render(<SetOutcomeMessage setOutcome={baseSetOutcome} />);
    expect(screen.getByTestId('section_set_outcome')).toBeInTheDocument();
  });

  it('displays the correct winner for Result.Win', () => {
    render(<SetOutcomeMessage setOutcome={{ ...baseSetOutcome, result: Result.Win }} />);
    expect(screen.getByTestId('text_set_winner')).toHaveTextContent('Player has won Set 2');
  });

  it('displays the correct winner for Result.Lose', () => {
    render(<SetOutcomeMessage setOutcome={{ ...baseSetOutcome, result: Result.Lose }} />);
    expect(screen.getByTestId('text_set_winner')).toHaveTextContent('Computer has won Set 2');
  });

  it('displays the correct set score', () => {
    render(<SetOutcomeMessage setOutcome={baseSetOutcome} />);
    expect(screen.getByTestId('text_set_score')).toHaveTextContent('3 - 1');
  });

  it('applies the correct class for player win', () => {
    render(<SetOutcomeMessage setOutcome={{ ...baseSetOutcome, result: Result.Win }} />);
    const winnerSpan = screen.getByTestId('text_set_winner').querySelector('span');
    expect(winnerSpan?.className).toMatch(/playerText/);
  });

  it('applies the correct class for computer win', () => {
    render(<SetOutcomeMessage setOutcome={{ ...baseSetOutcome, result: Result.Lose }} />);
    const winnerSpan = screen.getByTestId('text_set_winner').querySelector('span');
    expect(winnerSpan?.className).toMatch(/computerText/);
  });
});
