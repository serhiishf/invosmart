import { useEffect, useState } from 'react';
import { FieldWrapper, InputBase, IconButton } from '../';
import { InputProps } from './types';
import styles from './Input.module.scss';
import ShowPasswordIcon from '../../../assets/icons/eye.svg?react';
import HidePasswordIcon from '../../../assets/icons/eyeSlash.svg?react';
import classNames from 'classnames';

function Input(props: InputProps) {
  const {
    id,
    type = 'text',
    label,
    disabled = false,
    readOnly = false,
    isError = false,
    PrefixIcon,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentInputType, setCurrentInputType] = useState(type);

  const IconButtonContent = isPasswordVisible ? HidePasswordIcon : ShowPasswordIcon;
  const tooltipMessage = isPasswordVisible ? 'TRANSLATE Hide password' : 'TRANSLATE Show password';
  const isDisplaySuffixContainer = type === 'password';

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
    <div className={styles.input} id={id}>
      <FieldWrapper
        label={label}
        focus={isFocused}
        error={isError}
        readOnly={readOnly}
        disabled={disabled}
      >
        <>
          {PrefixIcon && (
            <div className={styles.input__prefixContainer}>
              {PrefixIcon && (
                <div className={styles.input__staticPrefixIcon}>
                  <PrefixIcon />
                </div>
              )}
            </div>
          )}
        </>
        <InputBase
          type={currentInputType}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          paddingLeft={(PrefixIcon && 'none') || 'primary'}
          paddingRight="primary"
          {...rest}
        />
        <>
          {isDisplaySuffixContainer && (
            <div className={styles.input__suffixContainer}>
              {type === 'password' && (
                <div className={classNames(styles.input__passwordButtonContainer)}>
                  <div className={classNames(styles.input__passwordButtonWrap)}>
                    <IconButton onClick={passwordButtonHandler} tooltipMessage={tooltipMessage}>
                      <IconButtonContent className={styles.input__passwordButtonIcon} />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      </FieldWrapper>
    </div>
  );
}

export default Input;
