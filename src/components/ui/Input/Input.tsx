import { useState } from 'react';
import { FieldWrapper, InputBase } from '../';
import { validateField } from '../../../utils/validationUtils';
import { PaddingSizeInputBase } from '../InputBase/types';
import { InputTypeProps } from './types';
import styles from './Input.module.scss';

function Input(props: InputTypeProps) {
  const {
    id,
    type = 'text',
    view = 'default',
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
  let paddingLeft = PaddingSizeInputBase.default;
  let paddingRight = PaddingSizeInputBase.default;

  switch (view) {
    case 'compact':
      paddingLeft = PaddingSizeInputBase.small;
      paddingRight = PaddingSizeInputBase.small;
      break;
    case 'search':
      paddingLeft = PaddingSizeInputBase.large;
      break;
    case 'password':
      paddingRight = PaddingSizeInputBase.large;
      break;
  }

  function onFocusHandler() {
    setIsFocused(true);
  }

  function onBlurHandler() {
    setIsFocused(false);
  }

  function onChangeHandler(value: string) {
    const isValid = validateField(type, value);
    setError(!isValid);
  }

  return (
    <div className={styles.input}>
      <FieldWrapper
        label={label}
        focus={isFocused}
        error={error}
        readonly={readonly}
        disabled={disabled}
      >
        <InputBase
          id={id}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          readonly={readonly}
          value={value}
          placeholder={placeholder}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        />
      </FieldWrapper>
    </div>
  );
}

export default Input;
