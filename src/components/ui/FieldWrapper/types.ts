export interface FieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: React.ReactElement | React.ReactElement[];
  isError?: boolean;
  isFocused?: boolean;
  disabled?: boolean;
  labelTargetId?: string;
  helperText?: string;
  helperTextPosition?: 'left' | 'right';
  helperTextId?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  setIsError?: (error: boolean) => void;
}
