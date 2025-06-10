import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PlayButton from './PlayButton';
import { ButtonVariant } from '../../types';

describe('PlayButton', () => {
  it('renders with default props', () => {
    render(<PlayButton />);
    const button = screen.getByTestId('button_play');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Play');
  });

  it('renders children as button label', () => {
    render(<PlayButton>Start</PlayButton>);
    const label = screen.getByTestId('label_button');
    expect(label).toHaveTextContent('Start');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<PlayButton onClick={handleClick} />);
    const button = screen.getByTestId('button_play');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hero variant styles and props', () => {
    render(<PlayButton variant={ButtonVariant.Hero}>Hero</PlayButton>);
    const button = screen.getByTestId('button_game_start');
    expect(button.className).toMatch(/hero/);
    const label = screen.getByTestId('label_button');
    expect(label).toHaveTextContent('Hero');
  });

  it('applies regular variant styles and props', () => {
    render(<PlayButton variant={ButtonVariant.Regular}>Regular</PlayButton>);
    const button = screen.getByTestId('button_play');
    expect(button.className).toMatch(/playButton/);
    const label = screen.getByTestId('label_button');
    expect(label).toHaveTextContent('Regular');
  });

  it('applies custom className', () => {
    render(<PlayButton className="custom-class" />);
    const button = screen.getByTestId('button_play');
    expect(button.className).toMatch(/custom-class/);
  });
});
