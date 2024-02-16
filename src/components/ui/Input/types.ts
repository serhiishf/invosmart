import { FunctionComponent } from 'react';
import { InputBaseProps } from '../InputBase/types';

export interface InputProps extends InputBaseProps {
  id?: string;
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isError?: boolean;
  PrefixIcon?: FunctionComponent;
}
