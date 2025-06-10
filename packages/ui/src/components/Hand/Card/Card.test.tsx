import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders the card front when isFaceDown is false', () => {
    render(<Card isFaceDown={false} cardFaceSrc="/face.png" />);
    expect(screen.getByTestId('card_frontr')).toBeInTheDocument();
    expect(screen.getByAltText('Card front')).toHaveAttribute('src', '/face.png');
    expect(screen.queryByTestId('card_back')).not.toBeInTheDocument();
  });

  it('renders the card back when isFaceDown is true', () => {
    render(<Card isFaceDown={true} cardFaceSrc="/face.png" />);
    expect(screen.getByTestId('card_back')).toBeInTheDocument();
    expect(screen.getByAltText('Card back')).toHaveAttribute('src', '/card-back.png');
    expect(screen.queryByTestId('card_frontr')).not.toBeInTheDocument();
  });

  it('renders the card front by default when isFaceDown is not provided', () => {
    render(<Card cardFaceSrc="/face.png" />);
    expect(screen.getByTestId('card_frontr')).toBeInTheDocument();
    expect(screen.getByAltText('Card front')).toHaveAttribute('src', '/face.png');
  });
});
