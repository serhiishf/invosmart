import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from './types';
import { Tooltip } from '../index';

function Button({
  size = 'm',
  isFullWidth = false,
  tooltip,
  borderColor,
  color = 'white',
  fontWeight = 'semiBold',
  backgroundPalette = 'primary',
  disabled,
  type = 'button',
  Icon,
  label,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--size-${size}`],
        styles[`button--color-${color}`],
        styles[`button--backgroundPalette-${backgroundPalette}`],
        styles[`button--fontWeight-${fontWeight}`],
        isFullWidth && styles['button--fullWidthMode'],
        disabled && styles['button--disabled'],
        borderColor && [styles['button--border'], styles[`button--border-${borderColor}`]]
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
}

export default Button;
