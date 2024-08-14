import { render, screen } from '@testing-library/react';
import FieldWrapper from './FieldWrapper';

describe('FieldWrapper', () => {
  describe('Functional Tests', () => {
    it('should render the label, children, and helper text', () => {
      render(
        <FieldWrapper label="Test Label" helperText="Helper Text">
          <input />
        </FieldWrapper>
      );

      const labels = screen.getAllByText('Test Label');
      expect(labels).toHaveLength(2);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('Helper Text')).toBeInTheDocument();
    });
  });
});
