export interface ButtonProps {
  children: React.ReactElement | React.ReactElement[];
  tooltipMessage?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  background?: 'main' | 'transparent' | 'accept' | 'decline';
  isFullWidth?: boolean;
  onClick?: () => void;
  border?: string;
  colorTheme?: string;
}
