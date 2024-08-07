import styles from './Button.module.scss';
import clsx from 'clsx';
import { ButtonProps } from './types';
import { Tooltip } from '../index';

const Button = ({
  size = 'm',
  isFullWidth = false,
  tooltip,
  isBordered = false,
  fontWeight = 'semiBold',
  buttonPalette = 'primary',
  disabled,
  type = 'button',
  Icon,
  label,
  shape = 'regular',
  ...rest
}: ButtonProps) => {
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
    >
      {Icon && (
        <div className={styles.button__iconContainer}>
          <Icon />
        </div>
      )}
      {label}
      {tooltip && (
        <div className={styles.button__tooltipWrap}>
          <Tooltip tooltipMessage={tooltip} />
        </div>
      )}
    </button>
  );
};

export default Button;
