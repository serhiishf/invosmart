import { ChangeEvent, FocusEvent } from 'react';

export interface InputTypeProps {
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}
