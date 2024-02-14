import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonProps } from './types';
import { Tooltip } from '../index';

function Button(props: ButtonProps) {
  const {
    children,
    size = 'm',
    isFullWidth,
    tooltipMessage,
    borderColor,
    color = 'white',
    fontWeight = 'semiBold',
    backgroundPalette = 'primary',
    disabled,
    type = 'button',
    ...rest
  } = props;

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
      {children}
      <>{tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}</>
    </button>
  );
}

export default Button;
