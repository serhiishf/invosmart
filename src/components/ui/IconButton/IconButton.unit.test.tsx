import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './IconButton';
import { IconButtonProps } from './types';

describe('IconButton', () => {
  describe('Functional tests', () => {
    it('should render correctly with default props (without text and icon)', () => {
      render(<IconButton></IconButton>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render correctly with text', () => {
      render(<IconButton>Button text</IconButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Button text')).toBeInTheDocument();
    });

    it('should render correctly with icon', () => {
      const MockIcon = () => <svg role="presentation" />;
      render(
        <IconButton>
          <MockIcon />
        </IconButton>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should render tooltip on hover', async () => {
      render(<IconButton tooltip="Tooltip text">BT</IconButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      await userEvent.hover(button);
      await waitFor(() => expect(screen.getByText('Tooltip text')).toBeInTheDocument());
    });

    it('should render tooltip on focus - ALERT: THIS TEST EXISTS BUT DOES NOT FULLY VERIFY THE EXPECTED BEHAVIOR DUE TO focus-visible LIMITATIONS', async () => {
      render(<IconButton tooltip="Tooltip text">BT</IconButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      await userEvent.keyboard('{Tab}');
      expect(button).toHaveFocus();
      /*
       * Cannot verify tooltip visibility because the Tooltip uses the floating-ui library,
       * which relies on focus-visible. Unfortunately, focus-visible cannot be reliably simulated
       * in the current test environment. This test case is left incomplete.
       */
      /* await waitFor(() => expect(screen.queryByText('Tooltip text')).toBeInTheDocument()); */
    });

    it('should have default type "button" when no type is specified', () => {
      render(<IconButton>Click me</IconButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should apply the correct type attribute to the button', () => {
      const types: IconButtonProps['type'][] = ['button', 'submit', 'reset'];

      types.forEach((type) => {
        render(<IconButton type={type}>Button text</IconButton>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', type);

        cleanup();
      });
    });

    it('should pass through standard and custom HTML attributes', () => {
      const testId = 'test-button';
      const attributes = {
        id: 'my-button',
        className: 'custom-class',
        dir: 'ltr',
        'data-testid': testId,
        'aria-label': 'Custom Button',
        'data-custom': 'custom-value',
      };

      render(<IconButton {...attributes}>BT</IconButton>);

      const button = screen.getByTestId(testId);

      // Check standard attributes
      expect(button).toHaveAttribute('id', 'my-button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveAttribute('aria-label', 'Custom Button');
      expect(button).toHaveAttribute('dir', 'ltr');

      // Check custom data attribute
      expect(button).toHaveAttribute('data-custom', 'custom-value');
    });

    it('should be disabled when disabled prop is true', async () => {
      const handleClick = vitest.fn();
      render(
        <IconButton disabled onClick={handleClick}>
          BT
        </IconButton>
      );
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it('should call onClick handler when clicked', async () => {
      const handleClick = vitest.fn();
      render(<IconButton onClick={handleClick}>BT</IconButton>);
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be focusable with Tab and trigger onClick with Enter', async () => {
      const handleClick = vitest.fn();
      render(<IconButton onClick={handleClick}>BT</IconButton>);
      const button = screen.getByRole('button');

      await userEvent.keyboard('{Tab}');
      expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Snapshots tests', () => {
    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<IconButton>BT</IconButton>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot with an icon and tooltip', () => {
      const MockIcon = () => <svg role="presentation" />;
      const { asFragment } = render(
        <IconButton tooltip="Tooltip text">
          <MockIcon />
        </IconButton>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot when disabled', () => {
      const { asFragment } = render(<IconButton disabled>BT</IconButton>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
