export interface FieldWrapperProps {
  label?: string;
  children: React.ReactElement | React.ReactElement[];
  isError?: boolean;
  isFocused?: boolean;
  isHoverable?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  setIsError?: (error: boolean) => void;
}
