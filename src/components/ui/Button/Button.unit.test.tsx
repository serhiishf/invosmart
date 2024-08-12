import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import Settings from 'assets/icons/settings.svg?react';

describe('Button', () => {
  describe('default initialization', () => {
    it('should render correctly with default props (without label and icon)', () => {
      render(<Button />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});
