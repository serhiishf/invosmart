import { render, screen } from '@testing-library/react';
import InputBase from './InputBase';

describe('InputBase', () => {
  describe('Default Initialization', () => {
    it('should renders correctly with default props', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveValue();
    });

    it('should matches the snapshot with default props', () => {
      const { asFragment } = render(<InputBase />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should not have a placeholder attribute', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('placeholder');
    });
  });
});
