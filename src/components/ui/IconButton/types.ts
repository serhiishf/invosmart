import { FunctionComponent } from 'react';

export interface IconButtonProps {
  Icon?: FunctionComponent;
  tooltipMessage?: string;
  onClick?: () => void;
}
