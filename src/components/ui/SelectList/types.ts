import { ComponentTheme, TextOverflow } from 'constants/theme';
import { MatchStrategy } from 'utils/searchUtils';
import { OptionType } from 'types/common';
import { SelectListItemProps } from '../SelectListItem/types';

type KeyEvent = {
  key: string;
  timeStamp: number;
};

interface BaseListProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  isHeightUnlimited?: boolean;
  textOverflow?: TextOverflow;
  keyEvent?: KeyEvent;
  initialSelected?: number;
  isSelectedMarked?: boolean;
  typedMatchStrategy?: MatchStrategy;
  ariaLabel?: string;
  componentTheme?: ComponentTheme;
  selectedValue?: string;
  onOptionSelect: (selectedListItem: OptionType) => void;
}

interface ListWithoutTopProps extends BaseListProps {
  options?: SelectListItemProps[];
  topOptions?: never;
}

interface ListWithTopProps extends BaseListProps {
  options?: SelectListItemProps[];
  topOptions?: SelectListItemProps[];
}

export type ListProps = ListWithoutTopProps | ListWithTopProps;
