import { useState, ChangeEvent } from 'react';
import { FieldWrapper, InputBase } from '../';
import { InputTypeProps } from './types';
import styles from './Input.module.scss';

function Input(props: InputTypeProps) {
  const {
    id,
    type = 'text',
    name,
    label,
    value,
    placeholder,
    required = false,
    disabled = false,
    readonly = false,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleChange() {}
  return (
    <FieldWrapper label={label} focus={isFocused} error={error}>
      <InputBase
        id={id}
        type={type}
        name={name}
        required={required}
        disabled={disabled}
        readonly={readonly}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </FieldWrapper>
  );
}

export default Input;
