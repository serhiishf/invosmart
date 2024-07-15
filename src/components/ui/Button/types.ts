export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isFullWidth?: boolean;
  fontWeight?: 'semiBold' | 'medium';
  isBordered?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Icon?: React.FunctionComponent;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  buttonPalette?:
    | 'primary'
    | 'secondary'
    | 'transparentSecondary'
    | 'transparentPositive'
    | 'transparentNegative'
    | 'transparentNeutral'
    | 'positive';
}
