import { ChangeEvent, FocusEvent } from 'react';

export interface InputProps {
  id?: string;
  type?: string;
  view?: 'default' | 'compact' | 'search' | 'password';
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
}
