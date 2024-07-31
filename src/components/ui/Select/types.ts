type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactElement;
};

interface BaseSelectProps {
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  hasExpandCollapseButton?: boolean;
  value?: SelectOption;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  initialOption?: SelectOption;
  children?: React.ReactNode;
}

interface SelectPropsWithoutTopOptions extends BaseSelectProps {
  options?: SelectOption[];
  suggestedOptions?: never;
}

interface SelectPropsWithTopOptions extends BaseSelectProps {
  options: SelectOption[];
  suggestedOptions: SelectOption[];
}

export type SelectProps = SelectPropsWithoutTopOptions | SelectPropsWithTopOptions;
