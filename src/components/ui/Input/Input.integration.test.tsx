import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  describe('Default Initialization', () => {
    it('should do something', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      console.log(input);
    });
  });
});
