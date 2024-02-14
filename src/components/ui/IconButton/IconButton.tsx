import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

function IconButton(props: IconButtonProps) {
  const { tooltipMessage, children, type = 'button', ...rest } = props;

  return (
    <button className={styles.iconButton} type={type} {...rest}>
      {children}
      <div className={styles.tooltipWrap}>
        {tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}
      </div>
    </button>
  );
}

export default IconButton;
