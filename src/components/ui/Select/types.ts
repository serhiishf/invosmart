type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps {
  isSearchable?: boolean;
  options?: SelectOption[];
  value?: SelectOption;
  onChange?: (value: SelectOption | undefined) => void;
  placeholder?: string;
}
