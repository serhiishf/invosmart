import { InputHTMLAttributes } from 'react';
import { PaddingInput } from 'constants/theme';

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft?: PaddingInput;
  paddingRight?: PaddingInput;
  /**
   * The isReadOnlyMode prop is used to keep inputs focusable and part of the tab order on iOS Safari, where the readonly attribute would otherwise remove them.
   */
  isReadOnlyMode?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
