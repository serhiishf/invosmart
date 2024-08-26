import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './types';
import { TextOverflow } from 'constants/theme';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'm',
      isFullWidth = false,
      isBordered = false,
      fontWeight = 'semiBold',
      buttonPalette = 'primary',
      disabled,
      type = 'button',
      startIcon: StartIcon,
      shape = 'regular',
      textOverflow = TextOverflow.Wrap,
      children,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    return (
      <button
        className={clsx(
          styles.button,
          styles[`button--size-${size}`],
          styles[`button--buttonPalette-${buttonPalette}`],
          styles[`button--fontWeight-${fontWeight}`],
          styles[`button--shape-${shape}`],
          isFullWidth && styles['button--fullWidthMode'],
          disabled && styles['button--disabled'],
          isBordered && styles['button--border']
        )}
        disabled={disabled}
        type={type}
        {...rest}
        ref={ref}
      >
        {StartIcon && (
          <div className={styles.button__iconContainer}>
            <StartIcon />
          </div>
        )}
        {children && (
          <div
            className={clsx(
              styles.button__childrenWraper,
              styles[`button__childrenWraper-${textOverflow}`]
            )}
          >
            {children}
          </div>
        )}
      </button>
    );
  }
);

export default Button;
