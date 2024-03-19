import { SearchStrategy } from 'utils/searchUtils';
import { ComponentTheme, TextOverflow } from 'constants/theme';

export enum OptionTheme {
  OnGreyBackground = 'onGreyBackground',
  OnLightBackground = 'onLightBackground',
}

type KeyEvent = {
  key: string;
  timeStamp: number;
};

interface OptionType {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export interface OptionProps extends OptionType, React.HTMLAttributes<HTMLLIElement> {
  isDisabled?: boolean;
  isFocused?: boolean;
  backgroundPalette?: OptionTheme;
  isSelected?: boolean;
  textOverflow?: TextOverflow;
}

interface BaseDropdownProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  isHeightUnlimited?: boolean;
  textOverflow?: TextOverflow;
  isMenu?: boolean;
  keyEvent?: KeyEvent;
  initialSelected?: number;
  isSelectedMarked?: boolean;
  typedSearchStrategy?: SearchStrategy;
  ariaLabel?: string;
  componentTheme?: ComponentTheme;
  selectedValue?: string;
  onOptionSelect: (selectedOption: OptionType) => void;
}

interface DropdownWithoutTopProps extends BaseDropdownProps {
  options?: OptionProps[];
  topOptions?: never;
}

interface DropdownWithTopProps extends BaseDropdownProps {
  options?: OptionProps[];
  topOptions?: OptionProps[];
}

export type DropdownProps = DropdownWithoutTopProps | DropdownWithTopProps;
