import { TextOverflow } from 'constants/theme';
import { OptionType } from 'types/common';

export interface SelectListItemProps extends OptionType, React.HTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  isFocused?: boolean;
  backgroundPalette?: 'onGreyBackground' | 'onLightBackground';
  isSelected?: boolean;
  textOverflow?: TextOverflow;
}
