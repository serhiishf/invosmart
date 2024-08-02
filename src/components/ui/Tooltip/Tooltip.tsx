import styles from './Tooltip.module.scss';
import { forwardRef } from 'react';
import { TooltipProps } from './types';
import clsx from 'clsx';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ tooltipMessage, ...rest }: TooltipProps, ref) => {
    return (
      <div {...rest} ref={ref}>
        <div className={clsx(styles.tooltip)}>
          <div>{tooltipMessage}</div>
        </div>
      </div>
    );
  }
);

export default Tooltip;
