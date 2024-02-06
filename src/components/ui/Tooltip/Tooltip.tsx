import styles from './Tooltip.module.scss';
import { TooltipProps } from './types';

function Tooltip(props: TooltipProps) {
  const { tooltipMessage, arrowDirection } = props;

  return <div className={styles.tooltip}>{tooltipMessage}</div>;
}

export default Tooltip;
