import { InputHTMLAttributes } from 'react';

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft?: 'primary' | 'none';
  paddingRight?: 'primary' | 'none';
}
