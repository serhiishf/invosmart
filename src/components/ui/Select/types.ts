type SelectOption = {
  label: string;
  value: string;
  icon?: React.ReactElement;
};

interface BaseSelectProps {
  isSearchable?: boolean;
  isClearable?: boolean;
  hasExpandCollapseButton?: boolean;
  value?: SelectOption;
  onChange?: (value: SelectOption | undefined) => void;
  placeholder?: string;
  label?: string;
  initialValue?: SelectOption;
  children?: React.ReactNode;
}

interface SelectPropsWithoutTopOptions extends BaseSelectProps {
  options?: SelectOption[];
  topOptions?: never;
}

interface SelectPropsWithTopOptions extends BaseSelectProps {
  options: SelectOption[];
  topOptions: SelectOption[];
}

export type SelectProps = SelectPropsWithoutTopOptions | SelectPropsWithTopOptions;
