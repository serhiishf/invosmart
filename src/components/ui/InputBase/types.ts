import { InputHTMLAttributes } from 'react';

type InputPadding = 'default' | 'moderate' | 'minimal' | 'none';

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft?: InputPadding;
  paddingRight?: InputPadding;
  isError?: boolean;
  /**
   * The isReadOnlyMode prop is used instead readonly attribute to keep inputs focusable and part of the tab order on iOS Safari, where the readonly attribute would otherwise remove them.
   */
  isReadOnlyMode?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
