import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { ButtonProps } from './types';

describe('Button', () => {
  it('should render correctly with default props (without text and icon)', () => {
    render(<Button></Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render correctly with text, icon and tooltip', () => {
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
});
