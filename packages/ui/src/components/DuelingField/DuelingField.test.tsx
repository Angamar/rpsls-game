import { render, screen } from '@testing-library/react';
import DuelingField from './DuelingField';
import type { ChoiceItem } from '@rpsls-game/shared';

const mockPlayerCard: ChoiceItem['name'] = 'rock';
const mockComputerCard: ChoiceItem['name'] = 'scissors';

describe('DuelingField', () => {
  it('renders nothing except section when no cards are provided', () => {
    render(<DuelingField playerCard={null} computerCard={null} />);
    expect(screen.queryByTestId('card_duel_player_rock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card_duel_computer_scissors')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text_vs')).not.toBeInTheDocument();
  });

  it('renders both cards and vs text when both cards are provided', () => {
    render(<DuelingField playerCard={mockPlayerCard} computerCard={mockComputerCard} />);
    expect(screen.getByTestId('card_duel_player_rock')).toBeInTheDocument();
    expect(screen.getByTestId('card_duel_computer_scissors')).toBeInTheDocument();
    expect(screen.getByTestId('text_vs')).toBeInTheDocument();
    expect(screen.getByTestId('text_vs')).toHaveTextContent('vs');
  });

  it('does not render vs text when only one card is provided', () => {
    render(<DuelingField playerCard={mockPlayerCard} computerCard={null} />);
    expect(screen.queryByTestId('card_duel_player_rock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text_vs')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card_duel_computer_scissors')).not.toBeInTheDocument();
  });
});
