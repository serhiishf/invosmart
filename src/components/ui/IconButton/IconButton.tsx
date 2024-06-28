import classNames from 'classnames';
import { useState } from 'react';
import { offset, shift, useHover, useInteractions, useFloating } from '@floating-ui/react';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

function IconButton({
  tooltip,
  children,
  type = 'button',
  size = 'm',
  shape = 'circle',
  ...rest
}: IconButtonProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom',
    strategy: 'absolute',
    middleware: [shift(), offset(10)],
    onOpenChange: setIsTooltipOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <button
      className={classNames(
        styles.iconButton,
        styles[`iconButton--size-${size}`],
        styles[`iconButton--shape-${shape}`]
      )}
      type={type}
      ref={refs.setReference}
      {...getReferenceProps()}
      {...rest}
    >
      {children}
      {tooltip && isTooltipOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles['iconButton__tooltipWrapZIndex']}
          {...getFloatingProps()}
          /* className={styles.iconButton__tooltipWrap} */
        >
          <Tooltip tooltipMessage={tooltip} />
        </div>
      )}
    </button>
  );
}

export default IconButton;
