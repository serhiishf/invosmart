import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  describe('default initialization', () => {
    it('should render correctly with default props (without label and icon)', () => {
      render(<Button />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('with optional props', () => {
    it('should render correctly with icon, label and tooltip', () => {
      const MockIcon = () => <svg role="presentation" />;
      render(<Button label="Button label" tooltip="Tooltip text" icon={MockIcon} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Button label')).toBeInTheDocument();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should have default type "button" when no type is specified', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have type "submit" when specified', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should have type "reset" when specified', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });
});
