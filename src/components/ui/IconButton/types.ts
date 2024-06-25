export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactElement | React.ReactElement[];
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'auto';
  shape?: 'circle' | 'square';
}
