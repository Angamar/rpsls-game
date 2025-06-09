import { render, screen } from '@testing-library/react';
import GameTitle from './GameTitle';

describe('GameTitle', () => {
  it('renders the section with the correct data-testid', () => {
    render(<GameTitle />);
    const section = screen.getByTestId('section_game_title');
    expect(section).toBeInTheDocument();
  });
});
