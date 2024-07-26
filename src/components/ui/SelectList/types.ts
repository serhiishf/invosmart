import { ComponentTheme, TextOverflow } from 'constants/theme';
import { MatchStrategy } from 'utils/searchUtils';
import { OptionType } from 'types/common';
import { SelectListItemProps } from '../SelectListItem/types';
import { HTMLAttributes } from 'react';

type KeyEvent = {
  key: string;
  timeStamp: number;
};

interface BaseSelectListProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  noOptionsMessage?: string;
  isHeightUnlimited?: boolean;
  textOverflow?: TextOverflow;
  keyEvent?: KeyEvent;
  isSelectedMarked?: boolean;
  typedMatchStrategy?: MatchStrategy;
  ariaLabel?: string;
  componentTheme?: ComponentTheme;
  selectedOption?: OptionType;
  onOptionSelect: (selectedListItem: OptionType) => void;
}

interface SelectListWithoutTopProps extends BaseSelectListProps {
  options?: SelectListItemProps[];
  topOptions?: never;
}

interface SelectListWithTopProps extends BaseSelectListProps {
  options?: SelectListItemProps[];
  topOptions?: SelectListItemProps[];
}

export type SelectListProps = SelectListWithoutTopProps | SelectListWithTopProps;
