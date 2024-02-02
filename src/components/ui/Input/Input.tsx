import { useState } from 'react';
import { FieldWrapper, InputBase } from '../';
import { validateField } from '../../../utils/validationUtils';
import { PaddingSizeInputBase } from '../InputBase/types';
import { InputTypeProps } from './types';
import styles from './Input.module.scss';
import AttentionIcon from '../../../assets/icons/attention.svg?react';

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
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(true);

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
    setIsValid(validateField(type, value));
    setIsError(!isValid);
  }

  return (
    <div className={styles.input}>
      <FieldWrapper
        label={label}
        focus={isFocused}
        error={isError}
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
        <>
          {!isValid && (
            <div className={styles.attentionContainer}>
              <AttentionIcon className={styles.attentionContainer__icon} />
            </div>
          )}
        </>
      </FieldWrapper>
    </div>
  );
}

export default Input;
