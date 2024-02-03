import { FunctionComponent } from 'react';

export interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  isValid?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  Icon?: FunctionComponent;
}
