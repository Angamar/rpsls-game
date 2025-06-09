import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renders with children', () => {
    render(<Modal>Test Content</Modal>);
    expect(screen.getByTestId('wrapper_modal')).toBeInTheDocument();
    expect(screen.getByTestId('wrapper_modal_content')).toBeInTheDocument();
    expect(screen.getByTestId('content_modal')).toHaveTextContent('Test Content');
  });

  it('renders children inside modal content', () => {
    render(<Modal>Test Content</Modal>);
    const content = screen.getByTestId('content_modal');
    expect(content).toHaveTextContent('Test Content');
  });

  it('applies the modalContentStyle class if provided', () => {
    render(<Modal modalContentStyle="custom-style">Styled Content</Modal>);
    const content = screen.getByTestId('content_modal');
    expect(content.className).toContain('custom-style');
  });

  it('renders without children', () => {
    render(<Modal />);
    const content = screen.getByTestId('content_modal');
    expect(content).toBeEmptyDOMElement();
  });
});
