import { useState } from 'react';
import { FieldWrapper, InputBase, Tooltip, IconButton } from '../';
import { InputProps } from './types';
import styles from './Input.module.scss';
import AttentionIcon from '../../../assets/icons/attention.svg?react';
import ShowPasswordIcon from '../../../assets/icons/eye.svg?react';
import HidePasswordIcon from '../../../assets/icons/eyeSlash.svg?react';
import classNames from 'classnames';

function Input(props: InputProps) {
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
    isValid = true,
    isError,
    errorMessage,
    onChange,
    Icon,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          className={classNames(!!Icon && styles.inputBaseProps)}
        />
        <>
          {type === 'password' && (
            <div className={classNames(styles.passwordButtonContainer)}>
              <div className={classNames(styles.passwordButtonWrap)}>
                <IconButton Icon={ShowPasswordIcon} />
              </div>
            </div>
          )}
        </>
        <>
          {isError && (
            <div className={styles.attentionContainer}>
              <AttentionIcon className={styles.attentionIcon} />
            </div>
          )}
        </>
        <>
          {errorMessage && (
            <div className={styles.tooltipContainer}>
              <Tooltip tooltipMessage={errorMessage} arrow="topRight" isError={isError} />
            </div>
          )}
        </>
      </FieldWrapper>
    </div>
  );
}

export default Input;
