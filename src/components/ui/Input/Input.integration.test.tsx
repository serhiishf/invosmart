import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

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
      expect(inputBase).not.toHaveAttribute('aria-readonly');

      //Input should do not have toogle button for password
      const toggleButton = screen.queryByRole('button');
      expect(toggleButton).not.toBeInTheDocument();
    });

    it('should be focusable and handle input changes with default props', async () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      // Simulate focusing the input
      await userEvent.click(input);
      expect(input).toHaveFocus();

      // Simulate typing into the input
      await userEvent.type(input, 'Hello, world!');
      expect(input).toHaveValue('Hello, world!');
    });

    it('should manage focus and respond to keyboard navigation', async () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      // Initial focus check: Input should not be focused initially
      expect(input).not.toHaveFocus();

      // Simulate tabbing into the input
      await userEvent.tab();
      expect(input).toHaveFocus(); // Check if the input receives focus on tab

      // Simulate tabbing out to check if the input can lose focus correctly
      await userEvent.tab();
      expect(input).not.toHaveFocus(); // Ensure the focus has moved away from the input
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
      expect(input).toHaveAttribute('aria-label', 'Label text'); // Assuming you link the label for accessibility
    });

    it('should render label correctly associated with the input', () => {
      const { container } = render(<Input placeholder="Placeholder" label="Label text" />);

      const input = screen.getByRole('textbox'); // Adjust if your input has a different role
      const label = container.querySelector('label'); // Find the label in the container

      // Check that the label exists
      expect(label).toBeInTheDocument();

      // Check that the label's 'htmlFor' matches the input's 'id'
      expect(label).toHaveAttribute('htmlFor', input.id);
    });

    it('should match the snapshot with placeholder and label props', () => {
      const { asFragment } = render(<Input placeholder="Placeholder" label="Label text" />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot with label, placeholder and value props', () => {
      const { asFragment } = render(
        <Input placeholder="Placeholder" label="Label text" value="Initial value" />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot with label, placeholder, value and isError=true', () => {
      const { asFragment } = render(
        <Input placeholder="Placeholder" label="Label text" value="Initial value" isError={true} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
