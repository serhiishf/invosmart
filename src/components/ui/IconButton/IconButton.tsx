import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';

function IconButton(props: IconButtonProps) {
  const { tooltip, children, type = 'button', ...rest } = props;

  return (
    <button className={styles.iconButton} type={type} {...rest}>
      {children}
      {tooltip && (
        <div className={styles.iconButton__tooltipWrap}>
          <Tooltip tooltipMessage={tooltip} />
        </div>
      )}
    </button>
  );
}

export default IconButton;
