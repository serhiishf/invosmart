export interface DropdownItemProps extends React.HTMLAttributes<HTMLLIElement> {
  label: string;
  value: string;
  isDisabled?: boolean;
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
}

interface DropdownListWithoutTopProps extends BaseDropdownListProps {
  options?: DropdownItemProps[];
  topOptions?: never;
}

interface DropdownListWithTopProps extends BaseDropdownListProps {
  options?: DropdownItemProps[];
  topOptions?: DropdownItemProps[];
}

export type DropdownListProps = DropdownListWithoutTopProps | DropdownListWithTopProps;
