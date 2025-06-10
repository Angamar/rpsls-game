import { render, screen } from '@testing-library/react';
import ComputerHand from './ComputerHand';
import type { ChoiceItem } from '@rpsls-game/shared';

const mockChoices: ChoiceItem[] = [
  { id: 1, name: 'Rock', icon: '🪨' },
  { id: 2, name: 'Paper', icon: '📄' },
  { id: 3, name: 'Scissors', icon: '✂️' },
];

describe('ComputerHand', () => {
  it('renders the computer hand section', () => {
    render(<ComputerHand cardChoices={mockChoices} isDueling={false} isDisabled={false} />);
    expect(screen.getByTestId('section_computer_hand')).toBeInTheDocument();
    expect(screen.getByTestId('wrapper_computer_hand')).toBeInTheDocument();
  });

  it('renders the correct number of card buttons', () => {
    render(<ComputerHand cardChoices={mockChoices} isDueling={false} isDisabled={false} />);
    const buttons = screen.getAllByTestId('button_card_computer');
    expect(buttons).toHaveLength(mockChoices.length);
  });

  it('renders no cards if cardChoices is empty', () => {
    render(<ComputerHand cardChoices={[]} isDueling={false} isDisabled={false} />);
    expect(screen.queryAllByTestId('button_card_computer')).toHaveLength(0);
  });
});
