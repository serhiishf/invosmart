import { render, screen, fireEvent } from '@testing-library/react';
import InputBase from './InputBase';

describe('InputBase', () => {
  describe('Default Initialization', () => {
    it('should render correctly with default props', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveValue();
    });

    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<InputBase />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should not have a placeholder attribute', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('placeholder');
    });

    it('should update the value on user input', () => {
      render(<InputBase />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
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

    it('should not allow typing in an empty input when isReadOnlyMode is enabled', () => {
      render(<InputBase isReadOnlyMode={true} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
      expect(input).toHaveValue('');
    });

    it('should not allow typing in an input with an initial value when isReadOnlyMode is enabled', () => {
      render(<InputBase isReadOnlyMode={true} value="some text" />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'typed text' } });
      expect(input).toHaveValue('some text');
    });

    it('should match the snapshot when isReadOnlyMode is enabled', () => {
      const { asFragment } = render(<InputBase isReadOnlyMode={true} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
