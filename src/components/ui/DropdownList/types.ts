import { DropdownOptionBase } from 'types/common';

export interface DropdownItemProps extends DropdownOptionBase, React.HTMLAttributes<HTMLLIElement> {
  color?: string;
  backgroundPalette?: string;
  isSelected?: boolean;
}

interface BaseDropdownListProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

interface DropdownListWithoutTopProps extends BaseDropdownListProps {
  options?: DropdownOptionBase[];
  topOptions?: never;
}

interface DropdownListWithTopProps extends BaseDropdownListProps {
  options?: DropdownOptionBase[];
  topOptions?: DropdownOptionBase[];
}

export type DropdownListProps = DropdownListWithoutTopProps | DropdownListWithTopProps;
