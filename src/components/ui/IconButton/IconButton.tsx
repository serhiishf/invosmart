import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

function IconButton(props: IconButtonProps) {
  const { tooltipMessage, onClick, children } = props;

  return (
    <div className={styles.iconButton} onClick={onClick}>
      {children}
      <div className={styles.tooltipWrap}>
        {tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}
      </div>
    </div>
  );
}

export default IconButton;
