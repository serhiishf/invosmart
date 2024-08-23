import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  describe('Functional tests', () => {
    it('should apply standard HTML properties and custom class names correctly', () => {
      render(<Spinner aria-label="Loading spinner" role="status" className="customClassname" />);
      const spinner = screen.getByLabelText('Loading spinner');

      expect(spinner).toHaveClass('customClassname');
      expect(spinner).toHaveAttribute('role', 'status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading spinner');
    });

    it('should apply custom HTML attributes correctly', () => {
      render(<Spinner data-testid="custom-spinner" data-custom-attr="customValue" />);
      const spinner = screen.getByTestId('custom-spinner');

      expect(spinner).toHaveAttribute('data-custom-attr', 'customValue');
    });
  });

  describe('Snapshots tests', () => {
    it('should matches snapshot for default variant', () => {
      const { container } = render(<Spinner />);
      expect(container).toMatchSnapshot();
    });

    it('should matches snapshot for page variant', () => {
      const { container } = render(<Spinner variant="page" />);
      expect(container).toMatchSnapshot();
    });

    it('should matches snapshot for inline variant', () => {
      const { container } = render(<Spinner variant="inline" />);
      expect(container).toMatchSnapshot();
    });
  });
});
