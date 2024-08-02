import { useEffect, useState, useId } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FieldWrapper, InputBase, IconButton } from '../';
import { InputProps } from './types';
import styles from './Input.module.scss';
import IconShowPassword from 'assets/icons/eye.svg?react';
import IconHidePassword from 'assets/icons/eyeSlash.svg?react';

const Input = ({
  id,
  type = 'text',
  label,
  disabled = false,
  readOnly = false,
  isError = false,
  PrefixIcon,
  helperText,
  className,
  isPasswordVisibleInitially,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(isPasswordVisibleInitially);
  const [currentInputType, setCurrentInputType] = useState(type);

  const { t } = useTranslation();
  const IconButtonContent = isPasswordVisible ? IconHidePassword : IconShowPassword;
  const tooltipPasswordButton = isPasswordVisible
    ? t('actions.hide_password')
    : t('actions.show_password');
  const isDisplaySuffixContainer = type === 'password';

  const inputBaseId = useId();
  const helperTextId = helperText ? `${inputBaseId}-helperText` : undefined;

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
    <div
      className={clsx(styles.input, styles['input--safetyTopPadding'], className)}
      id={id}
      data-testid="input-component"
    >
      <FieldWrapper
        label={label}
        isFocused={isFocused}
        isError={isError}
        disabled={disabled}
        labelTargetId={inputBaseId}
        helperText={helperText}
        helperTextId={helperTextId}
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
          isReadOnlyMode={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          paddingLeft={(PrefixIcon && 'none') || 'default'}
          paddingRight={(type === 'password' && 'none') || 'default'}
          isError={isError}
          id={inputBaseId}
          className={styles['input__inputBase']}
          aria-describedby={helperTextId}
          {...rest}
        />
        <>
          {isDisplaySuffixContainer && (
            <div className={styles.input__suffixContainer}>
              {type === 'password' && (
                <div className={clsx(styles.input__passwordButtonContainer)}>
                  <div className={clsx(styles.input__passwordButtonWrap)}>
                    <IconButton
                      onClick={handlePasswordButton}
                      tooltip={tooltipPasswordButton}
                      size="auto"
                    >
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
};

export default Input;
