import InputBase from './InputBase';
import { render, screen } from '@testing-library/react';

describe('InputBase', () => {
  describe('default render', () => {
    it('should default render correctly', () => {
      render(<InputBase />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should match with snapshot', () => {
      const result = render(<InputBase />);
      expect(result).toMatchSnapshot();
    });
  });
});
