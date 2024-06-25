import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';
import { Tooltip } from '../index';
import classNames from 'classnames';

function IconButton({
  tooltip,
  children,
  type = 'button',
  size = 'm',
  shape = 'circle',
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        styles.iconButton,
        styles[`iconButton--size-${size}`],
        styles[`iconButton--shape-${shape}`]
      )}
      type={type}
      {...rest}
    >
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
