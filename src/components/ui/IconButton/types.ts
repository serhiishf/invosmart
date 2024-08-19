export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  shape?: 'circle' | 'square';
}
