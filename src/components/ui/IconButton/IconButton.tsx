import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

function IconButton(props: IconButtonProps) {
  const { Icon, tooltipMessage, onClick } = props;

  return (
    <div className={styles.iconButton} onClick={onClick}>
      {Icon && <Icon />}
      <div className={styles.tooltipWrap}>
        {tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}
      </div>
    </div>
  );
}

export default IconButton;
