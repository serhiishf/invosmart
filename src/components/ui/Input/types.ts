import { ChangeEvent, FocusEvent } from 'react';

export interface InputTypeProps {
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
}
