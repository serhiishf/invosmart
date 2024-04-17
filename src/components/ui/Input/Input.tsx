import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FieldWrapper, InputBase, IconButton } from '../';
import { InputProps } from './types';
import styles from './Input.module.scss';
import IconShowPassword from 'assets/icons/eye.svg?react';
import IconHidePassword from 'assets/icons/eyeSlash.svg?react';

function Input({
  id,
  type = 'text',
  label,
  disabled = false,
  readOnly = false,
  isError = false,
  PrefixIcon,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentInputType, setCurrentInputType] = useState(type);

  const IconButtonContent = isPasswordVisible ? IconHidePassword : IconShowPassword;
  const tooltip = isPasswordVisible ? 'TRANSLATE Hide password' : 'TRANSLATE Show password';
  const isDisplaySuffixContainer = type === 'password';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePasswordButton = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (type === 'password') {
      const newInputType = isPasswordVisible ? 'text' : 'password';
      setCurrentInputType(newInputType);
    }
  }, [isPasswordVisible, type]);

  return (
    <div className={styles.input} id={id}>
      <FieldWrapper label={label} isFocused={isFocused} isError={isError} disabled={disabled}>
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
          isReadOnlyMode={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          paddingLeft={(PrefixIcon && 'none') || 'default'}
          paddingRight={'default'}
          {...rest}
        />
        <>
          {isDisplaySuffixContainer && (
            <div className={styles.input__suffixContainer}>
              {type === 'password' && (
                <div className={classNames(styles.input__passwordButtonContainer)}>
                  <div className={classNames(styles.input__passwordButtonWrap)}>
                    <IconButton onClick={handlePasswordButton} tooltip={tooltip}>
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
