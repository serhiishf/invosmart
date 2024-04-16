import { render, screen, fireEvent } from '@testing-library/react';
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

    it('should update value on user input', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
    });
  });

  describe('initizalization with props', () => {
    it('should render empty input with placeholder', () => {
      render(<InputBase placeholder="Some placeholder" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Some placeholder');
    });

    it('should render input with initial value', () => {
      render(<InputBase value="initial value" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('initial value');
    });

    it('should not allow typing in empty input when isReadonlyMode', () => {
      render(<InputBase isReadOnlyMode={true} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
      expect(input).toHaveValue('');
    });

    it('should not allow typing in input with initial value, when isReadonlyMode', () => {
      render(<InputBase isReadOnlyMode={true} value="some text" />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
      expect(input).toHaveValue('some text');
    });

    it('should matches the snapshot with isReadOnlyMode - emulating readonly attribute', () => {
      const { asFragment } = render(<InputBase isReadOnlyMode={true} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
