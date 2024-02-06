import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';

function IconButton(props: IconButtonProps) {
  const { Icon, tooltipMessage, onClick } = props;

  return (
    <div className={styles.iconButton} onClick={onClick}>
      {Icon && <Icon />}
    </div>
  );
}

export default IconButton;
