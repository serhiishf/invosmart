import styles from './Button.module.scss';
import classNames from 'classnames';
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
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--size-${size}`],
        styles[`button--buttonPalette-${buttonPalette}`],
        styles[`button--fontWeight-${fontWeight}`],
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
