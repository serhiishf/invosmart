export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  tooltip?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isFullWidth?: boolean;
  fontWeight?: 'semiBold' | 'medium';
  borderColor?: 'primary' | 'positive' | 'negative' | 'neutral';
  color?: 'primary' | 'white' | 'dark' | 'positive' | 'negative';
  type?: 'submit' | 'reset' | 'button';
  backgroundPalette?:
    | 'primary'
    | 'secondary'
    | 'transparentSecondary'
    | 'transparentPositive'
    | 'transparentNegative'
    | 'transparentNeutral'
    | 'positive';
}
