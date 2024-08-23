import { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  underline?: 'hover' | 'none' | 'always';
  /**
   * Indicates whether the link is internal. If false and target="_blank" is used,
   * add `rel="noopener noreferrer"` to prevent performance and security issues.
   */
  isInternalLink?: boolean;
}
