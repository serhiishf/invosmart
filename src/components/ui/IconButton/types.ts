export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipMessage?: string;
  children?: React.ReactElement | React.ReactElement[];
}
