import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreTracker from './ScoreTracker';
import { Result } from '@rpsls-game/shared';

describe('ScoreTracker', () => {
  const baseProps = {
    setNumber: 1,
    playerSets: 2,
    computerSets: 3,
  };

  it('renders set number correctly', () => {
    render(<ScoreTracker {...baseProps} results={[]} isDisabled />);
    expect(screen.getByTestId('text_set_number').textContent).toContain('set 2');
  });

  it('shows correct victory count', () => {
    const results = [Result.Win, Result.Lose, Result.Win, Result.Tie];
    render(<ScoreTracker {...baseProps} results={results} isDisabled />);
    expect(screen.getByTestId('text_hands_won').textContent).toContain('2');
  });

  it('displays results in reverse order', () => {
    const results = [Result.Lose, Result.Win, Result.Tie, Result.Win, Result.Lose];
    render(<ScoreTracker {...baseProps} results={results} isDisabled />);
    const historyItems = screen.getAllByTestId(/item_outcome_result_/);
    expect(historyItems).toHaveLength(5);

    const expected = results.reverse().map(
      (r) =>
        ({
          [Result.Win]: '✅',
          [Result.Lose]: '❌',
          [Result.Tie]: '🤝',
        })[r],
    );
    historyItems.forEach((item, i) => {
      expect(item.textContent).toBe(expected[i]);
    });
  });

  it('renders correct game score', () => {
    render(<ScoreTracker {...baseProps} results={[]} isDisabled={false} />);
    expect(screen.getByTestId('text_game_score').textContent).toBe('2 - 3');
  });

  it('renders no history items if results is empty', () => {
    render(<ScoreTracker {...baseProps} results={[]} isDisabled />);
    expect(screen.queryAllByTestId(/item_outcome_result_/)).toHaveLength(0);
  });

  it('renders correct icons for all result types', () => {
    const results = [Result.Win, Result.Lose, Result.Tie];
    render(<ScoreTracker {...baseProps} results={results} isDisabled />);
    const icons = screen.getAllByTestId(/item_outcome_result_/).map((item) => item.textContent);
    expect(icons).toContain('✅');
    expect(icons).toContain('❌');
    expect(icons).toContain('🤝');
  });
});
