import styles from './Tooltip.module.scss';
import { forwardRef } from 'react';
import { TooltipProps } from './types';
import classNames from 'classnames';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ tooltipMessage, ...rest }: TooltipProps, ref) => {
    return (
      <div {...rest} ref={ref}>
        <div className={classNames(styles.tooltip)}>
          <div>{tooltipMessage}</div>
        </div>
      </div>
    );
  }
);

export default Tooltip;
