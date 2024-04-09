import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';
import classNames from 'classnames';
import IconArrow from '../../../assets/icons/arrowTriangle.svg?react';

function Tooltip(props: TooltipProps) {
  const { tooltipMessage, arrow }: TooltipProps = props;

  return (
    <div className={classNames(styles.tooltip)}>
      <div>{tooltipMessage}</div>
      {arrow && (
        <IconArrow
          className={classNames(styles.tooltip__arrow, styles[`tooltip__arrow--${arrow}`])}
        />
      )}
    </div>
  );
}

export default Tooltip;
