import { HTMLAttributes, ReactElement } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: never;
  children: ReactElement;
}
