import { render, screen } from '@testing-library/react';
import FieldWrapper from './FieldWrapper';

describe('FieldWrapper', () => {
  describe('Functional tests', () => {
    it('should render the label, children, and helper text when provided', () => {
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

    it('should associate the label with the correct input when labelTargetId is passed as a prop', () => {
      render(
        <FieldWrapper label="Test Label" labelTargetId="test-input">
          <input id="test-input" />
        </FieldWrapper>
      );

      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('id', 'test-input');
      const label = screen.getAllByText('Test Label');

      expect(label).toHaveLength(2);
    });

    it('should correctly associate helper text with input via aria-describedby when helperTextId is passed', () => {
      render(
        <FieldWrapper
          label="Username"
          labelTargetId="username-input"
          helperText="Your username must be 8-20 characters long."
          helperTextId="username-helper"
        >
          <input id="username-input" aria-describedby="username-helper" />
        </FieldWrapper>
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-helper');

      const helperText = screen.getByText('Your username must be 8-20 characters long.');
      expect(helperText).toHaveAttribute('id', 'username-helper');
    });

    it('should apply custom className and other props', () => {
      render(
        <FieldWrapper label="Test Label" className="custom-class" data-testid="field-wrapper">
          <input id="test-input" />
        </FieldWrapper>
      );

      const wrapper = screen.getByTestId('field-wrapper');
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Snapshots tests', () => {
    it('should match the snapshot with label, helper text and input', () => {
      const { asFragment } = render(
        <FieldWrapper label="Test Label" helperText="Helper Text">
          <input />
        </FieldWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot with default state - no passing props', () => {
      const { asFragment } = render(
        <FieldWrapper>
          <input />
        </FieldWrapper>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
