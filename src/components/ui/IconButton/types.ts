export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  shape?: 'circle' | 'square';
}
