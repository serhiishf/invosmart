import { MatchStrategy } from 'utils/searchUtils';
import { ComponentTheme, TextOverflow } from 'constants/theme';
import { OptionType } from 'types/common';

export enum ListItemTheme {
  OnGreyBackground = 'onGreyBackground',
  OnLightBackground = 'onLightBackground',
}

type KeyEvent = {
  key: string;
  timeStamp: number;
};

export interface ListItemProps extends OptionType, React.HTMLAttributes<HTMLLIElement> {
  isDisabled?: boolean;
  isFocused?: boolean;
  backgroundPalette?: ListItemTheme;
  isSelected?: boolean;
  textOverflow?: TextOverflow;
}

interface BaseListProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  isHeightUnlimited?: boolean;
  textOverflow?: TextOverflow;
  isMenu?: boolean;
  keyEvent?: KeyEvent;
  initialSelected?: number;
  isSelectedMarked?: boolean;
  typedMatchStrategy?: MatchStrategy;
  ariaLabel?: string;
  componentTheme?: ComponentTheme;
  selectedValue?: string;
  onListItemSelect: (selectedListItem: OptionType) => void;
}

interface ListWithoutTopProps extends BaseListProps {
  options?: ListItemProps[];
  topOptions?: never;
}

interface ListWithTopProps extends BaseListProps {
  options?: ListItemProps[];
  topOptions?: ListItemProps[];
}

export type ListProps = ListWithoutTopProps | ListWithTopProps;
