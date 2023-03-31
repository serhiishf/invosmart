import { ChangeEvent, FocusEvent } from 'react';

export interface InputBaseProps {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}
