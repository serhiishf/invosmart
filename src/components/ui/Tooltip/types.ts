import { HTMLAttributes } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
  className?: never;
}
