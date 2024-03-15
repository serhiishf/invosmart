import { InputHTMLAttributes } from 'react';

type PaddingOption = 'primary' | 'none' | 'compact' | 'minimal';

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft?: PaddingOption;
  paddingRight?: PaddingOption;
  isReadOnlyMode?: boolean;
}
