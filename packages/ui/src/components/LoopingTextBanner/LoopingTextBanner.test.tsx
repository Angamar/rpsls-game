import { render, screen } from '@testing-library/react';
import LoopingTextBanner from './LoopingTextBanner';

describe('LoopingTextBanner', () => {
  it('renders the section with correct test id', () => {
    render(<LoopingTextBanner />);
    expect(screen.getByTestId('section_looping_text_banner')).toBeInTheDocument();
  });

  it('applies the top class when position is "top"', () => {
    const { container } = render(<LoopingTextBanner position="top" />);
    const section = container.querySelector('[data-testid="section_looping_text_banner"]');
    expect(section?.className).toMatch(/top/);
  });

  it('applies the bottom class when position is "bottom"', () => {
    const { container } = render(<LoopingTextBanner position="bottom" />);
    const section = container.querySelector('[data-testid="section_looping_text_banner"]');
    expect(section?.className).toMatch(/bottom/);
  });

  it('renders 6 Typography components with correct text', () => {
    render(<LoopingTextBanner />);
    const typographyElements = screen.getAllByTestId('text_banner_sentence');
    expect(typographyElements).toHaveLength(6);
    expect(typographyElements[0]).toHaveTextContent('scissors');
    expect(typographyElements[1]).toHaveTextContent('cuts');
    expect(typographyElements[2]).toHaveTextContent('paper');
    expect(typographyElements[3]).toHaveTextContent('covers');
    expect(typographyElements[4]).toHaveTextContent('rock');
    expect(typographyElements[5]).toHaveTextContent('crushes');
  });
});
