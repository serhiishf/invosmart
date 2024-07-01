import styles from './Tooltip.module.scss';
import { forwardRef } from 'react';
import { TooltipProps } from './types';
import classNames from 'classnames';
import IconArrow from '../../../assets/icons/arrowTriangle.svg?react';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ tooltipMessage, arrow, ...rest }: TooltipProps, ref) => {
    return (
      <div {...rest} ref={ref}>
        <div className={classNames(styles.tooltip)}>
          <div>{tooltipMessage}</div>
          {arrow && (
            <IconArrow
              className={classNames(styles.tooltip__arrow, styles[`tooltip__arrow--${arrow}`])}
            />
          )}
        </div>
      </div>
    );
  }
);

export default Tooltip;
