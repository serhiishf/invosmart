export interface ButtonProps {
  children: React.ReactElement | React.ReactElement[];
  tooltipMessage?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isFullWidth?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  borderColor?: 'primary' | 'positive' | 'negative' | 'neutral';
  color?: 'primary' | 'dark' | 'positive' | 'negative';
  backgroundPalette?:
    | 'primary'
    | 'secondary'
    | 'transparentSecondary'
    | 'transparentPositive'
    | 'transparentNegative'
    | 'transparentNeutral'
    | 'positive'
    | 'negative';
}
