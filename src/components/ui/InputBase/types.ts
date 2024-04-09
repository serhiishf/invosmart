import { InputHTMLAttributes } from 'react';
import { PaddingInput } from 'constants/theme';

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft?: PaddingInput;
  paddingRight?: PaddingInput;
  isReadOnlyMode?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
