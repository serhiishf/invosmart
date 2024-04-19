export interface FieldWrapperProps {
  label?: string;
  children: React.ReactElement | React.ReactElement[];
  isError?: boolean;
  isFocused?: boolean;
  isHoverable?: boolean;
  disabled?: boolean;
  labelTargetId?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  setIsError?: (error: boolean) => void;
}
