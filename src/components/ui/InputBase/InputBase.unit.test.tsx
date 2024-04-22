import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBase from './InputBase';

describe('InputBase', () => {
  describe('default Initialization', () => {
    it('should render correctly with default props', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveValue();
    });

    it('should not have value and placeholder attribute', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveValue();
      expect(input).not.toHaveAttribute('placeholder');
    });

    it('should update the value on user input', async () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'typed text');
      expect(input).toHaveValue('typed text');
    });

    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<InputBase />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('initialization with props', () => {
    it('should render empty input with placeholder', () => {
      render(<InputBase placeholder="Some placeholder" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Some placeholder');
    });

    it('should render the input correctly with an initial value', () => {
      render(<InputBase value="initial value" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('initial value');
    });

    it('should mark the input as aria-readonly and prevent typing when isReadOnlyMode is true', async () => {
      render(<InputBase isReadOnlyMode={true} />);
      const input = screen.getByRole('textbox');

      // Ensure the input is marked as read-only for accessibility
      expect(input).toHaveAttribute('aria-readonly', 'true');

      // Attempt to type into the input and check that the input value is unchanged
      await userEvent.type(input, 'typed text');
      expect(input).toHaveValue('');
    });

    it('should retain the initial value and prevent typing when isReadOnlyMode is true', async () => {
      render(<InputBase isReadOnlyMode={true} value="some text" />);
      const input = screen.getByRole('textbox');

      // Ensure the input is marked as read-only for accessibility
      expect(input).toHaveAttribute('aria-readonly', 'true');

      // Attempt to type into the input and check that the initial value is unchanged
      await userEvent.type(input, 'typed text');
      expect(input).toHaveValue('some text');
    });

    it('should have attribute aria-invalid="true" when isError=true', () => {
      render(<InputBase isReadOnlyMode={true} value="some text" isError={true} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should render disabled input and prevent any typing', async () => {
      render(<InputBase disabled={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      await userEvent.type(input, 'Some text');
      expect(input).not.toHaveValue();
    });

    it('should match the snapshot when isReadOnlyMode is true', () => {
      const { asFragment } = render(<InputBase isReadOnlyMode={true} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
