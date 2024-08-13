import { TextOverflow } from 'constants/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isFullWidth?: boolean;
  fontWeight?: 'semiBold' | 'medium';
  isBordered?: boolean;
  type?: 'submit' | 'reset' | 'button';
  shape?: 'rounded' | 'regular';
  startIcon?: React.FunctionComponent;
  onClick?: () => void;
  disabled?: boolean;
  textOverflow?: TextOverflow;
  buttonPalette?:
    | 'primary'
    | 'secondary'
    | 'transparentSecondary'
    | 'transparentPositive'
    | 'transparentNegative'
    | 'transparentNeutral'
    | 'positive';
}
