import { DropdownOptionBase } from 'types/common';

export interface DropdownItemProps extends DropdownOptionBase {
  color?: string;
  backgroundPalette?: string;
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
