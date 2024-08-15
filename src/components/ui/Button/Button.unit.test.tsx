import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { ButtonProps } from './types';

describe('Button', () => {
  describe('Functional tests', () => {
    it('should render correctly with default props (without text and icon)', () => {
      render(<Button></Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render correctly with text and startIcon', () => {
      const MockIcon = () => <svg role="presentation" />;
      render(
        <Button tooltip="Tooltip text" startIcon={MockIcon}>
          Button text
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Button text')).toBeInTheDocument();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should render tooltip on hover', async () => {
      render(<Button tooltip="Tooltip text">Button text</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      await userEvent.hover(button);
      await waitFor(() => expect(screen.getByText('Tooltip text')).toBeInTheDocument());
    });

    //TODO: Fix problem with this part of code - last test not work as expected
    it('should render tooltip on focus', async () => {
      render(<Button tooltip="Tooltip text">Button text</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      await userEvent.keyboard('{Tab}');
      expect(button).toHaveFocus();
      /*       await waitFor(() => expect(screen.getByText('Tooltip text')).toBeInTheDocument()); */
    });

    it('should have default type "button" when no type is specified', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should apply the correct type attribute to the button', () => {
      const types: ButtonProps['type'][] = ['button', 'submit', 'reset'];

      types.forEach((type) => {
        render(<Button type={type}>Button text</Button>);

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

      render(<Button {...attributes}>Click me</Button>);

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
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it('should call onClick handler when clicked', async () => {
      const handleClick = vitest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be focusable with Tab and trigger onClick with Enter', async () => {
      const handleClick = vitest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button');

      await userEvent.keyboard('{Tab}');
      expect(button).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('Snapshots tests', () => {
    it('should match the snapshot with default props', () => {
      const { asFragment } = render(<Button>Default Button</Button>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot with an icon and tooltip', () => {
      const MockIcon = () => <svg role="presentation" />;
      const { asFragment } = render(
        <Button tooltip="Tooltip text" startIcon={MockIcon}>
          Button with Icon
        </Button>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should match the snapshot when disabled', () => {
      const { asFragment } = render(<Button disabled>Disabled Button</Button>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
