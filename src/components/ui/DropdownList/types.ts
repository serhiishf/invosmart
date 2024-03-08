import { SearchStrategy } from 'utils/searchUtils';

export interface DropdownOptionProps extends React.HTMLAttributes<HTMLLIElement> {
  label: string;
  value: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  color?: string;
  backgroundPalette?: 'onGrayBackground' | 'onLightBackground';
  isSelected?: boolean;
  icon?: React.ReactElement;
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
  isSelectedHighlighted?: boolean;
  typedSearchStrategy?: SearchStrategy;
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
