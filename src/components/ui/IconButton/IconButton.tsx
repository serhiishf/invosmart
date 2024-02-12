import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';
import { MouseEvent } from 'react';

function IconButton(props: IconButtonProps) {
  const { tooltipMessage, onClick, children } = props;

  const onClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.iconButton} onClick={onClickHandler}>
      {children}
      <div className={styles.tooltipWrap}>
        {tooltipMessage && <Tooltip tooltipMessage={tooltipMessage} />}
      </div>
    </div>
  );
}

export default IconButton;
