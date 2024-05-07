import { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  href: string;
  /**
   * Indicates whether the link is internal. If false and target="_blank" is used,
   * add `rel="noopener noreferrer"` to prevent performance and security issues.
   */
  isInternalLink?: boolean;
}
