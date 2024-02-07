import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';
import classNames from 'classnames';

function Tooltip(props: TooltipProps) {
  const { tooltipMessage, arrow } = props;

  const directionClassMap = {
    left: 'triangleLeft',
    right: 'triangleRight',
    topRight: 'triangleTopRight',
    topLeft: 'triangleTopLeft',
    bottomRight: 'triangleBottomRight',
    bottomLeft: 'triangleBottomLeft',
    none: 'triangleNone',
  };

  const directionKey = arrow ? arrow : 'none';

  const triangleDirectionClass = styles[directionClassMap[directionKey]];

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipMessage}>{tooltipMessage}</div>
      {arrow && (
        <div className={styles.triangleContainer}>
          <div className={classNames(styles.triangle, triangleDirectionClass)}></div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
