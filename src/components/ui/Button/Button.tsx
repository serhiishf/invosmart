import { useState } from 'react';
import clsx from 'clsx';
import {
  offset,
  shift,
  useHover,
  useInteractions,
  useFloating,
  useFocus,
} from '@floating-ui/react';
import styles from './Button.module.scss';
import { ButtonProps } from './types';
import { Tooltip } from '../index';
import { TextOverflow } from 'constants/theme';

const Button = ({
  size = 'm',
  isFullWidth = false,
  tooltip,
  isBordered = false,
  fontWeight = 'semiBold',
  buttonPalette = 'primary',
  disabled,
  type = 'button',
  icon: Icon,
  label,
  shape = 'regular',
  textOverflow = TextOverflow.Wrap,
  ...rest
}: ButtonProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    strategy: 'absolute',
    middleware: [shift(), offset(10)],
    onOpenChange: setIsTooltipOpen,
  });

  const hoverInteraction = useHover(context, {
    mouseOnly: true,
  });

  const focusInteraction = useFocus(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hoverInteraction,
    focusInteraction,
  ]);

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
      ref={refs.setReference}
      {...getReferenceProps()}
      {...rest}
    >
      {Icon && (
        <div className={styles.button__iconContainer}>
          <Icon />
        </div>
      )}
      {label && (
        <span className={clsx(styles.button__text, styles[`button__text-${textOverflow}`])}>
          {label}
        </span>
      )}
      {tooltip && isTooltipOpen && (
        <Tooltip
          tooltipMessage={tooltip}
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles['button__tooltipWrapZIndex']}
          {...getFloatingProps()}
        />
      )}
    </button>
  );
};

export default Button;
