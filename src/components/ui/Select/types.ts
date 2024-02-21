type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps {
  isSearchable?: boolean;
  isClearable?: boolean;
  options?: SelectOption[];
  value?: SelectOption;
  onChange?: (value: SelectOption | undefined) => void;
  placeholder?: string;
  label?: string;
  initialValue?: string;
}
