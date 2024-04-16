import { render, screen } from '@testing-library/react';
import Link from './Link';

describe('Link', () => {
  it('should render correctly', () => {
    render(<Link label="Some link" href="http://example.com" />);
    const link = screen.getByRole('link', { name: 'Some link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'http://example.com');
  });

  it('should accept the attributes of the html <a> link', () => {
    render(<Link label="Target _blank link" href="http://example.com" target="_blank" />);
    const link = screen.getByRole('link', { name: 'Target _blank link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should matches the snapshot', () => {
    const { asFragment } = render(<Link label="Example link" href="http://example.com" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
