import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';
import classNames from 'classnames';
import ArrowIcon from '../../../assets/icons/arrow.svg?react';

function Tooltip(props: TooltipProps) {
  const { tooltipMessage, arrow, isError } = props;

  const directionClassMap = {
    left: 'arrowLeft',
    right: 'arrowRight',
    topRight: 'arrowTopRight',
    topLeft: 'arrowTopLeft',
    bottomRight: 'arrowBottomRight',
    bottomLeft: 'arrowBottomLeft',
    none: 'arrowNone',
  };

  const directionKey = arrow ? arrow : 'none';

  const arrowDirectionClass = styles[directionClassMap[directionKey]];

  return (
    <div className={classNames(styles.tooltip, isError && styles.tooltipIsError)}>
      <div className={styles.tooltipMessage}>{tooltipMessage}</div>
      {arrow && (
        <ArrowIcon
          className={classNames(styles.arrow, isError && styles.arrowIsError, arrowDirectionClass)}
        />
      )}
    </div>
  );
}

export default Tooltip;
