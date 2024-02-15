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
  isError?: boolean;
  onChange?: (value: string) => void;
  PrefixIcon?: FunctionComponent;
}
