export interface FieldWrapperProps {
  label?: string;
  children: React.ReactElement | React.ReactElement[];
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  setError?: (error: boolean) => void;
}
