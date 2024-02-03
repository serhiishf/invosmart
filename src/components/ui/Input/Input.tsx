import { useState } from 'react';
import { FieldWrapper, InputBase } from '../';
import { PaddingSizeInputBase } from '../InputBase/types';
import { InputProps } from './types';
import styles from './Input.module.scss';
import AttentionIcon from '../../../assets/icons/attention.svg?react';
import classNames from 'classnames';

function Input(props: InputProps) {
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
    isValid = true,
    isError,
    errorMessage,
    onChange,
    Icon,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <div className={styles.input}>
      <FieldWrapper
        label={label}
        focus={isFocused}
        error={!isValid || isError}
        readonly={readonly}
        disabled={disabled}
      >
        <>
          {Icon && (
            <div className={styles.staticIconLeft}>
              <Icon />
            </div>
          )}
        </>
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
          onChange={onChange}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        />
        <>
          {isError && (
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
