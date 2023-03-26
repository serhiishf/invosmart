export interface FieldWrapperProps {
  label?: string;
  children: React.ReactElement;
  error?: boolean;
  active?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  setError?: (error: boolean) => void;
}
