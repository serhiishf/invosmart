import { useState, ChangeEvent } from 'react';
import { FieldWrapper, InputBase } from '../';
import { InputTypeProps } from './types';
import styles from './Input.module.scss';

function Input(props: InputTypeProps) {
  const {
    id,
    type = 'text',
    name,
    label = 'Email',
    value,
    placeholder,
    onChange,
    onBlur,
    onFocus,
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
  return (
    <FieldWrapper label={label} focus={isFocused}>
      <InputBase onFocus={handleFocus} onBlur={handleBlur}></InputBase>
    </FieldWrapper>
  );
}

export default Input;
