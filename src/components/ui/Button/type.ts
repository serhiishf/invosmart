export interface ButtonProps {
  children: React.ReactElement | React.ReactElement[];
  tooltipMessage?: string;
  height?: 'xs' | 's' | 'm' | 'l' | 'xl';
  background?: 'main' | 'transparent' | 'accept' | 'decline';
  width?: 'fluid' | 'fixed';
  onClick?: () => void;
}
