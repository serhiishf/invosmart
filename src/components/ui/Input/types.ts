import { FunctionComponent, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isError?: boolean;
  PrefixIcon?: FunctionComponent;
  helperText?: string;
  isPasswordVisibleInitially?: boolean;
}
