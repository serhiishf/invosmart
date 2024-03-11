import { SearchStrategy } from 'utils/searchUtils';

interface DropdownOptionType {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export interface DropdownOptionProps
  extends DropdownOptionType,
    React.HTMLAttributes<HTMLLIElement> {
  isDisabled?: boolean;
  isFocused?: boolean;
  color?: string;
  backgroundPalette?: 'onGrayBackground' | 'onLightBackground';
  isSelected?: boolean;
  textOverflow?: 'wrap' | 'truncate';
}

interface BaseDropdownListProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  isHeightUnlimited?: boolean;
  textOverflow?: 'wrap' | 'truncate';
  isMenu?: boolean;
  keyEvent?: { key: string; timeStamp: number };
  initialSelected?: number;
  isSelectedMarked?: boolean;
  typedSearchStrategy?: SearchStrategy;
  ariaLabel?: string;
  backgroundColor?: 'grey' | 'light';
  onOptionSelect?: (selectedOption: DropdownOptionType) => void;
}

interface DropdownListWithoutTopProps extends BaseDropdownListProps {
  options?: DropdownOptionProps[];
  topOptions?: never;
}

interface DropdownListWithTopProps extends BaseDropdownListProps {
  options?: DropdownOptionProps[];
  topOptions?: DropdownOptionProps[];
}

export type DropdownListProps = DropdownListWithoutTopProps | DropdownListWithTopProps;
