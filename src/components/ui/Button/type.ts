export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | React.ReactNode[];
  tooltipMessage?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isFullWidth?: boolean;
  fontWeight?: 'semiBold' | 'medium';
  borderColor?: 'primary' | 'positive' | 'negative' | 'neutral';
  color?: 'primary' | 'white' | 'dark' | 'positive' | 'negative';
  backgroundPalette?:
    | 'primary'
    | 'secondary'
    | 'transparentSecondary'
    | 'transparentPositive'
    | 'transparentNegative'
    | 'transparentNeutral'
    | 'positive';
}
