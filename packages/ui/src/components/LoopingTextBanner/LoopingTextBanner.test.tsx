import { render, screen } from '@testing-library/react';
import LoopingTextBanner from './LoopingTextBanner';

describe('LoopingTextBanner', () => {
  it('renders top banner', () => {
    render(<LoopingTextBanner position="top" />);
    const section = screen.getByTestId('section_looping_text_banner_top');
    expect(section.className).toMatch(/top/);
  });

  it('renders bottom banner', () => {
    render(<LoopingTextBanner position="bottom" />);
    const section = screen.getByTestId('section_looping_text_banner_bottom');
    expect(section.className).toMatch(/bottom/);
  });

  it('renders 6 Typography components with correct text', () => {
    render(<LoopingTextBanner position="top" />);
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
