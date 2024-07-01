import { HTMLAttributes } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  tooltipMessage: string;
  arrow?: 'left' | 'right' | 'topEnd' | 'topStart' | 'bottomEnd' | 'bottomStart' | 'top' | 'bottom';
}
