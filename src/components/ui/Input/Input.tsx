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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (type === 'email') {
      validateEmail(e.target.value);
    }
  }

  function validateEmail(email: string) {
    const emailRegex = /^(?!\.)(?!\s)(?:(?:"[^"]*")|[^@\s])+@[^@\s]+\.[^@\s.]+(?<!\.)(?<!\s)$/;
    setError(!emailRegex.test(email));
  }

  return (
    <div className={styles.input}>
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
    </div>
  );
}

export default Input;
