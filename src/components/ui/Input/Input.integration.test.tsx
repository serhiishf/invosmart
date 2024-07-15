import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import IconSearch from 'assets/icons/search.svg?react';

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal();
  if (typeof actual !== 'object' || actual === null) {
    throw new Error("Expected 'react' module to be an object.");
  }
  return {
    ...actual,
    useId: () => 'mocked-id',
  };
});

describe('Input', () => {
  describe('default Initialization', () => {
    it('should render correctly with default props', () => {
      render(<Input />);
      const input = screen.getByTestId('input-component');
      expect(input).toBeInTheDocument();

      //Input should have inside tag input with correct type attribute
      const inputBase = screen.getByRole('textbox');
      expect(inputBase).toBeInTheDocument();
      expect(inputBase).toHaveAttribute('type', 'text');
      expect(inputBase).not.toBeDisabled();
    });

    it('should not render a toggle button for non-password inputs', () => {
      render(<Input />);
      const toggleButton = screen.queryByRole('button');

      expect(toggleButton).not.toBeInTheDocument();
    });

    it('should be focusable and handle input changes with default props', async () => {
      render(<Input />);
      const inputBase = screen.getByRole('textbox');

      await userEvent.click(inputBase);
      expect(inputBase).toHaveFocus();
      await userEvent.type(inputBase, 'Hello, world!');
      expect(inputBase).toHaveValue('Hello, world!');
    });

    it('should handle focus and keyboard interaction correctly', async () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      // Move focus to the input using the tab key
      await userEvent.tab();
      expect(input).toHaveFocus();

      // Type into the input
      await userEvent.type(input, 'Hello, world!');
      expect(input).toHaveValue('Hello, world!');

      // Move focus away from the input using the tab key
      await userEvent.tab();
      expect(input).not.toHaveFocus();
    });

    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<Input />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('initial with props', () => {
    it('should display the correct placeholder and label', () => {
      render(<Input placeholder="Placeholder" label="Label text" />);
      const input = screen.getByTestId('input-component');
      const label = screen.getByText('Label text');

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it('should render correctly password type input and toggle visibility', async () => {
      render(<Input placeholder="Password" label="Password" type="password" />);
      const inputBase = screen.getByPlaceholderText('Password');
      const toggleButton = screen.getByRole('button');

      expect(toggleButton).toBeInTheDocument();
      expect(inputBase).toHaveAttribute('type', 'password');
      await userEvent.click(toggleButton);
      expect(inputBase).toHaveAttribute('type', 'text');
      await userEvent.click(toggleButton);
      expect(inputBase).toHaveAttribute('type', 'password');
    });

    it('should render label correctly associated with the input', () => {
      const { container } = render(<Input placeholder="Placeholder" label="Label text" />);
      const label = container.querySelector('label');
      const inputBase = screen.getByLabelText('Label text');
      expect(label).toHaveAttribute('for', 'mocked-id');
      expect(inputBase).toHaveAttribute('id', 'mocked-id');
    });

    it('should render input with readonly attribute and prevent any typing', async () => {
      render(<Input placeholder="Readonly" readOnly={true} value="Initial Value" />);
      const inputBase = screen.getByRole('textbox');
      await userEvent.click(inputBase);
      await userEvent.type(inputBase, 'Some text');
      expect(inputBase).toHaveValue('Initial Value');
    });

    it('should render disabled input and prevent any typing', async () => {
      render(<Input placeholder="Disabled" disabled={true} />);
      const inputBase = screen.getByRole('textbox');
      expect(inputBase).toBeDisabled();
      await userEvent.type(inputBase, 'Some text');
      expect(inputBase).not.toHaveValue();
    });

    it('should match expected snapshots when rendered with various props', () => {
      const { asFragment, rerender } = render(<Input />);
      expect(asFragment()).toMatchSnapshot('default props');

      rerender(<Input placeholder="Placeholder" label="Label text" />);
      expect(asFragment()).toMatchSnapshot('with placeholder and label');

      rerender(<Input placeholder="Placeholder" label="Label text" value="Initial value" />);
      expect(asFragment()).toMatchSnapshot('with value');

      rerender(<Input isError={true} />);
      expect(asFragment()).toMatchSnapshot('error state');

      rerender(<Input readOnly={true} />);
      expect(asFragment()).toMatchSnapshot('read-only state');

      rerender(<Input PrefixIcon={IconSearch} />);
      expect(asFragment()).toMatchSnapshot('with PrefixIcon');

      rerender(<Input disabled={true} />);
      expect(asFragment()).toMatchSnapshot('disabled state');
    });
  });
});
