import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { children, type = 'button', size = 'm', shape = 'circle', disabled, ...rest }: IconButtonProps,
    ref
  ) => {
    return (
      <button
        className={clsx(
          styles.iconButton,
          styles[`iconButton--size-${size}`],
          styles[`iconButton--shape-${shape}`],
          disabled && styles[`iconButton--disabled`]
        )}
        type={type}
        disabled={disabled}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default IconButton;
