import styles from './Tooltip.module.scss';
import React, { useState } from 'react';
import { TooltipProps } from './types';
import clsx from 'clsx';
import {
  offset,
  shift,
  useHover,
  useInteractions,
  useFloating,
  useFocus,
} from '@floating-ui/react';

const Tooltip = ({ title, children: rawChildren, ...rest }: TooltipProps) => {
  // to prevent runtime errors, developers will need to provide a child as a React element anyway.
  const children = React.isValidElement(rawChildren) ? rawChildren : <span>{rawChildren}</span>;

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

  const child = React.Children.only(children);

  return (
    <>
      {React.cloneElement(child, { ref: refs.setReference, ...getReferenceProps() })}
      {isTooltipOpen && title && (
        <div
          className={clsx(styles.tooltip)}
          style={floatingStyles}
          ref={refs.setFloating}
          {...getFloatingProps()}
          {...rest}
        >
          {title}
        </div>
      )}
    </>
  );
};

export default Tooltip;
