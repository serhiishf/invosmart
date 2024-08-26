import { render, screen } from '@testing-library/react';
import Link from './Link';

describe('Link', () => {
  describe('Functional tests', () => {
    it('should render correctly with link and name', () => {
      render(<Link href="http://example.com">Some link</Link>);
      const link = screen.getByRole('link', { name: 'Some link' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'http://example.com');
    });

    it('should accept attribute "target"', () => {
      render(
        <Link href="http://example.com" target="_blank">
          Target _blank link
        </Link>
      );
      const link = screen.getByRole('link', { name: 'Target _blank link' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should add rel="noopener noreferrer" when target is "_blank" and not an internal link', () => {
      render(
        <Link href="http://example.com" target="_blank">
          Not internal link
        </Link>
      );
      const link = screen.getByRole('link', { name: 'Not internal link' });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should override rel="noopener noreferrer" when target is "_blank" and passed rel separately', () => {
      render(
        <Link href="http://example.com" target="_blank" rel="noopener">
          Not internal link
        </Link>
      );
      const link = screen.getByRole('link', { name: 'Not internal link' });
      expect(link).toHaveAttribute('rel', 'noopener');
    });

    it('should apply standard HTML properties and custom class names correctly', () => {
      render(
        <Link
          href="https://example.com"
          target="_blank"
          className="custom-class"
          aria-label="Example Link"
        >
          Example Link
        </Link>
      );

      const link = screen.getByRole('link', { name: 'Example Link' });
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('aria-label', 'Example Link');

      expect(link?.classList.contains('custom-class')).toBe(true);
    });

    it('should apply custom HTML attributes correctly', () => {
      render(
        <Link
          href="https://example.com"
          data-custom-attribute="custom-value"
          data-testid="custom-link"
        >
          Custom Link
        </Link>
      );
      const link = screen.getByRole('link', { name: 'Custom Link' });

      expect(link).toHaveAttribute('data-custom-attribute', 'custom-value');
      expect(link).toHaveAttribute('data-testid', 'custom-link');
    });
  });

  describe('Snapshots tests', () => {
    it('should matches the snapshot with label="Example link" and href="http://example.com"', () => {
      const { asFragment } = render(<Link href="http://example.com">Example link</Link>);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should mathces the snapshot with classname passed in props', () => {
      const { asFragment } = render(
        <Link href="http://example.com" className="additionalClassName">
          Example link
        </Link>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should mathces the snapshot with classname passed in props', () => {
      const { asFragment } = render(
        <Link href="http://example.com" className="additionalClassName" target="_blank">
          Example link
        </Link>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
