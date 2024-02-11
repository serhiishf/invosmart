import { useEffect, useState } from 'react';
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
    isError = false,
    errorMessage,
    onChange,
    PrefixIcon,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentInputType, setCurrentInputType] = useState(type);

  const IconButtonContent = isPasswordVisible ? HidePasswordIcon : ShowPasswordIcon;
  const tooltipMessage = isPasswordVisible ? 'TRANSLATE Hide password' : 'TRANSLATE Show password';

  function onFocusHandler() {
    setIsFocused(true);
  }

  function onBlurHandler() {
    setIsFocused(false);
  }

  function passwordButtonHandler() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  useEffect(() => {
    if (type === 'password') {
      const newInputType = isPasswordVisible ? 'text' : 'password';
      setCurrentInputType(newInputType);
    }
  }, [isPasswordVisible, type]);

  return (
    <div className={styles.input}>
      <FieldWrapper
        label={label}
        focus={isFocused}
        error={isError}
        readonly={readonly}
        disabled={disabled}
      >
        <>
          {PrefixIcon && (
            <div className={styles.prefixContainer}>
              {PrefixIcon && (
                <div className={styles.staticPrefixIcon}>
                  <PrefixIcon />
                </div>
              )}
            </div>
          )}
        </>
        <InputBase
          id={id}
          type={currentInputType}
          name={name}
          required={required}
          disabled={disabled}
          readonly={readonly}
          value={value}
          placeholder={placeholder}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChange}
          className={classNames(!!PrefixIcon && styles.inputBaseProps)}
        />
        <>
          <div className={styles.suffixContainer}>
            {type === 'password' && (
              <div className={classNames(styles.passwordButtonContainer)}>
                <div className={classNames(styles.passwordButtonWrap)}>
                  <IconButton onClick={passwordButtonHandler} tooltipMessage={tooltipMessage}>
                    <IconButtonContent className={styles.passwordButtonIcon} />
                  </IconButton>
                </div>
              </div>
            )}
            <>
              {errorMessage && (
                <div className={styles.attentionContainer}>
                  <AttentionIcon className={styles.attentionIcon} />
                  <div className={styles.tooltipWrap}>
                    <Tooltip tooltipMessage={errorMessage} arrow="topRight" isError={isError} />
                  </div>
                </div>
              )}
            </>
          </div>
        </>
      </FieldWrapper>
    </div>
  );
}

export default Input;
