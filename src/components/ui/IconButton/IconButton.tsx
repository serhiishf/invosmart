import classNames from 'classnames';
import { useState } from 'react';
import { offset, shift, useHover, useInteractions, useFloating } from '@floating-ui/react';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

const IconButton = ({
  tooltip,
  children,
  type = 'button',
  size = 'm',
  shape = 'circle',
  disabled,
  ...rest
}: IconButtonProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    strategy: 'absolute',
    middleware: [shift(), offset(10)],
    onOpenChange: setIsTooltipOpen,
  });

  const hover = useHover(context, {
    mouseOnly: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <button
      className={classNames(
        styles.iconButton,
        styles[`iconButton--size-${size}`],
        styles[`iconButton--shape-${shape}`],
        disabled && styles[`iconButton__disabled`]
      )}
      type={type}
      disabled={disabled}
      ref={refs.setReference}
      {...getReferenceProps()}
      {...rest}
    >
      {children}
      {tooltip && isTooltipOpen && (
        <Tooltip
          tooltipMessage={tooltip}
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles['iconButton__tooltipWrapZIndex']}
          {...getFloatingProps()}
        />
      )}
    </button>
  );
};

export default IconButton;
