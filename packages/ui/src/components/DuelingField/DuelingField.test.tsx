import { render, screen } from '@testing-library/react';
import DuelingField from './DuelingField';
import type { ChoiceItem } from '@rpsls-game/shared';
import { vi } from 'vitest';

vi.mock('../Hand/Card', () => ({
  default: ({ card }: { card: ChoiceItem }) => (
    <div data-testid={`mock_card_${card.name}`}>{card.name}</div>
  ),
}));

const mockPlayerCard: ChoiceItem = { id: 1, name: 'rock', icon: '🪨' };
const mockComputerCard: ChoiceItem = { id: 3, name: 'scissors', icon: '✂️' };

describe('DuelingField', () => {
  it('renders nothing except section when no cards are provided', () => {
    render(<DuelingField playerCard={null} computerCard={null} />);
    expect(screen.queryByTestId('card_player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card_computer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text_vs')).not.toBeInTheDocument();
  });

  it('renders both cards and vs text when both cards are provided', () => {
    render(<DuelingField playerCard={mockPlayerCard} computerCard={mockComputerCard} />);
    expect(screen.getByTestId('card_player')).toBeInTheDocument();
    expect(screen.getByTestId('mock_card_rock')).toBeInTheDocument();
    expect(screen.getByTestId('card_computer')).toBeInTheDocument();
    expect(screen.getByTestId('mock_card_scissors')).toBeInTheDocument();
    expect(screen.getByTestId('text_vs')).toBeInTheDocument();
    expect(screen.getByTestId('text_vs')).toHaveTextContent('vs');
  });

  it('does not render vs text when only one card is provided', () => {
    render(<DuelingField playerCard={mockPlayerCard} computerCard={null} />);
    expect(screen.queryByTestId('card_player')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text_vs')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card_computer')).not.toBeInTheDocument();
  });
});
