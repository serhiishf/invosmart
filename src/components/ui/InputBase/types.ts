import { FocusEvent } from 'react';

export interface InputBaseProps {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  paddingLeft?: PaddingSizeInputBase;
  paddingRight?: PaddingSizeInputBase;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

export enum PaddingSizeInputBase {
  zero = 'zero',
  small = 'small',
  default = 'default',
  medium = 'medium',
  large = 'large',
}
