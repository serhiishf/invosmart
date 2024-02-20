import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';
import classNames from 'classnames';
import ArrowIcon from '../../../assets/icons/arrowTriangle.svg?react';

function Tooltip(props: TooltipProps) {
  const { tooltipMessage, arrow } = props;

  return (
    <div className={classNames(styles.tooltip)}>
      <div>{tooltipMessage}</div>
      {arrow && (
        <ArrowIcon
          className={classNames(styles.tooltip__arrow, styles[`tooltip__arrow--${arrow}`])}
        />
      )}
    </div>
  );
}

export default Tooltip;
