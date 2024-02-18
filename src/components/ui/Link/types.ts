import { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  href: string;
}
