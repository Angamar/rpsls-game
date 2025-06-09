import { render, screen } from '@testing-library/react';
import Typography from './Typography';

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Test Text</Typography>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders with default variant and element', () => {
    render(<Typography>Default Variant</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('renders with custom element using "as" prop', () => {
    render(<Typography as="h1">Heading Text</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.tagName.toLowerCase()).toBe('h1');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">With Class</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.className).toMatch(/custom-class/);
  });

  it('applies lowercase style', () => {
    render(<Typography>Lowercase Text</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.className).toMatch(/lowercase/);
  });

  it('forwards extra props', () => {
    render(<Typography data-extra="extra-prop">Extra Prop</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element).toHaveAttribute('data-extra', 'extra-prop');
  });

  it('applies body variant correctly', () => {
    render(<Typography variant="body">Body text</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.className).not.toBe('');
    expect(element.className).toMatch(/lowercase/);
    expect(element.className).toMatch(/body/);
  });

  it('applies h1 variant correctly', () => {
    render(<Typography variant="h1">Heading text</Typography>);
    const element = screen.getByTestId('component_typography');
    expect(element.className).not.toBe('');
    expect(element.className).toMatch(/lowercase/);
    expect(element.className).toMatch(/h1/);
  });
});
