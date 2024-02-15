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
    name,
    label,
    value,
    required = false,
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
        readOnly={readOnly}
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
          readOnly={readOnly}
          value={value}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          className={classNames(!!PrefixIcon && styles.inputBaseProps)}
          {...rest}
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
          </div>
        </>
      </FieldWrapper>
    </div>
  );
}

export default Input;
